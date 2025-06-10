import { useContext } from 'react';
import ClassContext from '../context/ClassesContext';

// Custom hook to use progress context
const useClasses = () => {
    const context = useContext(ClassContext);

    if (!context) {
        throw new Error('useClasses must be used within a ClassesProvider');
    }

    return context;
};

export default useClasses;