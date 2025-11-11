import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/mockApi';
import { QuizQuestion, QuizCategory } from '../../types';
import QuizQuestionForm from './QuizQuestionForm';
import Spinner from '../../components/ui/Spinner';

const AddQuizQuestion: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState<QuizCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.getQuizCategories().then(data => {
      setCategories(data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (data: Omit<QuizQuestion, 'id'>) => {
    setIsSaving(true);
    try {
      await api.addQuizQuestion(data);
      navigate('/admin/quizzes/questions');
    } catch (error) {
      console.error("Failed to add question", error);
      alert("Error: Could not add question.");
      setIsSaving(false);
    }
  };

  if (loading) return <Spinner size="lg" />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">➕ Add New Quiz Question</h1>
      {categories.length > 0 ? (
        <QuizQuestionForm 
          onSubmit={handleSubmit} 
          isSaving={isSaving} 
          categories={categories}
        />
      ) : (
        <p className="dark:text-white">You must create a quiz category before adding questions. <a href="/admin/quizzes" className="text-primary-500 hover:underline">Go to categories</a></p>
      )}
    </div>
  );
};

export default AddQuizQuestion;