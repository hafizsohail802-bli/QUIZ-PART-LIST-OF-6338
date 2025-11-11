import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../../services/mockApi';
import { QuizResult } from '../../types';
import Spinner from '../../components/ui/Spinner';
import Card from '../../components/ui/Card';

type SortKey = 'userName' | 'quizDate' | 'percentage';
type SortDirection = 'asc' | 'desc';

const QuizResultsPage: React.FC = () => {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [userFilter, setUserFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({ key: 'quizDate', direction: 'desc' });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resultsData = await api.getQuizResults();
        setResults(resultsData);
      } catch (error) {
        console.error("Failed to fetch quiz results", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const uniqueUsers = useMemo(() => {
    const userNames = results.map(r => r.userName);
    return [...new Set(userNames)];
  }, [results]);

  const sortedAndFilteredResults = useMemo(() => {
    let sortableResults = [...results];
    
    if (userFilter !== 'all') {
      sortableResults = sortableResults.filter(r => r.userName === userFilter);
    }

    sortableResults.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sortableResults;
  }, [results, userFilter, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: SortDirection = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIndicator = (key: SortKey) => {
      if (sortConfig.key !== key) return null;
      return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
  }


  if (loading) return <Spinner size="lg" />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">🏆 Quiz Results</h1>
      
      <Card>
        <div className="flex items-center space-x-4">
          <label htmlFor="userFilter" className="font-medium">Filter by User:</label>
          <select 
            id="userFilter"
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="all">All Users</option>
            {uniqueUsers.map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
        </div>
      </Card>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6 cursor-pointer" onClick={() => requestSort('userName')}>
                User Name {getSortIndicator('userName')}
              </th>
              <th scope="col" className="py-3 px-6 cursor-pointer" onClick={() => requestSort('quizDate')}>
                Date {getSortIndicator('quizDate')}
              </th>
              <th scope="col" className="py-3 px-6">Score</th>
              <th scope="col" className="py-3 px-6 cursor-pointer" onClick={() => requestSort('percentage')}>
                Percentage {getSortIndicator('percentage')}
              </th>
              <th scope="col" className="py-3 px-6">Categories</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredResults.map(result => (
              <tr key={result.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{result.userName}</td>
                <td className="py-4 px-6">{new Date(result.quizDate).toLocaleString()}</td>
                <td className="py-4 px-6">{result.score} / {result.totalQuestions}</td>
                <td className="py-4 px-6">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${result.percentage >= 80 ? 'bg-green-100 text-green-800' : result.percentage >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {result.percentage}%
                  </span>
                </td>
                <td className="py-4 px-6 max-w-sm truncate">{result.categories.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {results.length === 0 && <p className="p-4 text-center">No quiz results found.</p>}
      </div>
    </div>
  );
};

export default QuizResultsPage;
