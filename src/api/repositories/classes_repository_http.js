import http from '../http'

export class ClassRepositoryHttp {
    // Post Class
    async classes(group_id, title, pdf_url, class_topics) {
        try {
            const response = await http.post(`/class`, { group_id, title, pdf_url, class_topics });
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message || error?.message || 'Erro ao criar matéria';
            return Promise.reject(new Error(message));
        }
    }

    // Get Classes
    async getClassById(group_id) {
        try {
            const response = await http.get(`/classes?group_id=${group_id}`);
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message || error?.message || 'Erro ao buscar matéria por ID';
            return Promise.reject(new Error(message));
        }
    }

    // Get All Classes
    async getAllClasses() {
        try {
            const response = await http.get('/classes/all');
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message || error?.message || 'Erro ao buscar todas as matérias';
            return Promise.reject(new Error(message));
        }
    }

    // Get Class Progress
    async getClassProgressById(class_id, class_topics_id) {
        try {
            const response = await http.get('/api/v1/class_progress', {
                params: {
                    class_id: class_id,
                    class_topics_id: class_topics_id
                }
            });
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message || error?.message || 'Erro ao buscar matéria por ID';
            return Promise.reject(new Error(message));
        }
    }

    // Put Class
    async updateClass(class_id, group_id, title, pdf_url, status, order) {
        try {
            const response = await http.put(`/api/v1/classes/${class_id}/update`, {
                group_id,
                title,
                pdf_url,
                status,
                order
            });
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message || error?.message || 'Erro ao atualizar matéria';
            return Promise.reject(new Error(message));
        }
    }

    // Delete Class
    async deleteClass(class_id, title) {
        try {
            const response = await http.delete('/api/v1/delete_class', {
                params: {
                    class_id: class_id,
                    title: title
                }
            });
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message || error?.message || 'Erro ao excluir matéria';
            return Promise.reject(new Error(message));
        }
    }

    // Post Group
    async createGroup(name, year_semester, status, manager_id, user_ids) {
        try {
            const response = await http.post('/api/v1/group', {
                name,
                year_semester,
                status,
                manager_id,
                user_ids
            });
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message || error?.message || 'Erro ao criar grupo';
            return Promise.reject(new Error(message));
        }
    }

    // Get Group by ID
    async getGroupById(group_id) {
        try {
            const response = await http.get(`/api/v1/group?group_id=${group_id}`);
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message || error?.message || 'Erro ao buscar grupo por ID';
            return Promise.reject(new Error(message));
        }
    }

    // Post User/Group
    async addUserToGroup(user_id, group_id) {
        try {
            const response = await http.post(`/add_user_group`, {user_id, group_id});
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message || error?.message || 'Erro ao adicionar usuário ao grupo';
            return Promise.reject(new Error(message));
        }
    }

    // Put Group
    async updateGroup(group_id, name, year_semester, status, manager_id, user_ids) {
        try {
            const response = await http.put(`/api/v1/group/${group_id}/update`, {
                name,
                year_semester,
                status,
                manager_id,
                user_ids
            });
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message || error?.message || 'Erro ao atualizar grupo';
            return Promise.reject(new Error(message));
        }
    }

    // Delete Group
    async deleteGroup(group_id, name) {
        try {
            const response = await http.delete('/api/v1/delete_group', {
                params: {
                    group_id: group_id,
                    name: name
                }
            });
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message || error?.message || 'Erro ao excluir grupo';
            return Promise.reject(new Error(message));
        }
    }

    // Delete Topic
    async deleteTopic(class_topics_id, class_id, topic) {
        try {
            const response = await http.delete(
                `/api/v1/delete_topic?class_topics_id=${class_topics_id}?class_id=${class_id}?topic=${topic}`, {
                params: {
                    class_topics_id: class_topics_id,
                    class_id: class_id,
                    topic: topic
                }
            });
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message || error?.message || 'Erro ao excluir tópico';
            return Promise.reject(new Error(message));
        }
    }

}
