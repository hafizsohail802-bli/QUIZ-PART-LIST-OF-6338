import React, { useState, useEffect } from 'react';
import { api } from '../../services/mockApi';
import { StudyMaterial, QuizCategory } from '../../types';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import { parseDocument } from '../../utils/documentParser';
import { generateQuestions } from '../../services/quizGenerator';

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

const StudyMaterialManagement: React.FC = () => {
    const [materials, setMaterials] = useState<StudyMaterial[]>([]);
    const [categories, setCategories] = useState<QuizCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [generating, setGenerating] = useState<number | null>(null); // Store ID of material being processed
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [materialsData, categoriesData] = await Promise.all([
                api.getStudyMaterials(),
                api.getQuizCategories()
            ]);
            setMaterials(materialsData);
            setCategories(categoriesData);
        } catch (e) {
            console.error(e);
            alert('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const fileType = selectedFile.name.endsWith('.docx') ? 'word' : 'excel';
        if (fileType !== 'word' && !selectedFile.name.endsWith('.xlsx')) {
            alert('Please upload a .docx or .xlsx file.');
            return;
        }

        setUploading(true);
        try {
            const content = await fileToBase64(selectedFile);
            // FIX: Add `createdAt` to satisfy the `Omit<StudyMaterial, 'id'>` type.
            await api.addStudyMaterial({
                name: selectedFile.name,
                type: fileType,
                content,
                createdAt: new Date().toISOString(),
            });
            setSelectedFile(null);
            fetchData(); // Refresh the list
        } catch (e) {
            console.error(e);
            alert('Failed to upload file.');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this study material?')) {
            await api.deleteStudyMaterial(id);
            fetchData();
        }
    };
    
    const handleGenerateQuiz = async (material: StudyMaterial) => {
        setGenerating(material.id);
        try {
            const textContent = await parseDocument(material);
            if (!textContent) {
                alert('Could not extract text from the document.');
                return;
            }

            const newQuestions = await generateQuestions(textContent, categories);
            if(newQuestions && newQuestions.length > 0) {
                await api.addQuestionsBatch(newQuestions);
                alert(`Successfully generated and saved ${newQuestions.length} new quiz questions!`);
            } else {
                alert('The AI could not generate questions from this document. It might be empty or in an unsupported format.');
            }

        } catch (error) {
            console.error("AI Generation Error:", error);
            alert(`An error occurred while generating the quiz: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setGenerating(null);
        }
    };


    if (loading) return <Spinner size="lg" />;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📄 Manage Study Materials</h1>
            
            <Card>
                <h2 className="text-xl font-semibold mb-4">Upload New Material</h2>
                <div className="flex items-center space-x-4">
                    <input 
                        type="file"
                        onChange={handleFileChange}
                        accept=".docx,.xlsx"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                    />
                    <Button onClick={handleUpload} disabled={!selectedFile || uploading} isLoading={uploading}>
                        Upload
                    </Button>
                </div>
                {selectedFile && <p className="text-sm mt-2">Selected: {selectedFile.name}</p>}
            </Card>

            <Card>
                <h2 className="text-xl font-semibold mb-4">Uploaded Materials</h2>
                <div className="space-y-4">
                    {materials.length > 0 ? materials.map(material => (
                        <div key={material.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div>
                                <p className="font-semibold">{material.type === 'word' ? '📄' : '📊'} {material.name}</p>
                                <p className="text-xs text-gray-500">Uploaded on {new Date(material.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button 
                                    size="sm" 
                                    variant="secondary"
                                    onClick={() => handleGenerateQuiz(material)}
                                    isLoading={generating === material.id}
                                    disabled={generating !== null}
                                >
                                    {generating === material.id ? 'Generating...' : '✨ Generate Quiz'}
                                </Button>
                                <Button size="sm" variant="danger" onClick={() => handleDelete(material.id)}>Delete</Button>
                            </div>
                        </div>
                    )) : (
                        <p className="text-gray-500">No study materials have been uploaded yet.</p>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default StudyMaterialManagement;