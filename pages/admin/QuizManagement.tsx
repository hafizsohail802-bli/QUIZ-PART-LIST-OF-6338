import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/mockApi';
import { QuizQuestion, QuizCategory } from '../../types';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';

const QuizManagement: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [categories, setCategories] = useState<QuizCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [qData, cData] = await Promise.all([api.getQuestions(), api.getQuizCategories()]);
      setQuestions(qData);
      setCategories(cData);
    } catch (error) {
      console.error('Failed to fetch quiz data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const categoryMap = useMemo(() => {
    return new Map(categories.map(cat => [cat.id, cat.name]));
  }, [categories]);

  const filteredQuestions = useMemo(() => {
    if (categoryFilter === 'all') return questions;
    const catId = parseInt(categoryFilter);
    return questions.filter(q => q.category_id === catId);
  }, [questions, categoryFilter]);
  
  if (loading) return <Spinner size="lg" />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">❓ Manage Quiz Questions</h1>
        <Link to="/admin/quizzes/questions/new">
          <Button>➕ Add New Question</Button>
        </Link>
      </div>
      
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex justify-between items-center">
          <p>Total Questions: <span className="font-bold">{questions.length}</span></p>
          <div>
            <label>Filter by category: </label>
            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                <option value="all">All Categories</option>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>
      </div>
      
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">Question Text</th>
              <th scope="col" className="py-3 px-6">Category</th>
              <th scope="col" className="py-3 px-6">Type</th>
              <th scope="col" className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.map(q => (
              <tr key={q.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="py-4 px-6 font-medium text-gray-900 dark:text-white max-w-md truncate">{q.question_text}</td>
                <td className="py-4 px-6">{categoryMap.get(q.category_id) || 'Unknown'}</td>
                <td className="py-4 px-6">{q.type}</td>
                <td className="py-4 px-6">
                  <Button size="sm" variant="danger" disabled>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredQuestions.length === 0 && <p className="p-4 text-center">No questions found for this category.</p>}
      </div>
    </div>
  );
};

export default QuizManagement;