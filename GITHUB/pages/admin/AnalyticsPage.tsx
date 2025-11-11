import React from 'react';
import Card from '../../components/ui/Card';

const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📈 Analytics</h1>
      <Card>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Analytics Overview</h2>
        <p className="text-gray-600 dark:text-gray-300">
          This is the analytics page. Detailed charts and statistics about component usage, quiz performance, and user activity will be displayed here.
        </p>
        <div className="mt-6 p-8 border border-dashed rounded-lg text-center text-gray-500">
            Chart Area Placeholder
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
