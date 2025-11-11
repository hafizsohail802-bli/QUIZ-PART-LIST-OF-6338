import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/mockApi';
import { ComponentData, StudyMaterial } from '../../types';
import Card from '../../components/ui/Card';
import Spinner from '../../components/ui/Spinner';
import Button from '../../components/ui/Button';
import { CATEGORIES, PANELS } from '../../constants';

const StudyPage: React.FC = () => {
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [panelFilter, setPanelFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [componentData, materialData] = await Promise.all([
        api.getComponents(),
        api.getStudyMaterials()
      ]);
      setComponents(componentData);
      setMaterials(materialData);
      setLoading(false);
    };
    fetchData();
  }, []);
  
  const downloadMaterial = (material: StudyMaterial) => {
    const link = document.createElement('a');
    link.href = material.content;
    link.download = material.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredComponents = useMemo(() => {
    return components.filter(c =>
      (c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       c.item_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
       (c.manufacturer && c.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (panelFilter === 'All' || c.panel === panelFilter) &&
      (categoryFilter === 'All' || c.category === categoryFilter)
    );
  }, [components, searchTerm, panelFilter, categoryFilter]);

  if (loading) return <div className="flex justify-center items-center h-screen"><Spinner size="lg" /></div>;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">📖 Study Hub</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Browse components and download study materials.</p>
      </div>
      
      <Card className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Filter Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input 
            type="text"
            placeholder="Search by name, code, manufacturer..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 w-full col-span-1 md:col-span-1"
          />
          <select value={panelFilter} onChange={e => setPanelFilter(e.target.value)} className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
              {PANELS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
              <option value="All">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </Card>
      
       <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Documents & Downloads</h2>
        {materials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {materials.map(material => (
              <Card key={material.id} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{material.type === 'word' ? '📄' : '📊'} {material.name}</p>
                  <p className="text-sm text-gray-500">Uploaded: {new Date(material.createdAt).toLocaleDateString()}</p>
                </div>
                <Button size="sm" onClick={() => downloadMaterial(material)}>Download</Button>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No study documents have been uploaded yet.</p>
        )}
       </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Component Library</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredComponents.map(component => (
          <Link to={`/study/component/${component.id}`} key={component.id}>
            <Card className="h-full flex flex-col hover:shadow-lg hover:border-primary-500 border-2 border-transparent transition-all duration-200">
              <div className="flex-grow">
                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 flex items-center justify-center">
                    <img src={component.physical_image_url || 'https://via.placeholder.com/150'} alt={component.name} className="max-h-full max-w-full" />
                </div>
                <h3 className="text-lg font-bold text-primary-600 dark:text-primary-400">{component.item_code}</h3>
                <p className="font-semibold text-gray-800 dark:text-white">{component.name}</p>
              </div>
              <div className="mt-4 flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{component.category}</span>
                <span>{component.panel}</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {filteredComponents.length === 0 && (
          <div className="text-center py-16">
              <p className="text-xl text-gray-500">No components found matching your criteria.</p>
          </div>
      )}
    </div>
  );
};

export default StudyPage;