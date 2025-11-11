import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/mockApi';
import { ComponentData } from '../../types';
import ComponentForm from './ComponentForm';

const AddComponent: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: Partial<ComponentData>) => {
    setIsSaving(true);
    try {
      await api.addComponent(data as Omit<ComponentData, 'id'>);
      navigate('/admin/components');
    } catch (error) {
      console.error("Failed to add component", error);
      alert("Error: Could not add component.");
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">➕ Add New Component</h1>
      <ComponentForm onSubmit={handleSubmit} isSaving={isSaving} />
    </div>
  );
};

export default AddComponent;
