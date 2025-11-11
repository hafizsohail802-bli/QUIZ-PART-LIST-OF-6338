import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Welcome to Advance Mechanix Quiz</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          Your central hub for advanced mechanical and electrical training.
        </p>
      </div>

      {user ? (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">📖 Study Hub</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Browse our comprehensive library of electrical components. View details, images, and technical specifications.
            </p>
            <Link to="/study">
              <Button size="lg">Explore Components</Button>
            </Link>
          </Card>
          <Card className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">❓ Quiz Hub</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Test your knowledge with our interactive quizzes. Choose a category and start learning now!
            </p>
            <Link to="/quiz">
              <Button size="lg">Take a Quiz</Button>
            </Link>
          </Card>
        </div>
      ) : (
        <div className="mt-12 text-center">
          <Card className="max-w-md mx-auto">
            <p className="text-lg mb-6 text-gray-700 dark:text-gray-200">Please log in or sign up to access the Study and Quiz hubs.</p>
            <div className="flex justify-center space-x-4">
              <Link to="/login"><Button size="lg">Login</Button></Link>
              <Link to="/signup"><Button size="lg" variant="secondary">Sign Up</Button></Link>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;