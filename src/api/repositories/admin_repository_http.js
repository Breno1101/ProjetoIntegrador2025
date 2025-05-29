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

    async getAllUsers(email, password) {
        try {
            const response = await http.get(`/users/all`);
            return response.data;
        } catch (error) {
            return Promise.reject(new Error(error));
        }
    }
}
