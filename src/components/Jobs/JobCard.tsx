import React, { useState } from 'react';
import { Edit, Trash2, User, Calendar, Clock, Ship, Settings } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatDate } from '../../utils/dateUtils';
import JobModal from './JobModal';

interface JobCardProps {
  job: any;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { ships, components, users, updateJob, deleteJob } = useData();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const ship = ships.find(s => s.id === job.shipId);
  const component = components.find(c => c.id === job.componentId);
  const engineer = users.find(u => u.id === job.assignedEngineerId);

  const canEdit = user?.role === 'Admin' || user?.role === 'Inspector' || 
                  (user?.role === 'Engineer' && job.assignedEngineerId === user.id);

  const statusColors = {
    'Open': 'bg-gradient-to-r from-gray-500 to-gray-600 text-white',
    'In Progress': 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
    'Completed': 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white',
    'Cancelled': 'bg-gradient-to-r from-red-500 to-red-600 text-white'
  };

  const priorityColors = {
    'Low': 'bg-gradient-to-r from-green-500 to-green-600 text-white',
    'Medium': 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white',
    'High': 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
    'Critical': 'bg-gradient-to-r from-red-500 to-red-600 text-white'
  };

  const handleStatusChange = (newStatus: string) => {
    const updates: any = { status: newStatus };
    
    if (newStatus === 'Completed' && !job.completedDate) {
      updates.completedDate = new Date().toISOString();
    }
    
    updateJob(job.id, updates);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      deleteJob(job.id);
    }
  };

  return (
    <>
      <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl hover:shadow-gray-200/20 dark:hover:shadow-gray-900/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/30 dark:to-gray-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <h3 className="font-display-name text-display-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{job.type}</h3>
                <span className={`px-3 py-1.5 font-label text-xs rounded-lg shadow-sm ${priorityColors[job.priority as keyof typeof priorityColors]}`}>
                  {job.priority}
                </span>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center font-body text-sm text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  <Ship size={14} className="mr-2" />
                  <span className="font-display-name">{ship?.name}</span>
                </div>
                <div className="flex items-center font-body text-sm text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
                  <Settings size={14} className="mr-2" />
                  <span className="font-display-name">{component?.name}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end space-y-3">
              <span className={`px-3 py-1.5 font-label text-xs rounded-lg shadow-sm ${statusColors[job.status as keyof typeof statusColors]}`}>
                {job.status}
              </span>
              {canEdit && (
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setShowModal(true)}
                    className="p-2.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="p-2.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {job.description && (
            <div className="mb-4">
              <p className="font-body text-sm text-gray-600 dark:text-gray-300 bg-gray-50/70 dark:bg-gray-700/50 rounded-lg p-3">{job.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center p-3 bg-gray-50/70 dark:bg-gray-700/50 rounded-lg">
              <User size={14} className="mr-2 text-indigo-600" />
              <span className="font-display-name text-sm text-gray-900 dark:text-white">{engineer?.name || 'Unassigned'}</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50/70 dark:bg-gray-700/50 rounded-lg">
              <Calendar size={14} className="mr-2 text-emerald-600" />
              <span className="font-temporal text-sm text-gray-900 dark:text-white">{formatDate(job.scheduledDate)}</span>
            </div>
            {job.estimatedHours && (
              <div className="flex items-center p-3 bg-gray-50/70 dark:bg-gray-700/50 rounded-lg">
                <Clock size={14} className="mr-2 text-orange-600" />
                <span className="font-numeric text-sm text-gray-900 dark:text-white">{job.estimatedHours}h estimated</span>
              </div>
            )}
            {job.actualHours && (
              <div className="flex items-center p-3 bg-gray-50/70 dark:bg-gray-700/50 rounded-lg">
                <Clock size={14} className="mr-2 text-blue-600" />
                <span className="font-numeric text-sm text-gray-900 dark:text-white">{job.actualHours}h actual</span>
              </div>
            )}
          </div>

          {canEdit && job.status !== 'Completed' && job.status !== 'Cancelled' && (
            <div className="flex items-center space-x-3 pt-4 border-t border-gray-100/50 dark:border-gray-600/50">
              <span className="font-body text-sm text-gray-600 dark:text-gray-300">Quick actions:</span>
              {job.status === 'Open' && (
                <button
                  onClick={() => handleStatusChange('In Progress')}
                  className="px-4 py-2 font-action text-xs bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm"
                >
                  Start Work
                </button>
              )}
              {job.status === 'In Progress' && (
                <button
                  onClick={() => handleStatusChange('Completed')}
                  className="px-4 py-2 font-action text-xs bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-sm"
                >
                  Mark Complete
                </button>
              )}
            </div>
          )}

          {job.completedDate && (
            <div className="mt-4 pt-4 border-t border-gray-100/50 dark:border-gray-600/50">
              <div className="flex items-center p-3 bg-emerald-50/70 dark:bg-emerald-900/20 rounded-lg">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                <p className="font-temporal text-sm text-emerald-800 dark:text-emerald-300">
                  Completed on {formatDate(job.completedDate)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <JobModal
          job={job}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default JobCard;