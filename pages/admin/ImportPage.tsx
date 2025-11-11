
import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import FileUpload from '../../components/FileUpload';
import { generateExcelTemplate, parseExcelFile } from '../../utils/excel';
import { ComponentImportData, ValidationError } from '../../types';
import { CATEGORIES, PANELS } from '../../constants';
import { api } from '../../services/mockApi';

type ImportStep = 'upload' | 'validate' | 'complete';

const ImportPage: React.FC = () => {
  const [step, setStep] = useState<ImportStep>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [validData, setValidData] = useState<ComponentImportData[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [importedCount, setImportedCount] = useState(0);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };
  
  const validateComponentData = (data: ComponentImportData[]): { valid: ComponentImportData[]; errors: ValidationError[] } => {
    const valid: ComponentImportData[] = [];
    const errors: ValidationError[] = [];
    const seenCodes = new Set<string>();

    data.forEach((item, index) => {
      const rowNum = index + 2; // Excel row number (accounting for header)
      
      if (!item.item_code || !item.name || !item.category || !item.panel) {
        errors.push({ row: rowNum, message: `Missing one or more required fields (item_code, name, category, panel)` });
        return;
      }
      if (seenCodes.has(item.item_code)) {
        errors.push({ row: rowNum, message: `Duplicate item_code: ${item.item_code}` });
        return;
      }
      if (!CATEGORIES.includes(item.category)) {
          errors.push({ row: rowNum, message: `Invalid category: ${item.category}` });
          return;
      }
      if (!PANELS.includes(item.panel)) {
          errors.push({ row: rowNum, message: `Invalid panel: ${item.panel}` });
          return;
      }
      
      seenCodes.add(item.item_code);
      valid.push(item);
    });

    return { valid, errors };
  };

  const handleValidate = async () => {
    if (!file) return;
    setIsLoading(true);
    try {
      const data = await parseExcelFile(file);
      const { valid, errors } = validateComponentData(data);
      setValidData(valid);
      setErrors(errors);
      setStep('validate');
    } catch (error) {
      console.error(error);
      alert('Failed to parse the file. Make sure it is a valid Excel or CSV file.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleImport = async () => {
      if(validData.length === 0) return;
      setIsLoading(true);
      try {
        const count = await api.importComponents(validData);
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
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📥 Bulk Import Components</h1>
      
      {step === 'upload' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Step 1: Download Template</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">Download the template file and fill it with your component data.</p>
              <Button onClick={generateExcelTemplate}>📥 Download Excel Template</Button>
            </Card>
            <Card className="md:col-span-2 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Step 2: Upload File</h2>
              <FileUpload onFileSelect={handleFileSelect} acceptedTypes=".xlsx,.xls,.csv" maxSizeMB={10} />
              {file && <p className="text-green-600">Selected file: {file.name}</p>}
              <Button onClick={handleValidate} disabled={!file || isLoading} isLoading={isLoading}>
                📤 Upload & Validate
              </Button>
            </Card>
        </div>
      )}

      {step === 'validate' && (
        <Card>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">✅ Import Preview</h2>
            <div className="space-y-4">
                <div className="flex space-x-4">
                    <p>Total rows found: <span className="font-bold">{validData.length + errors.length}</span></p>
                    <p className="text-green-600">Valid rows: <span className="font-bold">{validData.length}</span></p>
                    <p className="text-red-600">Errors: <span className="font-bold">{errors.length}</span></p>
                </div>

                {errors.length > 0 && (
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Errors:</h3>
                        <ul className="list-disc list-inside bg-red-50 dark:bg-red-900/20 p-4 rounded-md max-h-48 overflow-y-auto">
                            {errors.map((err, i) => <li key={i} className="text-red-700 dark:text-red-300">❌ Row {err.row}: {err.message}</li>)}
                        </ul>
                    </div>
                )}

                {validData.length > 0 && (
                     <div>
                        <h3 className="font-semibold text-lg mb-2">Preview (First 5 valid rows):</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="py-3 px-6">Item Code</th>
                                        <th scope="col" className="py-3 px-6">Name</th>
                                        <th scope="col" className="py-3 px-6">Category</th>
                                        <th scope="col" className="py-3 px-6">Panel</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {validData.slice(0, 5).map((item, i) => (
                                        <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.item_code}</td>
                                            <td className="py-4 px-6">{item.name}</td>
                                            <td className="py-4 px-6">{item.category}</td>
                                            <td className="py-4 px-6">{item.panel}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <div className="flex space-x-4 pt-4">
                    <Button onClick={handleImport} disabled={validData.length === 0 || isLoading} isLoading={isLoading}>✅ Import {validData.length} Components</Button>
                    <Button onClick={reset} variant="secondary">❌ Cancel</Button>
                </div>
            </div>
        </Card>
      )}

      {step === 'complete' && (
        <Card className="text-center">
            <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Import Successful!</h2>
            <p className="text-lg text-gray-700 dark:text-gray-200">Successfully imported <span className="font-bold">{importedCount}</span> new components.</p>
            <div className="mt-6">
                <Button onClick={reset}>Import Another File</Button>
            </div>
        </Card>
      )}

    </div>
  );
};

export default ImportPage;
