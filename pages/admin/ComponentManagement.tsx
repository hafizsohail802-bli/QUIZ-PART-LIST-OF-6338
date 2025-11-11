
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/mockApi';
import { ComponentData } from '../../types';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import { exportComponentsToExcel } from '../../utils/excel';
import { PANELS, CATEGORIES } from '../../constants';

const ComponentManagement: React.FC = () => {
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [panelFilter, setPanelFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const fetchComponents = async () => {
    setLoading(true);
    const data = await api.getComponents();
    setComponents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchComponents();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this component?')) {
      await api.deleteComponent(id);
      fetchComponents();
    }
  };

  const filteredComponents = useMemo(() => {
    return components.filter(c => 
      (c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.item_code.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (panelFilter === 'All' || c.panel === panelFilter) &&
      (categoryFilter === 'All' || c.category === categoryFilter)
    );
  }, [components, searchTerm, panelFilter, categoryFilter]);
  
  if (loading) return <Spinner size="lg" />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📦 Manage Components</h1>
        <div className="space-x-2">
            <Button onClick={() => exportComponentsToExcel(filteredComponents)}>Export to Excel</Button>
            <Link to="/admin/components/new">
              <Button>➕ Add Component</Button>
            </Link>
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow space-y-4 md:space-y-0 md:flex md:justify-between md:items-center">
          <input 
            type="text"
            placeholder="Search by name or item code..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 w-full md:w-1/3"
          />
          <div className="flex space-x-4">
            <select value={panelFilter} onChange={e => setPanelFilter(e.target.value)} className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                {PANELS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                <option value="All">All Categories</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">Item Code</th>
              <th scope="col" className="py-3 px-6">Name</th>
              <th scope="col" className="py-3 px-6">Category</th>
              <th scope="col" className="py-3 px-6">Panel</th>
              <th scope="col" className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredComponents.map(component => (
              <tr key={component.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{component.item_code}</td>
                <td className="py-4 px-6">{component.name}</td>
                <td className="py-4 px-6">{component.category}</td>
                <td className="py-4 px-6">{component.panel}</td>
                <td className="py-4 px-6 space-x-2">
                  <Link to={`/admin/components/${component.id}/edit`}><Button size="sm" variant="secondary">Edit</Button></Link>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(component.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredComponents.length === 0 && <p className="p-4 text-center">No components found.</p>}
      </div>
    </div>
  );
};

export default ComponentManagement;
