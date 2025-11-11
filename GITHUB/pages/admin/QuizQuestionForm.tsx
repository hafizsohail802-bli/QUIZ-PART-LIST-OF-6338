import React, { useState, useEffect } from 'react';
import { QuizQuestion, QuizCategory, QuizOption } from '../../types';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ImageUpload from '../../components/ui/ImageUpload';

interface QuizQuestionFormProps {
  initialData?: Partial<QuizQuestion>;
  onSubmit: (data: Omit<QuizQuestion, 'id'>) => void;
  isSaving: boolean;
  categories: QuizCategory[];
}

const QuizQuestionForm: React.FC<QuizQuestionFormProps> = ({
  initialData,
  onSubmit,
  isSaving,
  categories,
}) => {
  const [formData, setFormData] = useState<Omit<QuizQuestion, 'id'>>({
    category_id: categories[0]?.id || 0,
    question_text: '',
    question_image_url: '',
    type: 'multiple_choice',
    options: [
        { text: '', image_url: '' },
        { text: '', image_url: '' },
        { text: '', image_url: '' },
        { text: '', image_url: '' },
    ],
    correct_answer: '',
    difficulty: 'medium',
  });

  useEffect(() => {
    if (initialData) {
      let options: QuizOption[] = initialData.options || [];
      if (initialData.type === 'multiple_choice') {
        const filledOptions = options.map(opt => ({ text: opt.text, image_url: opt.image_url || '' }));
        // Ensure there are always 4 option fields in the form
        while(filledOptions.length < 4) {
            filledOptions.push({ text: '', image_url: '' });
        }
        options = filledOptions;
      }
      setFormData({ ...initialData, options } as Omit<QuizQuestion, 'id'>);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newState = { ...prev, [name]: value };
      if (name === 'type') {
        if (value === 'true_false') {
          newState.options = [{ text: 'True' }, { text: 'False' }];
          newState.correct_answer = 'True';
        } else {
          newState.options = [
            { text: '', image_url: '' },
            { text: '', image_url: '' },
            { text: '', image_url: '' },
            { text: '', image_url: '' },
          ];
          newState.correct_answer = '';
        }
      }
      return newState;
    });
  };
  
  const handleImageUrlChange = (field: 'question_image_url', url: string) => {
    setFormData(prev => ({...prev, [field]: url}));
  }

  const handleOptionTextChange = (index: number, value: string) => {
    setFormData(prev => {
      const newOptions = [...prev.options];
      newOptions[index] = { ...newOptions[index], text: value };
      if (prev.correct_answer === prev.options[index]?.text) {
          return { ...prev, options: newOptions, correct_answer: value };
      }
      return { ...prev, options: newOptions };
    });
  };
  
  const handleOptionImageChange = (index: number, url: string) => {
      setFormData(prev => {
          const newOptions = [...prev.options];
          newOptions[index] = { ...newOptions[index], image_url: url };
          return { ...prev, options: newOptions };
      });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let finalData = { ...formData };

    if (finalData.type === 'multiple_choice') {
        // An option is valid if it has text. Image is optional.
        finalData.options = finalData.options.filter(opt => opt.text.trim() !== '');
        if (finalData.options.length < 2) {
            alert('Multiple choice questions must have at least 2 non-empty options.');
            return;
        }
        if (!finalData.options.some(opt => opt.text === finalData.correct_answer)) {
            alert('The correct answer must be one of the provided options.');
            return;
        }
    }
    
    onSubmit(finalData);
  };
  
  const isMultipleChoice = formData.type === 'multiple_choice';

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="question_text" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Question Text (Required)</label>
            <textarea id="question_text" name="question_text" value={formData.question_text} onChange={handleChange} required rows={3} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
          </div>

          <div className="md:col-span-2">
             <ImageUpload label="Question Image (Optional)" initialImageUrl={formData.question_image_url} onImageUrlChange={url => handleImageUrlChange('question_image_url', url)} />
          </div>

          <div>
            <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
            <select id="category_id" name="category_id" value={formData.category_id} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Difficulty</label>
            <select id="difficulty" name="difficulty" value={formData.difficulty} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="md:col-span-2">
             <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Question Type</label>
             <select id="type" name="type" value={formData.type} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                <option value="multiple_choice">Multiple Choice</option>
                <option value="true_false">True / False</option>
             </select>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white border-t dark:border-gray-700 pt-4">Answers</h3>
            {isMultipleChoice ? (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {formData.options.map((option, index) => (
                      <div key={index} className="p-4 border rounded-md dark:border-gray-700 space-y-3">
                        <label htmlFor={`option-text-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">Option {index + 1} Text</label>
                        <input type="text" id={`option-text-${index}`} value={option.text} onChange={(e) => handleOptionTextChange(index, e.target.value)} className="block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                        <ImageUpload label={`Option ${index+1} Image (Optional)`} initialImageUrl={option.image_url} onImageUrlChange={(url) => handleOptionImageChange(index, url)} />
                      </div>
                    ))}
                </div>
                <div>
                  <label htmlFor="correct_answer" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Correct Answer</label>
                  <select id="correct_answer" name="correct_answer" value={formData.correct_answer} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                    <option value="" disabled>Select the correct option</option>
                    {formData.options.filter(opt => opt.text.trim() !== '').map((opt, i) => <option key={i} value={opt.text}>{opt.text}</option>)}
                  </select>
                </div>
              </>
            ) : (
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Correct Answer</label>
                    <div className="mt-2 space-x-4">
                        <label className="dark:text-gray-300"><input type="radio" name="correct_answer" value="True" checked={formData.correct_answer === 'True'} onChange={handleChange} className="form-radio text-primary-600" /> True</label>
                        <label className="dark:text-gray-300"><input type="radio" name="correct_answer" value="False" checked={formData.correct_answer === 'False'} onChange={handleChange} className="form-radio text-primary-600" /> False</label>
                    </div>
                </div>
            )}
          </div>
        </div>
      </Card>

      <div className="mt-6 flex justify-end">
        <Button type="submit" isLoading={isSaving} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Question'}
        </Button>
      </div>
    </form>
  );
};

export default QuizQuestionForm;