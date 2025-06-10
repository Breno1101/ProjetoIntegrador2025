import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import UserAvatar from './UserAvatar';
import { useLocation } from 'react-router-dom';


const AdminLayout = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();


  // Redirect to dashboard if not admin
  // if (!isAdmin) {
  //   return navigate('/dashboard');
  // }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Admin Header */}
      <header className="bg-gray-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/admin" className="flex-shrink-0 flex items-center justify-start">
                <span className="text-2xl mr-1">⚛️</span>
                <span className="font-bold text-white text-xl">Quantum Tutor</span>
                <span className="ml-2 bg-quantum-DEFAULT text-white text-xs font-bold px-2 py-1 rounded">
                  ADMIN
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {/*<Link to="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">*/}
              {/*  Modo Estudante*/}
              {/*</Link>*/}

              <div className="relative ml-3">
                <div className="flex items-center">
                  <UserAvatar avatar={currentUser?.avatar} name={currentUser?.name} />
                  <span className="ml-2 text-sm font-medium text-gray-300">
                    {currentUser?.name || 'Admin'}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <div className="flex-grow flex ">
        {/* Admin Sidebar */}
        <nav className="w-64 bg-gray-900 text-white">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Administração</h2>
            <div className="space-y-2">
              <Link
                to="/admin"
                className={`block px-4 py-2 text-sm rounded transition-all duration-300 ease-in-out
    ${location.pathname === '/admin' ? 'bg-quantum-DEFAULT text-white scale-[1.05]' : 'hover:bg-gray-700'}
  `}
              >
                Home
              </Link>

              {/* <a
                href="#progress"
                className="block px-4 py-2 text-sm rounded hover:bg-gray-700"
              >
                Progresso
              </a>
              <a
                href="#conversations"
                className="block px-4 py-2 text-sm rounded hover:bg-gray-700"
              >
                Conversas
              </a> */}

              {/* Se for admin */}
              {/*<a*/}
              {/*    href="#Professors"*/}
              {/*    className="block px-4 py-2 text-sm rounded hover:bg-gray-700"*/}
              {/*>*/}
              {/*  Professores*/}
              {/*</a>*/}

              <Link
                to="/admin/settings"
                className={`block px-4 py-2 text-sm rounded transition-all duration-300 ease-in-out
    ${location.pathname === '/admin/settings' ? 'bg-quantum-DEFAULT text-white scale-[1.05]' : 'hover:bg-gray-700'}
  `}
              >
                Configurações
              </Link>
              <Link
                to="/admin/manage"
                className={`block px-4 py-2 text-sm rounded transition-all duration-300 ease-in-out
    ${location.pathname === '/admin/manage' ? 'bg-quantum-DEFAULT text-white scale-[1.05]' : 'hover:bg-gray-700'}
  `}
              >
                Gerenciar Usuários
              </Link>
              <Link
                to="/admin/manage/groups"
                className={`block px-4 py-2 text-sm rounded transition-all duration-300 ease-in-out
    ${location.pathname === '/admin/manage/groups' ? 'bg-quantum-DEFAULT text-white scale-[1.05]' : 'hover:bg-gray-700'}
  `}
              >
                Gerenciar Grupos
              </Link>
            </div>
          </div>
        </nav>

        {/* Admin Main Content */}
        <main className="flex-1 overflow-y-auto bg-white dark:bg-dark p-6 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;