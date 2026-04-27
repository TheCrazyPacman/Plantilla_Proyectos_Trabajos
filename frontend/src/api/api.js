import axios from 'axios';

const authApi = axios.create({
    // Si el .env existe, lo usa. Si no, usa localhost por defecto.
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
});

authApi.interceptors.request.use( config => {
    const token = sessionStorage.getItem('token');
    if ( token ) {
        config.headers = {
            ...config.headers,
            'x-token': token
        }
    }
    return config;
});

export default authApi;