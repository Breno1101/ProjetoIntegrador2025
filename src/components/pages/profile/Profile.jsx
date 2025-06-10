import React, {useEffect, useState} from 'react';
import useAuth from '../../../hooks/useAuth';
import useProgress from '../../../hooks/useProgress';
import useChat from '../../../hooks/useChat';
import {useTheme} from "../../theme/useTheme";

const Profile = () => {
  const { currentUser } = useAuth();
  const { getOverallProgress, getCompletedLessonsCount } = useProgress();
  const { getLessons, getAllConversations, clearConversation } = useChat();
  const [theme, setTheme] = useTheme()

  const [selectedTheme, setSelectedTheme] = useState("");
  const [activeTab, setActiveTab] = useState('profile');
  
  const lessons = getLessons();
  const conversations = getAllConversations();
  const overallProgress = getOverallProgress();
  const completedLessons = getCompletedLessonsCount();
  
  // Handle clearing conversation for a lesson
  const handleClearConversation = (lessonId) => {
    if (window.confirm('Tem certeza que deseja limpar esta conversa? Esta ação não pode ser desfeita.')) {
      clearConversation(lessonId);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Seu Perfil</h1>
      
      {/* Settings tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-8">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'profile'
                ? 'border-quantum text-quantum dark:border-quantum-light dark:text-quantum-light'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300 dark:hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Informações Pessoais
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'progress'
                ? 'border-quantum text-quantum dark:border-quantum-light dark:text-quantum-light'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300 dark:hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('progress')}
          >
            Progresso de Aprendizado
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'theme'
                ? 'border-quantum text-quantum dark:border-quantum-light dark:text-quantum-light'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300 dark:hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('theme')}
          >
            Tema
          </button>
        </div>
      </div>
      
      {/* Settings tab content */}
      {activeTab === 'profile' && (
        <div className="bg-white dark:bg-dark-lighter shadow rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <img
                  src={`https://ui-avatars.com/api/?name=${currentUser?.name}&background=random`}
                  alt="Settings"
                  className="h-24 w-24 rounded-full object-cover"
                />
                <div className="ml-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{currentUser?.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{currentUser?.email}</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                    Membro desde {new Date().toLocaleDateString('pt-BR', {
                      day: '2-digit', 
                      month: '2-digit', 
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
              <div className="mt-6 border-t border-gray-200 pt-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Progresso Total</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{overallProgress}%</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Aulas Completadas</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{completedLessons} de 10</dd>
                  </div>
                </dl>
              </div>
          </div>
        </div>
      )}
      
      {/* Progress tab content */}
      {activeTab === 'progress' && (
        <div className="bg-white dark:bg-dark-lighter shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Seu Progresso nas Aulas</h2>
            
            <div className="space-y-4">
              {lessons.map(lesson => {
                const hasConversation = conversations[lesson.id]?.length > 0;
                
                return (
                  <div 
                    key={lesson.id} 
                    className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 w-10 h-10 ${lesson.color} rounded-full flex items-center justify-center text-xl`}>
                        {lesson.icon}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">{lesson.title}</h3>
                        <div className="flex items-center mt-1">
                          <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                            <div
                              className="h-2 bg-quantum rounded-full"
                              style={{ width: `${hasConversation ? Math.max(10, Math.min(conversations[lesson.id].length * 5, 100)) : 0}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-300">
                            {hasConversation ? 
                              `${conversations[lesson.id].length} interações` : 
                              'Não iniciado'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {hasConversation && (
                      <button
                        className="text-xs text-gray-500 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500"
                        onClick={() => handleClearConversation(lesson.id)}
                      >
                        Limpar Conversa
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      
      {/* Theme tab content */}
      {activeTab === 'theme' && (
        <div className="bg-white dark:bg-dark-lighter shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Tema</h2>
            
            <div className="space-y-6">
              <div>
                <div className="space-y-4">
                  <div className="flex flex-row gap-4 max-lg:flex-col">
                    <div className="flex flex-col items-center gap-2">
                      <div onClick={() => {
                        setSelectedTheme('light');
                        setTheme('light');
                      }}
                           className={`flex h-32 w-56 bg-white drop-shadow-lg rounded-lg pl-2 pt-4 gap-2 transform transition-all duration-200 hover:scale-105 cursor-pointer active:bg-light active:scale-100 ${
                               selectedTheme === 'light' ? 'border-4 border-quantum' : 'border border-transparent'
                           }`}>
                        <div className="flex flex-col gap-2">
                          <div className="h-4 w-4 bg-quantum rounded"></div>
                          <div className="h-4 w-4 bg-quantum rounded"></div>
                          <div className="h-4 w-4 bg-quantum rounded"></div>
                        </div>
                        <div className="flex border-t-2 border-l-2 w-full" />
                      </div>
                      <p className="dark:text-white">Claro</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div onClick={() => {
                        setSelectedTheme('dark');
                        setTheme('dark');
                      }}
                         className={`flex h-32 w-56 bg-dark drop-shadow-lg rounded-lg pl-2 pt-4 gap-2 transform transition-all duration-200 hover:scale-105 cursor-pointer active:bg-dark-lighter active:scale-100 ${
                             selectedTheme === 'dark' ? 'border-4 border-quantum-light' : 'border border-transparent'
                         }`}>
                        <div className="flex flex-col gap-2">
                          <div className="h-4 w-4 bg-quantum rounded"></div>
                          <div className="h-4 w-4 bg-quantum rounded"></div>
                          <div className="h-4 w-4 bg-quantum rounded"></div>
                        </div>
                        <div className="flex border-t-2 border-l-2 w-full" />
                      </div>
                      <p className="dark:text-white">Escuro</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div onClick={() => {
                        setSelectedTheme('system');
                        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                        setTheme(prefersDark ? 'dark' : 'light');
                      }}
                        className={`flex h-32 w-56 bg-grey drop-shadow-lg rounded-lg pl-2 pt-4 gap-2 transform transition-all duration-200 hover:scale-105 cursor-pointer active:bg-grey-light active:scale-100 ${
                            selectedTheme === 'system' ? 'border-4 border-quantum-dark' : 'border border-transparent'
                        }`}>
                        <div className="flex flex-col gap-2">
                          <div className="h-4 w-4 bg-quantum rounded"></div>
                          <div className="h-4 w-4 bg-quantum rounded"></div>
                          <div className="h-4 w-4 bg-quantum rounded"></div>
                        </div>
                        <div className="flex border-t-2 border-l-2 w-full" />
                      </div>
                      <p className="dark:text-white">Sistema</p>
                    </div>

                  </div>
                </div>
              </div>
              
              {/*<div>*/}
              {/*  <h3 className="text-sm font-medium text-gray-900 mb-2">Conta</h3>*/}
              {/*  <div className="space-y-4">*/}
              {/*    <button className="text-sm text-quantum-DEFAULT hover:underline">*/}
              {/*      Alterar senha*/}
              {/*    </button>*/}
              {/*    <div>*/}
              {/*      <button className="text-sm text-red-600 hover:underline">*/}
              {/*        Excluir minha conta*/}
              {/*      </button>*/}
              {/*      <p className="mt-1 text-xs text-gray-500">*/}
              {/*        Todos os seus dados serão excluídos permanentemente.*/}
              {/*      </p>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/*<div className="pt-4">*/}
              {/*  <button className="btn btn-primary">*/}
              {/*    Salvar Configurações*/}
              {/*  </button>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;