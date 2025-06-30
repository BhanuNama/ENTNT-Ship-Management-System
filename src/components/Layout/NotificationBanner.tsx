import React from 'react';
import { X, Clock, CheckCircle, AlertTriangle, Plus, Ship, Edit, Trash2, Settings } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const getBannerIcon = (type: string) => {
  const iconWrapperClass = (bgColor: string) => `w-8 h-8 ${bgColor} rounded-lg flex items-center justify-center`;
  
  switch (type) {
    case 'ship_created': return (
      <div className={iconWrapperClass('bg-blue-600')}>
        <Ship size={16} className="text-white" />
      </div>
    );
    case 'ship_updated': return (
      <div className={iconWrapperClass('bg-yellow-600')}>
        <Edit size={16} className="text-white" />
      </div>
    );
    case 'ship_deleted': return (
      <div className={iconWrapperClass('bg-red-600')}>
        <Trash2 size={16} className="text-white" />
      </div>
    );
    case 'component_created': return (
      <div className={iconWrapperClass('bg-blue-600')}>
        <Settings size={16} className="text-white" />
      </div>
    );
    case 'component_updated': return (
      <div className={iconWrapperClass('bg-yellow-600')}>
        <Settings size={16} className="text-white" />
      </div>
    );
    case 'component_deleted': return (
      <div className={iconWrapperClass('bg-red-600')}>
        <Trash2 size={16} className="text-white" />
      </div>
    );
    case 'job_created': return (
      <div className={iconWrapperClass('bg-blue-600')}>
        <Plus size={16} className="text-white" />
      </div>
    );
    case 'job_updated': return (
      <div className={iconWrapperClass('bg-yellow-600')}>
        <AlertTriangle size={16} className="text-white" />
      </div>
    );
    case 'job_completed': return (
      <div className={iconWrapperClass('bg-green-600')}>
        <CheckCircle size={16} className="text-white" />
      </div>
    );
    case 'maintenance_due': return (
      <div className={iconWrapperClass('bg-orange-600')}>
        <Clock size={16} className="text-white" />
      </div>
    );
    default: return (
      <div className={iconWrapperClass('bg-gray-600')}>
        <Clock size={16} className="text-white" />
      </div>
    );
  }
};

const getBannerStyles = (type: string) => {
  switch (type) {
    case 'ship_deleted':
    case 'component_deleted':
      return 'border-l-4 border-red-500 text-red-800';
    case 'job_completed':
      return 'border-l-4 border-green-500 text-green-800';
    case 'job_created':
    case 'ship_created':
    case 'component_created':
      return 'border-l-4 border-blue-500 text-blue-800';
    case 'maintenance_due':
    case 'job_updated':
    case 'ship_updated':
    case 'component_updated':
      return 'border-l-4 border-yellow-500 text-yellow-800';
    default:
      return 'border-l-4 border-gray-500 text-gray-800';
  }
};

const NotificationBanner: React.FC = () => {
  const { notifications, dismissNotification } = useData();
  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 pointer-events-none">
      {notifications.map((n) => {
        const icon = getBannerIcon(n.type);
        const styles = getBannerStyles(n.type);
        return (
          <div
            key={n.id}
            className={`pointer-events-auto flex items-start justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 max-w-sm animate-slide-in-right ${styles}`}
          >
            <div className="flex items-center space-x-2 flex-1">
              {icon}
              <div className="ml-2">
                <p className="font-medium text-sm line-clamp-1">{n.title}</p>
                <p className="text-sm text-gray-600 line-clamp-2 dark:text-gray-400">{n.message}</p>
              </div>
            </div>
            <button
              onClick={() => dismissNotification(n.id)}
              className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationBanner; 