import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/mockApi';
import { ComponentData } from '../../types';
import ComponentForm from './ComponentForm';
import Spinner from '../../components/ui/Spinner';

const EditComponent: React.FC = () => {
  const [component, setComponent] = useState<ComponentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.getComponent(parseInt(id, 10))
        .then(data => {
            if(data) setComponent(data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = async (data: Partial<ComponentData>) => {
    if (!id) return;
    setIsSaving(true);
    try {
      await api.updateComponent(parseInt(id, 10), data);
      navigate('/admin/components');
    } catch (error) {
      console.error("Failed to update component", error);
      alert("Error: Could not update component.");
      setIsSaving(false);
    }
  };

  if (loading) return <Spinner size="lg" />;
  if (!component) return <div className="dark:text-white">Component not found.</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">✏️ Edit Component: {component.item_code}</h1>
      <ComponentForm initialData={component} onSubmit={handleSubmit} isSaving={isSaving} />
    </div>
  );
};

export default EditComponent;
