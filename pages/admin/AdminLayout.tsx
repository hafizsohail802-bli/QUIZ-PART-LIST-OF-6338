import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';

const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: '📊' },
    { to: '/admin/components', label: 'Components', icon: '📦' },
    { to: '/admin/import', label: 'Import Components', icon: '📥' },
    { to: '/admin/users', label: 'Users', icon: '👥' },
    { to: '/admin/quizzes', label: 'Quizzes', icon: '❓' },
    { to: '/admin/results', label: 'Quiz Results', icon: '🏆' },
    { to: '/admin/materials', label: 'Study Materials', icon: '📄' },
    { to: '/admin/analytics', label: 'Analytics', icon: '📈' },
  ];
  
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-2 my-1 rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-primary-700 text-white'
        : 'text-gray-300 hover:bg-primary-600 hover:text-white'
    }`;
  
  const SidebarContent = () => (
    <>
      <div className="p-4">
        <h2 className="text-xl font-bold text-white">Admin Panel</h2>
        <p className="text-sm text-gray-400">Welcome, {user?.name}</p>
      </div>
      <nav className="flex-1 px-2">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/admin'}
            className={navLinkClass}
            onClick={() => isSidebarOpen && setSidebarOpen(false)}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-primary-800 text-white">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <div 
        className={`fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity md:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setSidebarOpen(false)}
      ></div>
      <aside 
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-primary-800 text-white transform transition-transform md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <SidebarContent />
      </aside>
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-500 dark:text-gray-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-1"></div> {/* Spacer */}
          <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:inline">Welcome, {user?.name}</span>
              <Button onClick={logout} variant="secondary" size="sm">
                Logout
              </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;