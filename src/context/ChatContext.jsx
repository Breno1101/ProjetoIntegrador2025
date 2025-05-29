import React, { createContext, useState, useCallback, useContext, useEffect } from 'react';
import {AuthContext} from './AuthContext';

// Create Chat Context
export const ChatContext = createContext();

// Lessons data
const LESSONS = [
  {
    id: 1,
    title: 'Introdução à Computação Quântica',
    description: 'Fundamentos e conceitos básicos da computação quântica.',
    icon: '🔬',
    color: 'bg-blue-100',
  },
  {
    id: 2,
    title: 'Qubits e Superposição',
    description: 'Entendendo os bits quânticos e o princípio da superposição.',
    icon: '🔄',
    color: 'bg-purple-100',
  },
  {
    id: 3,
    title: 'Emaranhamento Quântico',
    description: 'O fenômeno do emaranhamento e suas aplicações.',
    icon: '🔗',
    color: 'bg-pink-100',
  },
  {
    id: 4,
    title: 'Portas Quânticas',
    description: 'Operações básicas em sistemas quânticos.',
    icon: '🚪',
    color: 'bg-indigo-100',
  },
  {
    id: 5,
    title: 'Algoritmos Quânticos I',
    description: 'Algoritmo de Deutsch-Jozsa e outros algoritmos introdutórios.',
    icon: '📊',
    color: 'bg-green-100',
  },
  {
    id: 6,
    title: 'Algoritmos Quânticos II',
    description: 'Algoritmo de Grover e buscas quânticas.',
    icon: '🔍',
    color: 'bg-yellow-100',
  },
  {
    id: 7,
    title: 'Algoritmos Quânticos III',
    description: 'Algoritmo de Shor e fatoração quântica.',
    icon: '🔢',
    color: 'bg-red-100',
  },
  {
    id: 8,
    title: 'Correção de Erros Quânticos',
    description: 'Técnicas para mitigar erros em computadores quânticos.',
    icon: '🛠️',
    color: 'bg-orange-100',
  },
  {
    id: 9,
    title: 'Computadores Quânticos Atuais',
    description: 'Estado da arte e implementações físicas.',
    icon: '💻',
    color: 'bg-teal-100',
  },
  {
    id: 10,
    title: 'Futuro da Computação Quântica',
    description: 'Tendências e desafios na área.',
    icon: '🚀',
    color: 'bg-cyan-100',
  },
];

export const ChatProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [activeLesson, setActiveLesson] = useState(null);
  const [conversations, setConversations] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load conversations from localStorage on mount or when user changes
  useEffect(() => {
    if (currentUser) {
      const storedConversations = localStorage.getItem(`quantum_conversations_${currentUser.user_id}`);
      if (storedConversations) {
        setConversations(JSON.parse(storedConversations));
      }
    }
  }, [currentUser]);

  // Save conversations to localStorage when they change
  useEffect(() => {
    if (currentUser && Object.keys(conversations).length > 0) {
      localStorage.setItem(
        `quantum_conversations_${currentUser.user_id}`,
        JSON.stringify(conversations)
      );
    }
  }, [conversations, currentUser]);

  // Get all lessons
  const getLessons = useCallback(() => {
    return LESSONS;
  }, []);

  // Get lesson by ID
  const getLessonById = useCallback((lessonId) => {
    return LESSONS.find(lesson => lesson.id === Number(lessonId)) || null;
  }, []);

  // Set active lesson
  const selectLesson = useCallback((lessonId) => {
    const lesson = getLessonById(lessonId);
    setActiveLesson(lesson);
    
    // Initialize conversation for this lesson if it doesn't exist
    if (currentUser && lesson) {
      setConversations(prev => {
        if (!prev[lesson.id]) {
          return {
            ...prev,
            [lesson.id]: []
          };
        }
        return prev;
      });
    }
    
    return lesson;
  }, [currentUser, getLessonById]);

  // Send message
  const sendMessage = useCallback(async (message) => {
    if (!activeLesson || !currentUser) return null;
    
    setLoading(true);
    setError(null);
    
    try {
      // User message
      const userMessage = {
        id: Date.now(),
        text: message,
        sender: 'user',
        timestamp: new Date().toISOString(),
      };
      
      // Update conversations with user message
      setConversations(prev => ({
        ...prev,
        [activeLesson.id]: [...(prev[activeLesson.id] || []), userMessage]
      }));
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate bot response based on lesson
      let botResponse;
      
      switch(activeLesson.id) {
        case 1:
          botResponse = "A computação quântica é um paradigma de computação que utiliza fenômenos da mecânica quântica, como superposição e emaranhamento, para realizar operações em dados. Diferente da computação clássica que usa bits (0 ou 1), a computação quântica usa qubits, que podem existir em múltiplos estados simultaneamente.";
          break;
        case 2:
          botResponse = "Qubits são a unidade fundamental de informação na computação quântica. Diferente dos bits clássicos, os qubits podem estar em superposição, existindo como 0 e 1 simultaneamente com diferentes probabilidades, até serem medidos.";
          break;
        case 3:
          botResponse = "O emaranhamento quântico é um fenômeno onde dois ou mais qubits se tornam correlacionados de tal forma que o estado quântico de cada partícula não pode ser descrito independentemente. Isso permite novas formas de processamento de informação impossíveis na computação clássica.";
          break;
        default:
          botResponse = "Estou aqui para ajudar você a entender os conceitos de computação quântica relacionados a esta aula. Que aspecto específico você gostaria de explorar?";
      }
      
      // Bot message
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      
      // Update conversations with bot response
      setConversations(prev => ({
        ...prev,
        [activeLesson.id]: [...(prev[activeLesson.id] || []), botMessage]
      }));
      
      return botMessage;
    } catch (err) {
      setError(err.message || 'Erro ao enviar mensagem');
      return null;
    } finally {
      setLoading(false);
    }
  }, [activeLesson, currentUser]);

  // Get conversation for current lesson
  const getCurrentConversation = useCallback(() => {
    if (!activeLesson || !currentUser) return [];
    return conversations[activeLesson.id] || [];
  }, [activeLesson, conversations, currentUser]);

  // Get all user conversations
  const getAllConversations = useCallback(() => {
    return conversations;
  }, [conversations]);

  // Clear conversation for a lesson
  const clearConversation = useCallback((lessonId) => {
    if (!currentUser) return;
    
    setConversations(prev => ({
      ...prev,
      [lessonId]: []
    }));
  }, [currentUser]);

  // Context value
  const value = {
    lessons: LESSONS,
    activeLesson,
    loading,
    error,
    getLessons,
    getLessonById,
    selectLesson,
    sendMessage,
    getCurrentConversation,
    getAllConversations,
    clearConversation
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;