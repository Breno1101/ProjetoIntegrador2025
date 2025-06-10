import React, { createContext, useCallback } from 'react';
import { ClassRepositoryHttp } from '../api/repositories/classes_repository_http'

const defaultClassesContext = {
    classes: async (group_id, title, pdf_url, class_topics) => {
        return {
            class_id: "",
            group_id: "",
            title: "",
            pdf_url: "",
            status: false,
            last_access_class: "",
            created_at: "",
            order: 0,
            class_topics: [
                {
                    class_topics_id: "",
                    topic: "",
                    user_id: "",
                    class_id: ""
                }
            ]
        }
    },
    getClassById: async (group_id) => {
        return {
            class_id: "",
            group_id: "",
            title: "",
            pdf_url: "",
            status: false,
            last_access_class: "",
            created_at: "",
            order: 0
        }
    },
    getAllClasses: async () => {
        return [{
            class_id: "",
            group_id: "",
            title: "",
            pdf_url: "",
            status: false,
            last_access_class: "",
            created_at: "",
            order: 0
        }]
    },
    getClassProgressById: async (class_id, class_topics_id) => {
        return {
            topic_progress_id: "",
            class_progress_percentual: "",
            total: 0,
            done: 0
        }
    },
    updateClass: async (class_id, group_id, title, pdf_url, status, order) => {
        return {
            group_id: "",
            title: "",
            pdf_url: "",
            status: false,
            order: 0
        }
    },
    deleteClass: async (class_id) => {
        return {
            message: ""
        }
    },
    createGroup: async (name, year_semester, status, manager_id, user_ids) => {
        return {
            group_id: "",
            name: "",
            year_semester: 0,
            status: false,
            manager_id: "",
            user_ids: [""]
        }
    },
    getGroupById: async (group_id) => {
        return {
            group_id: "",
            name: "",
            year_semester: 0,
            status: true,
            user_id: ""
        }
    },
    addUserToGroup: async (group_id, user_id) => {
        return {
            user_id: "",
            group_id: "",
            message: ""
        }
    },
    updateGroup: async (group_id, name, year_semester, status, manager_id, user_ids) => {
        return {
            name: "",
            year_semester: 0,
            status: false,
            manager_id: "",
            user_ids: [
                ""
            ]
        }
    },
    deleteGroup: async (group_id) => {
        return {
            message: ""
        }
    },
    deleteTopic: async (topic_id) => {
        return {
            message: ""
        }
    }
}

// Create Auth Context
export const ClassesContext = createContext(defaultClassesContext)

export const ClassesProvider = ({ children }) => {
    const classesRepository = new ClassRepositoryHttp()

    // Fetch classes function
    const classes = useCallback(async (group_id, title, pdf_url, class_topics) => {
        try{
            const data = await classesRepository.classes(group_id, title, pdf_url, class_topics);
            return data;
        } catch (error) {
            const message = error?.message || 'Erro ao buscar matérias';
            return Promise.reject(new Error(message));
        }
    }, [])

    const getClassById = useCallback(async (group_id) => {
        try {
            const data = await classesRepository.getClassById(group_id);
            return data;
        } catch (error) {
            const message = error?.message || 'Erro ao buscar matéria por ID';
            return Promise.reject(new Error(message));
        }
    }, [])

    const getAllClasses = useCallback(async () => {
        try {
            const data = await classesRepository.getAllClasses();
            return data;
        } catch (error) {
            const message = error?.message || 'Erro ao buscar todas as matérias';
            return Promise.reject(new Error(message));
        }
    }, [])

    const getClassProgressById = useCallback(async (class_id, class_topics_id) => {
        try {
            const data = await classesRepository.getClassProgressById(class_id, class_topics_id);
            return data;
        } catch (error) {
            const message = error?.message || 'Erro ao buscar progresso da matéria';
            return Promise.reject(new Error(message));
        }
    }, [])

    const updateClass = useCallback(async (class_id, group_id, title, pdf_url, status, order) => {
        try {
            const data = await classesRepository.updateClass(class_id, group_id, title, pdf_url, status, order);
            return data;
        } catch (error) {
            const message = error?.message || 'Erro ao atualizar matéria';
            return Promise.reject(new Error(message));
        }
    }, [])

    const deleteClass = useCallback(async (class_id) => {
        try {
            const data = await classesRepository.deleteClass(class_id);
            return data;
        } catch (error) {
            const message = error?.message || 'Erro ao deletar matéria';
            return Promise.reject(new Error(message));
        }
    }, [])

    const createGroup = useCallback(async (name, year_semester, status, manager_id, user_ids) => {
        try {
            const data = await classesRepository.createGroup(name, year_semester, status, manager_id, user_ids);
            return data;
        } catch (error) {
            const message = error?.message || 'Erro ao criar grupo';
            return Promise.reject(new Error(message));
        }
    }, [])

    const getGroupById = useCallback(async (group_id) => {
        try {
            const data = await classesRepository.getGroupById(group_id);
            return data;
        } catch (error) {
            const message = error?.message || 'Erro ao buscar grupo por ID';
            return Promise.reject(new Error(message));
        }
    }, [])

    const addUserToGroup = useCallback(async (group_id, user_id) => {
        try {
            const data = await classesRepository.addUserToGroup(group_id, user_id);
            return data;
        } catch (error) {
            const message = error?.message || 'Erro ao adicionar usuário ao grupo';
            return Promise.reject(new Error(message));
        }
    }, [])

    const updateGroup = useCallback(async (group_id, name, year_semester, status, manager_id, user_ids) => {
        try {
            const data = await classesRepository.updateGroup(group_id, name, year_semester, status, manager_id, user_ids);
            return data;
        } catch (error) {
            const message = error?.message || 'Erro ao atualizar grupo';
            return Promise.reject(new Error(message));
        }
    }, [])

    const deleteGroup = useCallback(async (group_id) => {
        try {
            const data = await classesRepository.deleteGroup(group_id);
            return data;
        } catch (error) {
            const message = error?.message || 'Erro ao deletar grupo';
            return Promise.reject(new Error(message));
        }
    }, [])

    const deleteTopic = useCallback(async (topic_id) => {
        try {
            const data = await classesRepository.deleteTopic(topic_id);
            return data;
        } catch (error) {
            const message = error?.message || 'Erro ao deletar tópico';
            return Promise.reject(new Error(message));
        }
    }, [])

    // Context value
    const value = {
        classes,
        getClassById,
        getAllClasses,
        getClassProgressById,
        updateClass,
        deleteClass,
        createGroup,
        getGroupById,
        addUserToGroup,
        updateGroup,
        deleteGroup,
        deleteTopic
    };

    return (
        <ClassesContext.Provider value={value}>
            {children}
        </ClassesContext.Provider>
    );
};

export default ClassesContext;