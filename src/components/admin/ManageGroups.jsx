import React, { useState } from 'react';
import UserAvatar from '../../layouts/UserAvatar';
import { v4 as uuidv4 } from 'uuid';

const ManageGroups = () => {
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [groups, setGroups] = useState([
    { id: 'group1', name: 'Grupo A', users: ['1', '2', '3'], yearSemester: '2024/1', status: 'ativo', professorId: '2' },
    { id: 'group2', name: 'Grupo B', users: ['4', '5', '6'], yearSemester: '2024/2', status: 'inativo', professorId: '5' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGroupData, setNewGroupData] = useState({
    name: '',
    yearSemester: '',
    status: 'ativo',
    professorId: '',
    users: [],
  });

   const users = [
    {
      id: '1',
      name: 'Thomas Silva',
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

  const selectedGroup = groups.find(group => group.id === selectedGroupId);
  const groupUsers = selectedGroup
    ? users.filter(user => selectedGroup.users.includes(user.id))
    : [];

  const handleCreateGroup = () => {
    const { name, yearSemester, status, professorId, users } = newGroupData;
    if (!name.trim() || !yearSemester || !professorId) return;

    const newGroup = {
      id: uuidv4(),
      name,
      yearSemester,
      status,
      professorId,
      users,
    };
    setGroups(prev => [...prev, newGroup]);
    setNewGroupData({
      name: '',
      yearSemester: '',
      status: 'ativo',
      professorId: '',
      users: [],
    });
    setIsModalOpen(false);
  };

  const handleDeleteGroup = (groupId) => {
    setGroups(prev => prev.filter(group => group.id !== groupId));
    if (selectedGroupId === groupId) setSelectedGroupId(null);
  };

  const handleUserSelection = (userId) => {
    setNewGroupData(prev => ({
      ...prev,
      users: prev.users.includes(userId)
        ? prev.users.filter(id => id !== userId)
        : [...prev.users, userId],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Gerenciar Grupos</h1>

      {/* Botão de criação */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Criar Grupo
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Novo Grupo</h2>

            <label className="block mb-2 text-gray-700 dark:text-gray-300">
              Nome do grupo:
              <input
                type="text"
                value={newGroupData.name}
                onChange={(e) => setNewGroupData({ ...newGroupData, name: e.target.value })}
                className="mt-1 w-full border p-2 rounded bg-white dark:bg-gray-700 dark:text-white"
              />
            </label>

            <label className="block mb-2 text-gray-700 dark:text-gray-300">
              Ano/Semestre:
              <input
                type="text"
                value={newGroupData.yearSemester}
                onChange={(e) => setNewGroupData({ ...newGroupData, yearSemester: e.target.value })}
                className="mt-1 w-full border p-2 rounded bg-white dark:bg-gray-700 dark:text-white"
              />
            </label>

            <label className="block mb-2 text-gray-700 dark:text-gray-300">
              Status:
              <select
                value={newGroupData.status}
                onChange={(e) => setNewGroupData({ ...newGroupData, status: e.target.value })}
                className="mt-1 w-full border p-2 rounded bg-white dark:bg-gray-700 dark:text-white"
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </label>

            <label className="block mb-2 text-gray-700 dark:text-gray-300">
              Professor:
              <select
                value={newGroupData.professorId}
                onChange={(e) => setNewGroupData({ ...newGroupData, professorId: e.target.value })}
                className="mt-1 w-full border p-2 rounded bg-white dark:bg-gray-700 dark:text-white"
              >
                <option value="">Selecione um professor</option>
                {users
                  .filter(user => user.role === 'teacher')
                  .map(teacher => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
              </select>
            </label>

            <div className="mb-4 mt-4 text-gray-700 dark:text-gray-300">
              <p className="mb-2 font-semibold">Usuários no grupo:</p>
              <div className="max-h-32 overflow-y-auto border rounded p-2 bg-white dark:bg-gray-700">
                {users.map(user => (
                  <label key={user.id} className="block text-sm">
                    <input
                      type="checkbox"
                      checked={newGroupData.users.includes(user.id)}
                      onChange={() => handleUserSelection(user.id)}
                      className="mr-2"
                    />
                    {user.name}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateGroup}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de grupos */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {groups.map(group => (
          <div key={group.id} className="relative group">
            <button
              onClick={() => setSelectedGroupId(group.id)}
              className={`w-full border px-4 py-3 rounded text-left font-semibold ${
                selectedGroupId === group.id
                  ? 'bg-quantum text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
              }`}
            >
              {group.name}
            </button>
            <button
              onClick={() => handleDeleteGroup(group.id)}
              className="absolute top-4 right-1 text-red-600 hover:text-red-800 text-sm"
              title="Excluir grupo"
            >
              Deletar
            </button>
          </div>
        ))}
      </div>

      {/* Lista de usuários do grupo selecionado */}
      {selectedGroupId ? (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Usuários do {selectedGroup?.name}:
          </h2>
          {groupUsers.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">Nenhum usuário neste grupo.</p>
          ) : (
            <ul>
              {groupUsers.map(user => (
                <li
                  key={user.id}
                  className="mb-4 flex gap-4 rounded border border-gray-300 dark:border-gray-600 p-4"
                >
                  <UserAvatar name={user.name} src={user.avatar} size={65} />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{user.email}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Papel: {user.role === 'student' ? 'Aluno' : 'Professor'}
                    </p>
                    <p
                      className={`text-sm font-semibold ${
                        user.isActive
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {user.isActive ? 'Ativo' : 'Inativo'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">Selecione um grupo para ver os usuários.</p>
      )}
    </div>
  );
};

export default ManageGroups;
