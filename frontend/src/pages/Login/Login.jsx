import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from '../../api/api'; // Ajusta la ruta según tu carpeta
import { Turnstile } from '@marsidev/react-turnstile';
import { toast } from 'react-toastify';
import './Login.css';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPass] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [turnstileToken, setTurnstileToken] = useState(null);
  const turnstileRef = useRef(null);
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    if (honeypot !== '') {
      console.warn("Bot detectado mediante Honeypot");
      return; // Detenemos la ejecución en silencio para confundir al bot
    }

    /* PUENTE PARA EL TURNSTILE FUNCIONE SIN LAS CREDENCIALES
    if (!turnstileToken) {
      toast.error('Por favor, completa el captcha');
      return;
    }*/

    try {
      // Enviamos "usuario" para que coincida con el backend
      const res = await api.post('/auth/login', { 
        usuario, 
        password, 
        tokenSecurity: turnstileToken 
      });

      if (res.data.ok) { 
        sessionStorage.setItem('token', res.data.token);
        toast.success('¡Bienvenido!');
        navigate('/Inicio');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || 'Credenciales incorrectas';
      toast.error(errorMsg);

      // Resetear Turnstile y contraseña
      setTurnstileToken(null); 
      if (turnstileRef.current) turnstileRef.current.reset();
      setPass('');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-card">
        <input 
          type="text" 
          name="full_name_verification" // Un nombre que engañe al bot
          style={{ display: 'none' }} 
          tabIndex="-1" 
          autoComplete="off" 
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)} 
        />
        
        <h3>Iniciar Sesión</h3>
        
        <input 
          type="text" 
          placeholder="Usuario" 
          className="input-style" 
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)} 
          required
        />
        
        <input 
          type="password" 
          placeholder="Contraseña" 
          className="input-style" 
          value={password}
          onChange={(e) => setPass(e.target.value)} 
          required
        />

        <div className="turnstile-container">
          <Turnstile 
            ref={turnstileRef}
            siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY} 
            onSuccess={(token) => setTurnstileToken(token)} 
          />
        </div>

        <button type="submit" className="btn-login" disabled={!turnstileToken}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;