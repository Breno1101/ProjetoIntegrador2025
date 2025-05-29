import axios from 'axios';

// Configuração base do Axios
const http = axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_API_AUTH_URL,
});

// Interceptor para adicionar token de autenticação
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('quantumToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para lidar com erros
http.interceptors.response.use(
  (response) => response,
  (error) => {
    // Lidar com erros de autenticação (401)
      if (
          error.response &&
          error.response.status === 401 &&
          !error.config?.url?.includes('/login')
      ) {
          localStorage.removeItem('quantumToken');
          localStorage.removeItem('quantumUser');
          window.location.href = '/login';
      }
    return Promise.reject(error);
  }
);

export default http;