import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Verificamos si existe el token en el sessionStorage
    const token = sessionStorage.getItem('token');

    if (!token) {
        // Si no hay token, lo mandamos al login
        return <Navigate to="/Login" replace />;
    }

    // Si hay token, permitimos el acceso al componente (Inicio)
    return children;
};

export default ProtectedRoute;