import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';
import Spinner from '../components/ui/Spinner';

const SignupPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signup, loading, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        const result = await signup(name, email, password);

        if (result.success) {
            alert('Signup successful! Please log in.');
            navigate('/login');
        } else {
            setError(result.message || 'An error occurred during signup.');
        }
    };

    if (loading || user) {
        return <div className="flex justify-center items-center h-screen"><Spinner size="lg" /></div>;
    }

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <Card className="w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Create an Account</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name">Full Name</label>
                        <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)}
                         className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                    </div>
                     <div>
                        <label htmlFor="email">Email Address</label>
                        <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                         className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                         className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <div>
                        <Button type="submit" isLoading={loading} className="w-full">
                            Sign Up
                        </Button>
                    </div>
                </form>
                 <p className="mt-4 text-center text-sm">
                    Already have an account? <Link to="/login" className="text-primary-600 hover:underline">Log in</Link>
                </p>
            </Card>
        </div>
    );
};

export default SignupPage;