import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Importaciones ajustadas a tu estructura de carpetas
import Login from './pages/Login/Login';
import Inicio from './pages/Inicio/Inicio';

import ProtectedRoute from './componentes/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirigir la raíz al Login automáticamente */}
        <Route path="/" element={<Navigate to="/Login" replace />} />

        {/* Ruta Pública */}
        <Route path="/Login" element={<Login />} />

        {/* Ruta Protegida */}
        <Route 
          path="/Inicio" 
          element={
            <ProtectedRoute>
              <Inicio />
            </ProtectedRoute>
          } 
        />

        {/* Si el usuario escribe cualquier otra cosa, lo manda al Login */}
        <Route path="*" element={<Navigate to="/Login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;