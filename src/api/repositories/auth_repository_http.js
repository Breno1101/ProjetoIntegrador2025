import http from '../http'

export class AuthRepositoryHttp {
    async login(email, password) {
        try {
            const response = await http.post(`/login`, { email, password });
            return response.data;
        } catch (error) {
            let message;

            if (error.response) {
                // Requisição feita e resposta recebida, mas com erro HTTP
                if (error.response.status === 401) {
                    message = 'Email ou senha incorretos';
                } else if (error.response.data?.message) {
                    message = error.response.data.message;
                } else {
                    message = `Erro ${error.response.status}`;
                }
            } else if (error.request) {
                message = 'Falha ao se conectar. Verifique sua internet.';
            } else {
                message = error.message || 'Erro ao fazer login';
            }

            return Promise.reject(new Error(message));
        }
    }

    async getUserByEmail(email) {
        try {
            const response = await http.get('/users', {
                params: { email }
            });
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message || error?.message || 'Erro ao buscar usuário por email';
            return Promise.reject(new Error(message));
        }
    }

    async getUserById(user_id) {
        try {
            const response = await http.get('/users', {
                params: { user_id }
            });
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message || error?.message || 'Erro ao buscar usuário por ID';
            return Promise.reject(new Error(message));
        }
    }
}
