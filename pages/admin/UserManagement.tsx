import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../../services/mockApi';
import { User } from '../../types';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import Modal from '../../components/ui/Modal';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'user'>('all');
  
  // State for the "Add User" modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' as 'user' | 'admin' });
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await api.getUsers();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (user: User) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    if (window.confirm(`Are you sure you want to change ${user.name}'s role to ${newRole}?`)) {
      await api.updateUserRole(user.id, newRole);
      fetchUsers();
    }
  };
  
  const filteredUsers = useMemo(() => {
      if(roleFilter === 'all') return users;
      return users.filter(u => u.role === roleFilter);
  }, [users, roleFilter]);

  const handleAddNewUser = () => {
    setError('');
    setNewUser({ name: '', email: '', password: '', role: 'user' });
    setIsModalOpen(true);
  };

  const handleSaveUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      setError('All fields are required.');
      return;
    }
    setError('');
    setIsSaving(true);
    
    const existingUser = await api.getUserByEmail(newUser.email);
    if (existingUser) {
        setError('A user with this email already exists.');
        setIsSaving(false);
        return;
    }

    try {
        await api.addUser(newUser);
        setIsModalOpen(false);
        fetchUsers(); // Refresh the list
    } catch (e) {
        setError('Failed to create user.');
    } finally {
        setIsSaving(false);
    }
  };

  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };


  if (loading) return <Spinner size="lg" />;

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">👥 Manage Users</h1>
        <Button onClick={handleAddNewUser}>➕ Add New User</Button>
      </div>
      
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex justify-between items-center">
        <div>
            <p>Total Users: <span className="font-bold">{users.length}</span></p>
            <p>Admins: <span className="font-bold">{users.filter(u=>u.role === 'admin').length}</span></p>
        </div>
        <div>
            <label>Filter by role: </label>
            <select value={roleFilter} onChange={e => setRoleFilter(e.target.value as any)} className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                <option value="all">All</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
            </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">Name</th>
              <th scope="col" className="py-3 px-6">Email</th>
              <th scope="col" className="py-3 px-6">Role</th>
              <th scope="col" className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">{user.name}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <Button size="sm" onClick={() => handleRoleChange(user)}>
                    {user.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

       <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New User"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveUser} isLoading={isSaving}>Save User</Button>
          </>
        }
      >
        <div className="space-y-4">
          {error && <p className="text-sm text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-300 p-2 rounded-md">{error}</p>}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
            <input id="name" name="name" type="text" value={newUser.name} onChange={handleNewUserChange} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
            <input id="email" name="email" type="email" value={newUser.email} onChange={handleNewUserChange} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={newUser.password} onChange={handleNewUserChange} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium">Role</label>
            <select id="role" name="role" value={newUser.role} onChange={handleNewUserChange} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserManagement;