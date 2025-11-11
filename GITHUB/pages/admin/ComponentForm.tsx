
import React, { useState, useEffect } from 'react';
import { ComponentData } from '../../types';
import { CATEGORIES, PANELS } from '../../constants';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ImageUpload from '../../components/ui/ImageUpload';

interface ComponentFormProps {
  initialData?: ComponentData | null;
  onSubmit: (data: Partial<ComponentData>) => void;
  isSaving: boolean;
}

const ComponentForm: React.FC<ComponentFormProps> = ({ initialData, onSubmit, isSaving }) => {
  const [formData, setFormData] = useState<Partial<ComponentData>>({
    item_code: '',
    name: '',
    part_number: '',
    rating: '',
    category: CATEGORIES[0],
    panel: PANELS[0],
    specifications: '',
    technical_specs: '',
    pin_in_details: '',
    pin_out_details: '',
    usage_details: '',
    installation_notes: '',
    safety_warnings: '',
    manufacturer: '',
    schematic_image_url: '',
    physical_image_url: '',
    pinout_image_url: '',
    datasheet_url: '',
    wiring_diagram_url: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUrlChange = (field: keyof ComponentData, url: string) => {
    setFormData(prev => ({...prev, [field]: url}));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderTextField = (name: keyof ComponentData, label: string) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <input type="text" id={name} name={name} value={String(formData[name] || '')} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
    </div>
  );
  
  const renderTextArea = (name: keyof ComponentData, label: string) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <textarea id={name} name={name} value={String(formData[name] || '')} onChange={handleChange} rows={4} className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Required Fields */}
          <div>
            <label htmlFor="item_code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Item Code (Required)</label>
            <input type="text" id="item_code" name="item_code" value={formData.item_code} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Component Name (Required)</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category (Required)</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="panel" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Panel (Required)</label>
            <select id="panel" name="panel" value={formData.panel} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
              {PANELS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          
          {/* Optional Fields */}
          {renderTextField('part_number', 'Part Number')}
          {renderTextField('rating', 'Rating')}
          {renderTextField('manufacturer', 'Manufacturer')}
          {renderTextArea('specifications', 'Specifications')}
          {renderTextArea('technical_specs', 'Technical Specs')}
          {renderTextArea('pin_in_details', 'Pin-In Details')}
          {renderTextArea('pin_out_details', 'Pin-Out Details')}
          {renderTextArea('usage_details', 'Usage Details')}
          {renderTextArea('installation_notes', 'Installation Notes')}
          {renderTextArea('safety_warnings', 'Safety Warnings')}
          
          {/* URL/Link Fields */}
          {renderTextField('datasheet_url', 'Datasheet URL')}
          {renderTextField('wiring_diagram_url', 'Wiring Diagram URL')}
        </div>
      </Card>
      
      <Card className="mt-6">
          <div className="space-y-6">
            <ImageUpload label="Physical Image" initialImageUrl={formData.physical_image_url} onImageUrlChange={url => handleImageUrlChange('physical_image_url', url)} />
            <ImageUpload label="Schematic Image" initialImageUrl={formData.schematic_image_url} onImageUrlChange={url => handleImageUrlChange('schematic_image_url', url)} />
            <ImageUpload label="Pinout Image" initialImageUrl={formData.pinout_image_url} onImageUrlChange={url => handleImageUrlChange('pinout_image_url', url)} />
          </div>
      </Card>

      <div className="mt-6 flex justify-end">
        <Button type="submit" isLoading={isSaving} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Component'}
        </Button>
      </div>
    </form>
  );
};

export default ComponentForm;
