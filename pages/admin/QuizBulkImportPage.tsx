import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import FileUpload from '../../components/FileUpload';
import { QuizImportData, ValidationError } from '../../types';
import { api } from '../../services/mockApi';

declare var XLSX: any; 

type ImportStep = 'upload' | 'validate' | 'complete';

const generateQuizTemplate = () => {
    const exampleRow = {
        category: 'MCB',
        question_text: 'What is the primary function of an MCB?',
        question_image_url: 'https://example.com/image.png',
        type: 'multiple_choice',
        option1: 'Overcurrent protection',
        option2: 'Overvoltage protection',
        option3: 'Frequency stabilization',
        option4: 'Phase sequencing',
        correct_answer: 'option1',
    };
    const exampleRow2 = {
        category: 'Relay',
        question_text: 'A relay is an electrically operated switch.',
        question_image_url: '',
        type: 'true_false',
        option1: 'True',
        option2: 'False',
        option3: '',
        option4: '',
        correct_answer: 'True',
    };

    const ws = XLSX.utils.json_to_sheet([exampleRow, exampleRow2]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Quiz Questions');
    XLSX.writeFile(wb, 'Quiz_Import_Template.xlsx');
}

const QuizBulkImportPage: React.FC = () => {
  const [step, setStep] = useState<ImportStep>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [validData, setValidData] = useState<QuizImportData[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [importedCount, setImportedCount] = useState(0);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };
  
  const validateData = (data: any[]): { valid: QuizImportData[]; errors: ValidationError[] } => {
    const valid: QuizImportData[] = [];
    const errors: ValidationError[] = [];

    data.forEach((row, index) => {
      const rowNum = index + 2;
      if (!row.category || !row.question_text || !row.type || !row.option1 || !row.option2 || !row.correct_answer) {
        errors.push({ row: rowNum, message: 'Missing one or more required fields.' });
        return;
      }
      if (row.type !== 'multiple_choice' && row.type !== 'true_false') {
          errors.push({ row: rowNum, message: `Invalid type: '${row.type}'. Must be 'multiple_choice' or 'true_false'.`});
          return;
      }
      valid.push(row as QuizImportData);
    });
    return { valid, errors };
  };

  const handleValidate = async () => {
    if (!file) return;
    setIsLoading(true);
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const { valid, errors } = validateData(jsonData);
      setValidData(valid);
      setErrors(errors);
      setStep('validate');
    } catch (error) {
      console.error(error);
      alert('Failed to parse the file.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleImport = async () => {
      if(validData.length === 0) return;
      setIsLoading(true);
      try {
        const count = await api.importQuestions(validData);
        setImportedCount(count);
        setStep('complete');
      } catch (error) {
          console.error(error);
          alert('An error occurred during import.');
      } finally {
        setIsLoading(false);
      }
  }

  const reset = () => {
    setStep('upload');
    setFile(null);
    setValidData([]);
    setErrors([]);
    setImportedCount(0);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📥 Bulk Import Quiz Questions</h1>
      
      {step === 'upload' && (
        <Card className="space-y-4">
            <h2 className="text-xl font-semibold">Instructions</h2>
            <p>1. Download the Excel template.</p>
            <p>2. Fill the template with your quiz questions. Ensure the 'category' name matches an existing Quiz Category exactly.</p>
            <p>3. For 'type', use either `multiple_choice` or `true_false`.</p>
            <p>4. For `correct_answer` in multiple choice, you can use the text (e.g., "Overcurrent protection") or the option key (e.g., "option1").</p>
            <Button onClick={generateQuizTemplate}>📥 Download Excel Template</Button>
            <hr className="my-4 dark:border-gray-600"/>
            <h2 className="text-xl font-semibold">Upload File</h2>
            <FileUpload onFileSelect={handleFileSelect} acceptedTypes=".xlsx,.xls,.csv" maxSizeMB={5} />
            {file && <p className="text-green-600">Selected file: {file.name}</p>}
            <Button onClick={handleValidate} disabled={!file || isLoading} isLoading={isLoading}>
                📤 Upload & Validate
            </Button>
        </Card>
      )}

      {step === 'validate' && (
        <Card>
            <h2 className="text-2xl font-semibold mb-4">✅ Import Preview</h2>
             <div className="flex space-x-4">
                <p>Total rows found: <span className="font-bold">{validData.length + errors.length}</span></p>
                <p className="text-green-600">Valid rows: <span className="font-bold">{validData.length}</span></p>
                <p className="text-red-600">Errors: <span className="font-bold">{errors.length}</span></p>
            </div>
            {errors.length > 0 && (
                <div className="mt-4">
                    <h3 className="font-semibold text-lg mb-2">Errors:</h3>
                    <ul className="list-disc list-inside bg-red-50 dark:bg-red-900/20 p-4 rounded-md max-h-48 overflow-y-auto">
                        {errors.map((err, i) => <li key={i} className="text-red-700 dark:text-red-300">❌ Row {err.row}: {err.message}</li>)}
                    </ul>
                </div>
            )}
            <div className="flex space-x-4 pt-4 mt-4 border-t dark:border-gray-600">
                <Button onClick={handleImport} disabled={validData.length === 0 || isLoading} isLoading={isLoading}>✅ Import {validData.length} Questions</Button>
                <Button onClick={reset} variant="secondary">❌ Cancel</Button>
            </div>
        </Card>
      )}

      {step === 'complete' && (
        <Card className="text-center">
            <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Import Successful!</h2>
            <p className="text-lg">Successfully imported <span className="font-bold">{importedCount}</span> new questions.</p>
            <div className="mt-6">
                <Button onClick={reset}>Import Another File</Button>
            </div>
        </Card>
      )}

    </div>
  );
};

export default QuizBulkImportPage;