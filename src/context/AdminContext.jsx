import React, { createContext, useState, useEffect, useCallback } from 'react';
import { AdminRepositoryHttp } from '../api/repositories/admin_repository_http'

const defaultAdminContext = {
    getAllUsers: async () => {
        return {
            users: [
                {
                    user_id: '',
                    name: '',
                    email: '',
                    permission: '',
                }
            ]
        }
    },
}

// Create Auth Context
export const AdminContext = createContext(defaultAdminContext)

export const AdminProvider = ({ children }) => {
    const adminRepository = new AdminRepositoryHttp()

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Login function
    const getAllUsers = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await adminRepository.getAllUsers()
            setUsers(data);
            return users;
        } catch (err) {
            const message = err?.message || 'Falha ao buscar usuários';
            setError(message);
            return Promise.reject(new Error(message));
        } finally {
            setLoading(false);
        }
    }, []);

    // Context value
    const value = {
        getAllUsers,
        loading,
        error
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContext;