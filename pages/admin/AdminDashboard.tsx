
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { api } from '../../services/mockApi';
import { ComponentData, QuizQuestion, User } from '../../types';

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  link: string;
  linkText: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, link, linkText }) => (
  <Card>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
      </div>
      <div className="text-4xl">{icon}</div>
    </div>
    <div className="mt-4">
      <Link to={link}>
        <Button variant="ghost" size="sm">{linkText}</Button>
      </Link>
    </div>
  </Card>
);

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({ components: 0, users: 0, quizzes: 0, admins: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [components, users, quizzes] = await Promise.all([
        api.getComponents(),
        api.getUsers(),
        api.getQuestions()
      ]);
      setStats({
        components: components.length,
        users: users.length,
        admins: users.filter(u => u.role === 'admin').length,
        quizzes: quizzes.length,
      });
    };
    fetchStats();
  }, []);
  
  const recentActivities = [
    'User "Test User" took quiz (Score: 90%) - 5 min ago',
    'Admin added component "CT1" - 2 hours ago',
    'New component "F5" imported via Excel - 1 day ago',
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">⚙️ Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Components" value={stats.components} icon="📦" link="/admin/components" linkText="Manage Components" />
        <StatCard title="Total Users" value={stats.users} icon="👥" link="/admin/users" linkText="Manage Users" />
        <StatCard title="Admin Users" value={stats.admins} icon="🛡️" link="/admin/users" linkText="View Admins" />
        <StatCard title="Quiz Questions" value={stats.quizzes} icon="❓" link="/admin/quizzes" linkText="Manage Quizzes" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
                <Link to="/admin/components/new"><Button>➕ Add Component</Button></Link>
                <Link to="/admin/import"><Button>📥 Import from Excel</Button></Link>
                <Link to="/admin/quizzes/new"><Button>📝 Create Quiz</Button></Link>
                <Link to="/admin/analytics"><Button variant="secondary">📊 View Analytics</Button></Link>
            </div>
          </Card>
        <Card>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Activity</h2>
            <ul className="space-y-3">
              {recentActivities.map((activity, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-300 border-l-2 border-primary-500 pl-3">{activity}</li>
              ))}
            </ul>
        </Card>
      </div>

    </div>
  );
};

export default AdminDashboard;
