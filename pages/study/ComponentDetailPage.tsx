
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/mockApi';
import { ComponentData } from '../../types';
import Spinner from '../../components/ui/Spinner';
import Card from '../../components/ui/Card';

const DetailItem: React.FC<{ label: string; value?: string }> = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2 whitespace-pre-wrap">{value}</dd>
    </div>
  );
};

const ImageCard: React.FC<{ title: string, src?: string }> = ({ title, src }) => {
    if (!src) return null;
    return (
        <Card>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
            <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                <img src={src} alt={title} className="max-h-80 object-contain"/>
            </div>
        </Card>
    )
}

const ComponentDetailPage: React.FC = () => {
  const [component, setComponent] = useState<ComponentData | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

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

  if (loading) return <div className="flex justify-center items-center h-screen"><Spinner size="lg" /></div>;
  if (!component) return <div className="text-center py-10 dark:text-white">Component not found.</div>;

  return (
    <div className="container mx-auto p-4 md:p-8">
        <div className="mb-4">
            <Link to="/study" className="text-primary-600 hover:underline"> &larr; Back to Study Hub</Link>
        </div>
      <Card>
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-3xl leading-6 font-bold text-gray-900 dark:text-white">{component.name} ({component.item_code})</h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">{component.category} in Panel {component.panel}</p>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200 dark:sm:divide-gray-700">
            <div className="sm:px-6">
                <DetailItem label="Part Number" value={component.part_number} />
                <DetailItem label="Rating" value={component.rating} />
                <DetailItem label="Manufacturer" value={component.manufacturer} />
                <DetailItem label="Specifications" value={component.specifications} />
                <DetailItem label="Technical Specs" value={component.technical_specs} />
                <DetailItem label="Pin-In Details" value={component.pin_in_details} />
                <DetailItem label="Pin-Out Details" value={component.pin_out_details} />
                <DetailItem label="Usage Details" value={component.usage_details} />
                <DetailItem label="Installation Notes" value={component.installation_notes} />
                <DetailItem label="Safety Warnings" value={component.safety_warnings} />
                 {component.datasheet_url && <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4"><dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Datasheet</dt><dd><a href={component.datasheet_url} target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">View Datasheet</a></dd></div>}
                {component.wiring_diagram_url && <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4"><dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Wiring Diagram</dt><dd><a href={component.wiring_diagram_url} target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">View Diagram</a></dd></div>}
            </div>
          </dl>
        </div>
      </Card>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <ImageCard title="Physical Image" src={component.physical_image_url} />
        <ImageCard title="Schematic Image" src={component.schematic_image_url} />
        <ImageCard title="Pinout Diagram" src={component.pinout_image_url} />
      </div>
    </div>
  );
};

export default ComponentDetailPage;
