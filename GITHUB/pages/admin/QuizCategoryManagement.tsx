import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/mockApi';
import { QuizCategory, ComponentData } from '../../types';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import Modal from '../../components/ui/Modal';
import Card from '../../components/ui/Card';
import { CATEGORIES } from '../../constants';
import { generateQuestionsFromComponents } from '../../services/quizGenerator';

const QuizCategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<QuizCategory[]>([]);
  const [allComponents, setAllComponents] = useState<ComponentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Partial<QuizCategory> | null>(null);

  // States for AI Quiz Generator Modal
  const [isGeneratorModalOpen, setIsGeneratorModalOpen] = useState(false);
  const [generatingQuiz, setGeneratingQuiz] = useState(false);
  const [selectedCompCategories, setSelectedCompCategories] = useState<string[]>([]);
  const [selectedTargetCategories, setSelectedTargetCategories] = useState<QuizCategory[]>([]);
  const [numQuestions, setNumQuestions] = useState(5);
  const [numQuestionsMode, setNumQuestionsMode] = useState<'fixed' | 'auto'>('fixed');


  const fetchData = async () => {
    setLoading(true);
    try {
      const [categoriesData, componentsData] = await Promise.all([
        api.getQuizCategories(),
        api.getComponents()
      ]);
      setCategories(categoriesData);
      setAllComponents(componentsData);
      setSelectedTargetCategories(categoriesData); // Default to all selected
      setSelectedCompCategories(CATEGORIES); // Default to all selected
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddNew = () => {
    setEditingCategory({ name: '', description: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (category: QuizCategory) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this category? This will also delete all associated questions.')) {
      await api.deleteQuizCategory(id);
      fetchData();
    }
  };

  const handleSave = async () => {
    if (!editingCategory) return;
    if (editingCategory.id) {
      await api.updateQuizCategory(editingCategory.id, editingCategory);
    } else {
      await api.addQuizCategory(editingCategory as Omit<QuizCategory, 'id'>);
    }
    fetchData();
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleOpenGenerator = () => {
    setIsGeneratorModalOpen(true);
  };

  const handleGenerateFromLibrary = async () => {
    if (selectedTargetCategories.length === 0) {
        alert("Please select at least one quiz category to add questions to.");
        return;
    }
    if (selectedCompCategories.length === 0) {
        alert("Please select at least one component category to use as context.");
        return;
    }
    setGeneratingQuiz(true);
    try {
        const componentsToUse = allComponents.filter(c => selectedCompCategories.includes(c.category));
        if (componentsToUse.length === 0) {
            alert(`No components found in the selected categories.`);
            setGeneratingQuiz(false);
            return;
        }

        const questionCount = numQuestionsMode === 'auto' ? 'auto' : numQuestions;
        const newQuestions = await generateQuestionsFromComponents(componentsToUse, selectedTargetCategories, questionCount);
        
        if (newQuestions && newQuestions.length > 0) {
            await api.addQuestionsBatch(newQuestions);
            alert(`Successfully generated and added ${newQuestions.length} questions!`);
            setIsGeneratorModalOpen(false);
        } else {
            alert("The AI could not generate questions from the selected components. The component data might be insufficient or there might have been a network issue.");
        }
    } catch (error) {
        console.error("AI Generation Error:", error);
        alert(`An error occurred while generating the quiz: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
        setGeneratingQuiz(false);
    }
  };

  const handleCompCatToggle = (category: string) => {
    setSelectedCompCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
  };
  
  const handleTargetCatToggle = (category: QuizCategory) => {
    setSelectedTargetCategories(prev => prev.some(c => c.id === category.id) ? prev.filter(c => c.id !== category.id) : [...prev, category]);
  }


  if (loading) return <Spinner size="lg" />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📚 Manage Quiz Categories</h1>
        <Button onClick={handleAddNew}>✨ Create New Category</Button>
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Quiz Administration</h2>
        <div className="flex flex-wrap gap-4">
            <Link to="/admin/quizzes/questions"><Button variant="secondary">❓ Manage Questions</Button></Link>
            <Link to="/admin/quizzes/import"><Button variant="secondary">📥 Bulk Import Questions</Button></Link>
            <Button variant="secondary" onClick={handleOpenGenerator}>🤖 Generate from Library</Button>
        </div>
      </Card>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">Category Name</th>
              <th scope="col" className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">{cat.name}</td>
                <td className="py-4 px-6 space-x-2">
                  <Button size="sm" variant="secondary" onClick={() => handleEdit(cat)}>Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(cat.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {categories.length === 0 && <p className="p-4 text-center">No quiz categories found.</p>}
      </div>

      {isModalOpen && editingCategory && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title={editingCategory.id ? 'Edit Category' : 'Add Category'}
          footer={<>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </>}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">Category Name</label>
                <input
                  id="name"
                  type="text"
                  value={editingCategory.name}
                  onChange={e => setEditingCategory(p => p ? { ...p, name: e.target.value } : null)}
                  className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium">Learning Materials / Description</label>
                <textarea
                  id="description"
                  rows={10}
                  value={editingCategory.description}
                  onChange={e => setEditingCategory(p => p ? { ...p, description: e.target.value } : null)}
                  className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
        </Modal>
      )}

      {isGeneratorModalOpen && (
        <Modal
            size="lg"
            isOpen={isGeneratorModalOpen}
            onClose={() => setIsGeneratorModalOpen(false)}
            title="🤖 Generate Quiz from Component Library"
            footer={<>
                <Button variant="secondary" onClick={() => setIsGeneratorModalOpen(false)}>Cancel</Button>
                <Button onClick={handleGenerateFromLibrary} isLoading={generatingQuiz} disabled={generatingQuiz}>
                    {generatingQuiz ? 'Generating...' : `Generate Questions`}
                </Button>
            </>}>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">1. Select Component Categories for Context</label>
                    <div className="flex space-x-2 mt-2">
                      <Button size="sm" variant="ghost" onClick={() => setSelectedCompCategories(CATEGORIES)}>Select All</Button>
                      <Button size="sm" variant="ghost" onClick={() => setSelectedCompCategories([])}>Deselect All</Button>
                    </div>
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2 border p-2 rounded-md max-h-32 overflow-y-auto">
                      {CATEGORIES.map(c => 
                        <label key={c} className="flex items-center space-x-2">
                          <input type="checkbox" checked={selectedCompCategories.includes(c)} onChange={() => handleCompCatToggle(c)} className="form-checkbox text-primary-600"/>
                          <span>{c}</span>
                        </label>
                      )}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">2. Select Quiz Categories to Add Questions To</label>
                    <div className="flex space-x-2 mt-2">
                      <Button size="sm" variant="ghost" onClick={() => setSelectedTargetCategories(categories)}>Select All</Button>
                      <Button size="sm" variant="ghost" onClick={() => setSelectedTargetCategories([])}>Deselect All</Button>
                    </div>
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2 border p-2 rounded-md max-h-32 overflow-y-auto">
                        {categories.map(c => 
                          <label key={c.id} className="flex items-center space-x-2">
                            <input type="checkbox" checked={selectedTargetCategories.some(sc => sc.id === c.id)} onChange={() => handleTargetCatToggle(c)} className="form-checkbox text-primary-600"/>
                            <span>{c.name}</span>
                          </label>
                        )}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">3. Number of Questions to Generate</label>
                    <div className="flex items-center space-x-4 mt-2">
                      <label className="flex items-center">
                        <input type="radio" name="numQuestionsMode" value="fixed" checked={numQuestionsMode === 'fixed'} onChange={() => setNumQuestionsMode('fixed')} className="form-radio text-primary-600" />
                        <span className="ml-2">Fixed:</span>
                      </label>
                      <input
                          type="number"
                          value={numQuestions}
                          onChange={e => setNumQuestions(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-24 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                          min="1"
                          max="20"
                          disabled={numQuestionsMode !== 'fixed'}
                      />
                    </div>
                     <div className="flex items-center mt-2">
                        <input type="radio" name="numQuestionsMode" value="auto" checked={numQuestionsMode === 'auto'} onChange={() => setNumQuestionsMode('auto')} className="form-radio text-primary-600" />
                        <span className="ml-2">As many as possible</span>
                    </div>
                </div>
            </div>
        </Modal>
      )}
    </div>
  );
};

export default QuizCategoryManagement;