import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from '../../api/api'; // Ajusta la ruta según tu carpeta
//import { Turnstile } from '@marsidev/react-turnstile';
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from 'react-toastify';
import './Login.css';
import logoEmpresa from '../../assets/logo-back.png'; 

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPass] = useState('');
  const [honeypot, setHoneypot] = useState('');
  //const [turnstileToken, setTurnstileToken] = useState(null);
  //const turnstileRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);
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

    if (!captchaToken) {
      alert('Por favor, completa el captcha.');
      return;
    }
    

    try {
      // Enviamos "usuario" para que coincida con el backend
      /*
      const res = await api.post('/auth/login', { 
        usuario, 
        password, 
        tokenSecurity: turnstileToken 
      });*/

      const res = await api.post('/auth/login', { 
        usuario, 
        password, 
        tokenSecurity: captchaToken 
      });

      if (res.data.ok) { 
        sessionStorage.setItem('token', res.data.token);
        toast.success('¡Bienvenido!');
        navigate('/Inicio');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || 'Credenciales incorrectas';
      toast.error(errorMsg);
      /*
      // Resetear Turnstile y contraseña
      setTurnstileToken(null); 
      if (turnstileRef.current) turnstileRef.current.reset();
      */
      setCaptchaToken(null);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset(); 
      }
      setPass('');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-card">
        <div className="logo-container">
          <img src={logoEmpresa} alt="Logo Empresa" className="login-logo" />
        </div>
        <input 
          type="text" 
          name="full_name_verification" // Un nombre que engañe al bot
          style={{ display: 'none' }} 
          tabIndex="-1" 
          autoComplete="off" 
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)} 
        />
        
        <h3 className="login-title">Iniciar Sesión</h3>
        
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
        {/*
        <div className="turnstile-container">
          <Turnstile 
            ref={turnstileRef}
            siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY} 
            onSuccess={(token) => setTurnstileToken(token)} 
          />
        </div>*/}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '15px 0' }}>
          <ReCAPTCHA
            ref={recaptchaRef} // Conectamos la Ref
            sitekey={import.meta.env.VITE_COPIA_CLAVE_SITIO} 
            onChange={(token) => setCaptchaToken(token)}
            onExpired={() => setCaptchaToken(null)} // Si expira, deshabilitamos el botón
          />
        </div>

        {/*<button type="submit" className="btn-login" disabled={!turnstileToken}>*/}
        <button type="submit" className="btn-login" disabled={!captchaToken}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;