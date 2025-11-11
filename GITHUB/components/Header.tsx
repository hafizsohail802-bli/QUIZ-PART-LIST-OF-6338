import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from './ui/Button';

const Header: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-primary-700 text-white'
        : 'text-gray-300 hover:bg-primary-600 hover:text-white'
    }`;

  return (
    <header className="bg-primary-800 text-white shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Advance Mechanix Quiz
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {user && (
                  <>
                    <NavLink to="/study" className={navLinkClass}>Study Hub</NavLink>
                    <NavLink to="/quiz" className={navLinkClass}>Quiz Hub</NavLink>
                    {isAdmin && (
                      <NavLink to="/admin" className={navLinkClass}>Admin Dashboard</NavLink>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">Welcome, {user.name}</span>
                <Button onClick={logout} variant="secondary" size="sm">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="space-x-2">
                <Link to="/login">
                  <Button variant="secondary" size="sm">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;