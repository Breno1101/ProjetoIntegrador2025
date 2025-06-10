import http from '../http'

export class AdminRepositoryHttp {
    async createUser(name, email, password, permission) {
        try {
            const response = await http.post(`/users`, { name, email, password, permission });
            return response.data;
        } catch (error) {
            return Promise.reject(new Error(error));
        }
    }

    async getAllUsers() {
        try {
            const response = await http.get(`/users/all`);
            return response.data;
        } catch (error) {
            return Promise.reject(new Error(error));
        }
    }

    async deleteUser(userId, name) {
        try {
            const response = await http.delete(`/delete_user?${userId}?name${name}`);
            return response.data;
        } catch (error) {
            return Promise.reject(new Error(error));
        }
    }
}
