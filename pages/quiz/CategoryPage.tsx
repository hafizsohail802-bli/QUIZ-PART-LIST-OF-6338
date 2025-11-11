import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QuizQuestion, QuizCategory, QuizOption } from '../../types';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/mockApi';

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

const QuizSessionPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { questions, categories, timeLimit } = (location.state as { questions: QuizQuestion[], categories: QuizCategory[], timeLimit: number }) || { questions: [], categories: [], timeLimit: 0 };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');

  useEffect(() => {
    if (!questions || questions.length === 0) {
      navigate('/quiz/configure');
    }
  }, [questions, navigate]);

  useEffect(() => {
    if (isFinished && user) {
        const categoryMap = new Map(categories.map(c => [c.id, c.name]));
        const uniqueCategoryIds = [...new Set(questions.map(q => q.category_id))];
        const quizCategories = uniqueCategoryIds.map(id => categoryMap.get(id) || 'Unknown');

        const resultData = {
            userId: user.id,
            userName: user.name,
            quizDate: new Date().toISOString(),
            score,
            totalQuestions: questions.length,
            percentage: Math.round((score / questions.length) * 100),
            categories: quizCategories,
        };
        api.addQuizResult(resultData);
    }
  }, [isFinished, user, score, questions, categories]);

  const handleAnswer = (answer: string) => {
    if (answerState !== 'unanswered') return;

    setSelectedOption(answer);
    const isCorrect = answer === questions[currentQuestionIndex].correct_answer;
    
    if (isCorrect) {
      setScore(s => s + 1);
      setAnswerState('correct');
    } else {
      setAnswerState('incorrect');
    }

    setUserAnswers(prev => [...prev, answer]);
  };
  
  const handleNext = () => {
    setAnswerState('unanswered');
    setSelectedOption(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="container mx-auto p-4 md:p-8 flex items-center justify-center min-h-[80vh]">
        <Card className="text-center">
          <h1 className="text-3xl font-bold mb-4">Quiz Complete!</h1>
          <p className="text-xl mb-6">Your score: <span className="font-bold text-primary-600">{score}</span> / {questions.length}</p>
          <Button onClick={() => navigate('/quiz/configure')}>Take Another Quiz</Button>
        </Card>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return null; 
  }

  const currentQuestion = questions[currentQuestionIndex];

  const getButtonClass = (optionText: string) => {
    if (answerState === 'unanswered') {
      return 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600';
    }
    if (optionText === currentQuestion.correct_answer) {
      return 'bg-green-500 text-white ring-2 ring-green-300';
    }
    if (optionText === selectedOption && optionText !== currentQuestion.correct_answer) {
      return 'bg-red-500 text-white ring-2 ring-red-300';
    }
    return 'bg-gray-200 dark:bg-gray-700 opacity-50';
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card>
        <div className="mb-4">
          <p className="text-sm text-gray-500">Question {currentQuestionIndex + 1} of {questions.length}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-1">
            <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4">{currentQuestion.question_text}</h2>
        {currentQuestion.question_image_url && (
          <div className="my-4 flex justify-center bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
            <img src={currentQuestion.question_image_url} alt="Question visual" className="max-h-80 rounded-lg object-contain" />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.text)}
              disabled={answerState !== 'unanswered'}
              className={`p-3 rounded-lg text-center transition-all duration-200 ${getButtonClass(option.text)}`}
            >
              <div className="flex flex-col items-center justify-center h-full">
                {option.image_url && (
                    <div className="w-full h-32 mb-2 flex items-center justify-center bg-white dark:bg-gray-800 rounded-md overflow-hidden">
                        <img src={option.image_url} alt={`Option ${index + 1}`} className="max-h-full max-w-full object-contain" />
                    </div>
                )}
                <span className="font-medium">{option.text}</span>
              </div>
            </button>
          ))}
        </div>
        
        {answerState !== 'unanswered' && (
            <div className="mt-6 text-right">
                <Button onClick={handleNext}>
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </Button>
            </div>
        )}
      </Card>
    </div>
  );
};

export default QuizSessionPage;