import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/mockApi';
import { QuizQuestion, QuizCategory } from '../../types';
import Spinner from '../../components/ui/Spinner';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

type Difficulty = 'all' | 'easy' | 'medium' | 'hard';
type QuestionTypeFilter = 'all' | 'text' | 'image';

const QuizConfigPage: React.FC = () => {
  const navigate = useNavigate();
  const [allQuestions, setAllQuestions] = useState<QuizQuestion[]>([]);
  const [categories, setCategories] = useState<QuizCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [numQuestions, setNumQuestions] = useState(10);
  const [customNum, setCustomNum] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('all');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [questionType, setQuestionType] = useState<QuestionTypeFilter>('all');
  const [timeLimit, setTimeLimit] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [qData, cData] = await Promise.all([api.getQuestions(), api.getQuizCategories()]);
        setAllQuestions(qData);
        setCategories(cData);
        setSelectedCategories(cData.map(c => c.id)); // Select all by default
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter(q =>
      (selectedCategories.includes(q.category_id)) &&
      (difficulty === 'all' || q.difficulty === difficulty) &&
      (questionType === 'all' || (questionType === 'image' ? !!q.question_image_url : !q.question_image_url))
    );
  }, [allQuestions, selectedCategories, difficulty, questionType]);

  const handleCategoryToggle = (catId: number) => {
    setSelectedCategories(prev =>
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
    );
  };

  const handleSelectAll = () => setSelectedCategories(categories.map(c => c.id));
  const handleDeselectAll = () => setSelectedCategories([]);
  
  const handleStartQuiz = () => {
      const finalNumQuestions = customNum ? parseInt(customNum) : numQuestions;
      const questionsForQuiz = filteredQuestions
        .sort(() => 0.5 - Math.random()) // Shuffle
        .slice(0, finalNumQuestions);

      navigate('/quiz/session', { state: { questions: questionsForQuiz, categories: categories, timeLimit } });
  };
  
  const totalAvailable = filteredQuestions.length;
  const finalQuestionCount = Math.min(customNum ? parseInt(customNum) || totalAvailable : numQuestions, totalAvailable);


  if (loading) return <Spinner size="lg" />;

  return (
    <div className="bg-primary-900 min-h-screen p-4 md:p-8 flex items-center justify-center">
      <Card className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Configure Your Quiz</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Customize your learning experience by selecting topics, difficulty, and more.</p>

        {/* Number of Questions */}
        <div className="mb-6">
            <h2 className="font-semibold mb-2">How many questions do you want?</h2>
            <div className="flex flex-wrap gap-2">
                {[5, 10, 15, 20, 25, 50].map(n => (
                    <Button key={n} variant={numQuestions === n && !customNum ? 'primary' : 'secondary'} onClick={() => { setNumQuestions(n); setCustomNum(''); }}>{n}</Button>
                ))}
                <input type="number" placeholder={`Max: ${totalAvailable}`} value={customNum} onChange={e => setCustomNum(e.target.value)}
                    className="w-24 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    max={totalAvailable}
                />
            </div>
             <p className="text-sm text-gray-500 mt-2">Total available questions: {totalAvailable}</p>
        </div>
        
        {/* Difficulty */}
        <div className="mb-6">
            <h2 className="font-semibold mb-2">Select Difficulty</h2>
             <div className="flex flex-wrap gap-4">
                {(['all', 'easy', 'medium', 'hard'] as Difficulty[]).map(d => (
                    <label key={d} className="flex items-center space-x-2">
                        <input type="radio" name="difficulty" value={d} checked={difficulty === d} onChange={() => setDifficulty(d)} className="form-radio text-primary-600"/>
                        <span className="capitalize">{d === 'all' ? 'Mixed (All)' : d}</span>
                    </label>
                ))}
            </div>
        </div>
        
        {/* Question Type */}
        <div className="mb-6">
            <h2 className="font-semibold mb-2">Select Question Type</h2>
             <div className="flex flex-wrap gap-4">
                {(['all', 'text', 'image'] as QuestionTypeFilter[]).map(t => (
                    <label key={t} className="flex items-center space-x-2">
                        <input type="radio" name="questionType" value={t} checked={questionType === t} onChange={() => setQuestionType(t)} className="form-radio text-primary-600"/>
                        <span className="capitalize">{t === 'all' ? 'All Types' : t === 'image' ? 'Image-Based' : 'Text-Only'}</span>
                    </label>
                ))}
            </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">Select Categories</h2>
                <div>
                    <Button variant="ghost" size="sm" onClick={handleSelectAll}>Select All</Button> / <Button variant="ghost" size="sm" onClick={handleDeselectAll}>Deselect All</Button>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {categories.map(cat => (
                    <label key={cat.id} className="flex items-center space-x-2">
                        <input type="checkbox" checked={selectedCategories.includes(cat.id)} onChange={() => handleCategoryToggle(cat.id)} className="form-checkbox text-primary-600"/>
                        <span>{cat.name}</span>
                    </label>
                ))}
            </div>
        </div>
        
        {/* Time Limit */}
         <div className="mb-6">
            <h2 className="font-semibold mb-2">Time Limit (Optional)</h2>
             <div className="flex flex-wrap gap-4">
                {[0, 30, 60, 120].map(t => (
                    <label key={t} className="flex items-center space-x-2">
                        <input type="radio" name="time" value={t} checked={timeLimit === t} onChange={() => setTimeLimit(t)} className="form-radio text-primary-600"/>
                        <span>{t === 0 ? 'No time limit' : `${t/60 || t} ${t > 60 ? 'minutes' : 'seconds'} per question`}</span>
                    </label>
                ))}
            </div>
        </div>


        <div className="flex justify-end space-x-4 mt-8 border-t dark:border-gray-700 pt-6">
            <Button variant="secondary" onClick={() => navigate('/quiz')}>Back</Button>
            <Button onClick={handleStartQuiz} disabled={finalQuestionCount === 0}>
                Start Quiz ({finalQuestionCount} Questions)
            </Button>
        </div>
      </Card>
    </div>
  );
};

export default QuizConfigPage;