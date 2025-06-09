import http from '../http'

export class ChatRepositoryHttp {
    async Chat(session_id, message) {
        try {
            const response = await http.post(`/chat?session_id=${session_id}`, {
                message: message
            });
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message || error?.message || 'Erro ao mandar mensagem para o chat';
            return Promise.reject(new Error(message));
        }
    }

    async GetChatById(session_id) {
        try {
            const response = await http.get(`/chat?session_id=${session_id}`);
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message || error?.message || 'Erro ao buscar chat';
            return Promise.reject(new Error(message));
        }
    }
}
