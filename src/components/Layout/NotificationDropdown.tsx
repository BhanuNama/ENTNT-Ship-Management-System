import React from 'react';
import { X, Clock, CheckCircle, AlertTriangle, Plus, Ship, Edit, Trash2, Settings } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { formatDistanceToNow } from '../../utils/dateUtils';

interface NotificationDropdownProps {
  onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
  const { notifications, markNotificationRead, dismissNotification } = useData();

  const getIcon = (type: string) => {
    const iconWrapperClass = (bgColor: string) => `w-6 h-6 ${bgColor} rounded flex items-center justify-center`;
    
    switch (type) {
      case 'ship_created':
        return (
          <div className={iconWrapperClass('bg-blue-500')}>
            <Ship size={12} className="text-white" />
          </div>
        );
      case 'ship_updated':
        return (
          <div className={iconWrapperClass('bg-yellow-500')}>
            <Edit size={12} className="text-white" />
          </div>
        );
      case 'ship_deleted':
        return (
          <div className={iconWrapperClass('bg-red-500')}>
            <Trash2 size={12} className="text-white" />
          </div>
        );
      case 'component_created':
        return (
          <div className={iconWrapperClass('bg-blue-500')}>
            <Settings size={12} className="text-white" />
          </div>
        );
      case 'component_updated':
        return (
          <div className={iconWrapperClass('bg-yellow-500')}>
            <Settings size={12} className="text-white" />
          </div>
        );
      case 'component_deleted':
        return (
          <div className={iconWrapperClass('bg-red-500')}>
            <Trash2 size={12} className="text-white" />
          </div>
        );
      case 'job_created':
        return (
          <div className={iconWrapperClass('bg-blue-500')}>
            <Plus size={12} className="text-white" />
          </div>
        );
      case 'job_completed':
        return (
          <div className={iconWrapperClass('bg-green-500')}>
            <CheckCircle size={12} className="text-white" />
          </div>
        );
      case 'maintenance_due':
        return (
          <div className={iconWrapperClass('bg-orange-500')}>
            <AlertTriangle size={12} className="text-white" />
          </div>
        );
      default:
        return (
          <div className={iconWrapperClass('bg-gray-500')}>
            <Clock size={12} className="text-white" />
          </div>
        );
    }
  };

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markNotificationRead(notification.id);
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded"
        >
          <X size={16} />
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            <Clock size={24} className="mx-auto mb-2 text-gray-300 dark:text-gray-600" />
            <p>No notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors relative ${
                  !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${
                        !notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {notification.title}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dismissNotification(notification.id);
                        }}
                        className="ml-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded"
                      >
                        <X size={12} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      {formatDistanceToNow(notification.timestamp)} ago
                    </p>
                  </div>
                </div>
                {!notification.read && (
                  <div className="absolute right-2 top-2 w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {notifications.length > 0 && (
        <div className="p-3 border-t border-gray-100 dark:border-gray-700">
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;