import { useNavigate } from 'react-router-dom';
import './Inicio.css';

const Inicio = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/Login');
    };

    return (
        <div className="inicio-container">
            <div className="welcome-card">
                <h1>Panel de Inicio</h1>
                <p>Bienvenido al sistema. Estás en una ruta protegida.</p>
                <button onClick={handleLogout} className="btn-logout">
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

export default Inicio;