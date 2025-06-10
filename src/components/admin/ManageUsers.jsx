import React, { useState } from 'react';
import UserAvatar from '../../layouts/UserAvatar';

const ManageUsers = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'student' });

  const allUsers = [
    {
      id: '1',
      name: 'Alice Silva',
      email: 'alice@email.com',
      isActive: true,
      avatar: 'https://ui-avatars.com/api/?name=Alice+Silva&background=random',
      role: 'student',
    },
    {
      id: '2',
      name: 'Bruno Costa',
      email: 'bruno@email.com',
      isActive: false,
      avatar: 'https://ui-avatars.com/api/?name=Bruno+Costa&background=random',
      role: 'teacher',
    },
    {
      id: '3',
      name: 'Carlos Pereira',
      email: 'carlos@email.com',
      isActive: true,
      avatar: 'https://ui-avatars.com/api/?name=Carlos+Pereira&background=random',
      role: 'teacher',
    },
    {
      id: '4',
      name: 'Daniela Moura',
      email: 'daniela@email.com',
      isActive: true,
      avatar: 'https://ui-avatars.com/api/?name=Daniela+Moura&background=random',
      role: 'student',
    },
    {
      id: '5',
      name: 'Eduardo Lima',
      email: 'eduardo@email.com',
      isActive: false,
      avatar: 'https://ui-avatars.com/api/?name=Eduardo+Lima&background=random',
      role: 'teacher',
    },
    {
      id: '6',
      name: 'Fernanda Rocha',
      email: 'fernanda@email.com',
      isActive: true,
      avatar: 'https://ui-avatars.com/api/?name=Fernanda+Rocha&background=random',
      role: 'student',
    },
    {
      id: '7',
      name: 'Gustavo Almeida',
      email: 'gustavo@email.com',
      isActive: false,
      avatar: 'https://ui-avatars.com/api/?name=Gustavo+Almeida&background=random',
      role: 'teacher',
    },
    {
      id: '8',
      name: 'Helena Ramos',
      email: 'helena@email.com',
      isActive: true,
      avatar: 'https://ui-avatars.com/api/?name=Helena+Ramos&background=random',
      role: 'student',
    },
    {
      id: '9',
      name: 'Igor Fernandes',
      email: 'igor@email.com',
      isActive: true,
      avatar: 'https://ui-avatars.com/api/?name=Igor+Fernandes&background=random',
      role: 'teacher',
    },
    {
      id: '10',
      name: 'Juliana Castro',
      email: 'juliana@email.com',
      isActive: false,
      avatar: 'https://ui-avatars.com/api/?name=Juliana+Castro&background=random',
      role: 'student',
    },
    {
      id: '11',
      name: 'Kevin Matos',
      email: 'kevin@email.com',
      isActive: true,
      avatar: 'https://ui-avatars.com/api/?name=Kevin+Matos&background=random',
      role: 'teacher',
    },
    {
      id: '12',
      name: 'Larissa Oliveira',
      email: 'larissa@email.com',
      isActive: true,
      avatar: 'https://ui-avatars.com/api/?name=Larissa+Oliveira&background=random',
      role: 'student',
    },
    {
      id: '13',
      name: 'Marcos Teixeira',
      email: 'marcos@email.com',
      isActive: false,
      avatar: 'https://ui-avatars.com/api/?name=Marcos+Teixeira&background=random',
      role: 'teacher',
    },
    {
      id: '14',
      name: 'Nathalia Sousa',
      email: 'nathalia@email.com',
      isActive: true,
      avatar: 'https://ui-avatars.com/api/?name=Nathalia+Sousa&background=random',
      role: 'student',
    },
    {
      id: '15',
      name: 'Otávio Cunha',
      email: 'otavio@email.com',
      isActive: false,
      avatar: 'https://ui-avatars.com/api/?name=Otavio+Cunha&background=random',
      role: 'teacher',
    },
    {
      id: '16',
      name: 'Patrícia Mendes',
      email: 'patricia@email.com',
      isActive: true,
      avatar: 'https://ui-avatars.com/api/?name=Patricia+Mendes&background=random',
      role: 'student',
    },
    {
      id: '17',
      name: 'Renan Duarte',
      email: 'renan@email.com',
      isActive: true,
      avatar: 'https://ui-avatars.com/api/?name=Renan+Duarte&background=random',
      role: 'teacher',
    },
    {
      id: '18',
      name: 'Sabrina Lima',
      email: 'sabrina@email.com',
      isActive: false,
      avatar: 'https://ui-avatars.com/api/?name=Sabrina+Lima&background=random',
      role: 'student',
    },
    {
      id: '19',
      name: 'Thiago Neves',
      email: 'thiago@email.com',
      isActive: true,
      avatar: 'https://ui-avatars.com/api/?name=Thiago+Neves&background=random',
      role: 'teacher',
    },
    {
      id: '20',
      name: 'Viviane Lopes',
      email: 'viviane@email.com',
      isActive: true,
      avatar: 'https://ui-avatars.com/api/?name=Viviane+Lopes&background=random',
      role: 'student',
    },
  ];

  const [users, setUsers] = useState(allUsers);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user => {
    // Filtra por role
    const roleMatch = filter === 'all' ? true : user.role === filter;

    // Filtra por termo de busca (nome ou email), case insensitive
    const searchMatch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    return roleMatch && searchMatch;
  });

  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    setUsers(prev => prev.filter(user => user.id !== selectedUserId));
    setShowModal(false);
    setSelectedUserId(null);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setSelectedUserId(null);
  };

  const handleCreateUser = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!newUser.name.trim() || !newUser.email.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (!emailRegex.test(newUser.email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }

    const emailAlreadyExists = users.some(user => user.email === newUser.email);
    if (emailAlreadyExists) {
      alert('Este e-mail já está cadastrado.');
      return;
    }

    const newUserObj = {
      ...newUser,
      id: Date.now().toString(),
      isActive: true,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newUser.name)}&background=random`,
    };

    setUsers(prev => [...prev, newUserObj]);
    setShowCreateModal(false);
    setNewUser({ name: '', email: '', role: 'student' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gerenciar Usuários</h1>

        <div className="flex gap-2 items-center flex-wrap">
          {/* Barra de pesquisa */}
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Pesquisar por nome ou email..."
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm max-w-xs"
          />

          <select
            value={filter}
            onChange={handleFilterChange}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm text-gray-800 dark:text-white"
          >
            <option value="all">Todos</option>
            <option value="student">Alunos</option>
            <option value="teacher">Professores</option>
          </select>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded px-3 py-2 text-sm"
          >
            Criar novo usuário
          </button>
        </div>
      </div>

      <ul>
        {filteredUsers.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Nenhum usuário encontrado.</p>
        ) : (
          filteredUsers.map((user) => (
            <li
              key={user.id}
              className="mb-4 flex gap-4 rounded border border-gray-300 dark:border-gray-600 p-4"
            >
              <UserAvatar
                name={user.name}
                src={user.avatar}
                size={65}
              />
              <div className="flex flex-col justify-center">
                <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                <p className="text-gray-700 dark:text-gray-300">{user.email}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Papel: {user.role === 'student' ? 'Aluno' : 'Professor'}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    user.isActive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {user.isActive ? 'Ativo' : 'Inativo'}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => openDeleteModal(user.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-semibold"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      {/* Modal de exclusão */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Confirmar exclusão
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Tem certeza que deseja excluir este usuário?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de criação */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Criar novo usuário
            </h2>

            <label className="block mb-2 text-gray-900 dark:text-white text-sm font-medium">
              Nome:
              <input
                type="text"
                value={newUser.name}
                onChange={e => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full rounded border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              />
            </label>

            <label className="block mb-2 text-gray-900 dark:text-white text-sm font-medium">
              Email:
              <input
                type="email"
                value={newUser.email}
                onChange={e => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                className="mt-1 block w-full rounded border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              />
            </label>

            <label className="block mb-4 text-gray-900 dark:text-white text-sm font-medium">
              Papel:
              <select
                value={newUser.role}
                onChange={e => setNewUser(prev => ({ ...prev, role: e.target.value }))}
                className="mt-1 block w-full rounded border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              >
                <option value="student">Aluno</option>
                <option value="teacher">Professor</option>
              </select>
            </label>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateUser}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
