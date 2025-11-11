import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/mockApi';
import { QuizResult } from '../../types';
import Spinner from '../../components/ui/Spinner';

const QuizHubPage: React.FC = () => {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const fetchResults = async () => {
        setLoading(true);
        try {
          const allResults = await api.getQuizResults();
          const userResults = allResults
            .filter(r => r.userId === user.id)
            .sort((a, b) => new Date(b.quizDate).getTime() - new Date(a.quizDate).getTime());
          setResults(userResults);
        } catch (error) {
          console.error("Failed to fetch results", error);
        } finally {
          setLoading(false);
        }
      };
      fetchResults();
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">❓ Quiz Hub</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-1">
          <Card className="text-center h-full flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Ready for a challenge?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Customize your quiz by selecting categories, difficulty, and number of questions.
            </p>
            <Link to="/quiz/configure">
              <Button size="lg">
                Configure & Start New Quiz
              </Button>
            </Link>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Your Past Results</h2>
            {loading ? (
              <Spinner />
            ) : results.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="py-3 px-6">Date</th>
                      <th scope="col" className="py-3 px-6">Categories</th>
                      <th scope="col" className="py-3 px-6">Score</th>
                      <th scope="col" className="py-3 px-6">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map(result => (
                      <tr key={result.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="py-4 px-6">{new Date(result.quizDate).toLocaleString()}</td>
                        <td className="py-4 px-6 max-w-xs truncate">{result.categories.join(', ')}</td>
                        <td className="py-4 px-6">{result.score} / {result.totalQuestions}</td>
                        <td className="py-4 px-6 font-bold">
                           <span className={`px-2 py-1 rounded-full text-xs font-semibold ${result.percentage >= 80 ? 'bg-green-100 text-green-800' : result.percentage >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                            {result.percentage}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">You haven't completed any quizzes yet. Start one to see your results here!</p>
            )}
          </Card>
        </div>

      </div>
    </div>
  );
};

export default QuizHubPage;
