import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';
import Spinner from '../components/ui/Spinner';
import { api } from '../services/mockApi';
import { User } from '../types';

type LoginMode = 'user' | 'admin';

const LoginPage: React.FC = () => {
    const [mode, setMode] = useState<LoginMode>('user');
    const [error, setError] = useState('');
    
    // User login state
    const [selectedUser, setSelectedUser] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userList, setUserList] = useState<User[]>([]);

    // Admin login state
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');

    const { login, loginWithName, loading, user } = useAuth();
    const navigate = useNavigate();

    // This effect correctly handles redirection AFTER the user state is globally updated.
    useEffect(() => {
        if (user) {
            navigate(user.role === 'admin' ? '/admin' : '/');
        }
    }, [user, navigate]);

    useEffect(() => {
        // Fetch non-admin users for the dropdown
        api.getUsers().then(allUsers => {
            const regularUsers = allUsers.filter(u => u.role === 'user');
            setUserList(regularUsers);
            if(regularUsers.length > 0) {
                setSelectedUser(regularUsers[0].name);
            }
        });
    }, []);

    const handleUserSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const result = await loginWithName(selectedUser, userPassword);
        // The useEffect will handle the redirect upon successful login.
        if (!result.success) {
            setError(result.message || 'Login failed');
        }
    };

    const handleAdminSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const result = await login(adminEmail, adminPassword);
        // The useEffect will handle the redirect upon successful login.
        if (!result.success) {
            setError(result.message || 'Login failed');
        }
    };

    if (loading || user) {
        return <div className="flex justify-center items-center h-screen"><Spinner size="lg" /></div>;
    }

    const TabButton: React.FC<{ currentMode: LoginMode, targetMode: LoginMode, children: React.ReactNode }> = ({ currentMode, targetMode, children }) => (
        <button
            onClick={() => setMode(targetMode)}
            className={`w-1/2 py-2 text-sm font-medium text-center rounded-t-md focus:outline-none ${
                currentMode === targetMode
                    ? 'border-b-2 border-primary-500 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
            }`}
        >
            {children}
        </button>
    );

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <Card className="w-full max-w-md">
                <div className="flex border-b mb-6">
                    <TabButton currentMode={mode} targetMode='user'>User Login</TabButton>
                    <TabButton currentMode={mode} targetMode='admin'>Admin Login</TabButton>
                </div>

                {mode === 'user' ? (
                    <form onSubmit={handleUserSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="user-select">Select Your Name</label>
                            <select id="user-select" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm">
                                {userList.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="user-password">Password</label>
                            <input id="user-password" type="password" required value={userPassword} onChange={(e) => setUserPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                        </div>
                        {error && <p className="text-sm text-red-600">{error}</p>}
                        <Button type="submit" isLoading={loading} className="w-full">Login</Button>
                    </form>
                ) : (
                    <form onSubmit={handleAdminSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email">Email Address</label>
                            <input id="email" type="email" required value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" required value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                        </div>
                        {error && <p className="text-sm text-red-600">{error}</p>}
                        <Button type="submit" isLoading={loading} className="w-full">Login as Admin</Button>
                    </form>
                )}
                
                <p className="mt-4 text-center text-sm">
                    Don't have an account? <Link to="/signup" className="text-primary-600 hover:underline">Sign up</Link>
                </p>
            </Card>
        </div>
    );
};

export default LoginPage;