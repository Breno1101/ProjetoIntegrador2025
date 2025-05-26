import http from './http';

// Dados das aulas (em um ambiente real, viriam da API)
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

// Serviço para gerenciar a interação com o chatbot
const chatService = {
  // Obter todas as aulas
  getLessons: async () => {
    try {
      // Em um ambiente real, isso seria uma chamada API
      // const response = await api.get('/lessons');
      // return response.data;
      
      // Mock para demonstração
      return LESSONS;
    } catch (error) {
      console.error('Error fetching lessons:', error);
      throw error;
    }
  },
  
  // Obter uma aula específica
  getLessonById: async (lessonId) => {
    try {
      // Em um ambiente real, isso seria uma chamada API
      // const response = await api.get(`/lessons/${lessonId}`);
      // return response.data;
      
      // Mock para demonstração
      return LESSONS.find(lesson => lesson.id === Number(lessonId)) || null;
    } catch (error) {
      console.error(`Error fetching lesson ${lessonId}:`, error);
      throw error;
    }
  },
  
  // Enviar mensagem para o chatbot
  sendMessage: async (lessonId, message) => {
    try {
      // Em um ambiente real, isso seria uma chamada API
      // const response = await api.post('/chat/message', { lessonId, message });
      // return response.data;
      
      // Mock para demonstração
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Gerar resposta baseada na aula
      let botResponse;
      
      switch(Number(lessonId)) {
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
      
      // Simular mensagem do bot
      return {
        id: Date.now(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },
  
  // Obter histórico de conversas de uma aula
  getConversationHistory: async (lessonId) => {
    try {
      // Em um ambiente real, isso seria uma chamada API
      // const response = await api.get(`/chat/history/${lessonId}`);
      // return response.data;
      
      // Mock para demonstração
      return [];
    } catch (error) {
      console.error(`Error fetching conversation history for lesson ${lessonId}:`, error);
      throw error;
    }
  },
  
  // Limpar histórico de conversa de uma aula
  clearConversation: async (lessonId) => {
    try {
      // Em um ambiente real, isso seria uma chamada API
      // await api.delete(`/chat/history/${lessonId}`);
      
      // Mock para demonstração
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    } catch (error) {
      console.error(`Error clearing conversation for lesson ${lessonId}:`, error);
      throw error;
    }
  }
};

export default chatService;