import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Ship, 
  Settings, 
  Calendar, 
  Plus, 
  Edit, 
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { formatDate, isDateOverdue, getDaysUntil } from '../utils/dateUtils';
import ComponentModal from '../components/Ships/ComponentModal';
import JobModal from '../components/Jobs/JobModal';

const ShipDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { ships, components, jobs, deleteComponent } = useData();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingComponent, setEditingComponent] = useState(null);
  const [selectedComponentId, setSelectedComponentId] = useState('');

  const ship = ships.find(s => s.id === id);
  const shipComponents = components.filter(c => c.shipId === id);
  const shipJobs = jobs.filter(j => j.shipId === id);

  const canManage = user?.role === 'Admin' || user?.role === 'Inspector';
  const canCreateJobs = user?.role === 'Admin' || user?.role === 'Inspector' || user?.role === 'Engineer';

  if (!ship) {
    return <Navigate to="/ships" replace />;
  }

  const statusColors = {
    'Active': 'bg-green-100 text-green-800',
    'Under Maintenance': 'bg-orange-100 text-orange-800',
    'Docked': 'bg-blue-100 text-blue-800',
    'Inactive': 'bg-gray-100 text-gray-800'
  };

  const componentStatusColors = {
    'Good': 'bg-green-100 text-green-800',
    'Warning': 'bg-orange-100 text-orange-800',
    'Critical': 'bg-red-100 text-red-800'
  };

  const jobStatusColors = {
    'Open': 'bg-gray-100 text-gray-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-green-100 text-green-800',
    'Cancelled': 'bg-red-100 text-red-800'
  };

  const priorityColors = {
    'Low': 'bg-green-100 text-green-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'High': 'bg-orange-100 text-orange-800',
    'Critical': 'bg-red-100 text-red-800'
  };

  const handleEditComponent = (component: any) => {
    setEditingComponent(component);
    setShowComponentModal(true);
  };

  const handleDeleteComponent = (componentId: string) => {
    if (window.confirm('Are you sure you want to delete this component? This will also delete all associated jobs.')) {
      deleteComponent(componentId);
    }
  };

  const handleCreateJob = (componentId?: string) => {
    if (componentId) {
      setSelectedComponentId(componentId);
    }
    setShowJobModal(true);
  };

  const handleCloseComponentModal = () => {
    setShowComponentModal(false);
    setEditingComponent(null);
  };

  const handleCloseJobModal = () => {
    setShowJobModal(false);
    setSelectedComponentId('');
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Ship },
    { id: 'components', name: 'Components', icon: Settings },
    { id: 'maintenance', name: 'Maintenance History', icon: Calendar }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/ships"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} className="mr-1" />
            Back to Ships
          </Link>
        </div>
      </div>

      {/* Ship Info Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-sm text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
              <Ship size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{ship.name}</h1>
              <p className="text-blue-100 mt-1">IMO: {ship.imo} | Flag: {ship.flag}</p>
            </div>
          </div>
          <span className={`px-3 py-2 text-sm font-medium rounded-full ${statusColors[ship.status]} text-gray-800`}>
            {ship.status}
          </span>
        </div>
      </div>

      {/* Ship Details Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
                              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Components</p>
              <p className="text-2xl font-bold text-gray-900">{shipComponents.length}</p>
            </div>
            <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Settings size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
                              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Active Jobs</p>
              <p className="text-2xl font-bold text-gray-900">
                {shipJobs.filter(j => j.status === 'Open' || j.status === 'In Progress').length}
              </p>
            </div>
            <div className="h-12 w-12 bg-orange-600 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
                              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Critical Components</p>
              <p className="text-2xl font-bold text-red-600">
                {shipComponents.filter(c => c.status === 'Critical').length}
              </p>
            </div>
            <div className="h-12 w-12 bg-red-600 rounded-lg flex items-center justify-center">
              <AlertTriangle size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
                              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Completed Jobs</p>
              <p className="text-2xl font-bold text-green-600">
                {shipJobs.filter(j => j.status === 'Completed').length}
              </p>
            </div>
            <div className="h-12 w-12 bg-green-600 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <Icon size={16} className="mr-2" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ship Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Name:</span>
                <span className="text-gray-900 font-medium">{ship.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">IMO Number:</span>
                <span className="text-gray-900 font-medium">{ship.imo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Flag State:</span>
                <span className="text-gray-900 font-medium">{ship.flag}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[ship.status]}`}>
                  {ship.status}
                </span>
              </div>
              {ship.type && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Type:</span>
                  <span className="text-gray-900 font-medium">{ship.type}</span>
                </div>
              )}
              {ship.yearBuilt && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Year Built:</span>
                  <span className="text-gray-900 font-medium">{ship.yearBuilt}</span>
                </div>
              )}
              {ship.lastInspection && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Inspection:</span>
                  <span className="text-gray-900 font-medium">{formatDate(ship.lastInspection)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {shipJobs
                .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                .slice(0, 5)
                .map((job) => {
                  const component = shipComponents.find(c => c.id === job.componentId);
                  return (
                    <div key={job.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {job.type} - {component?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Updated {formatDate(job.updatedAt)}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${jobStatusColors[job.status]}`}>
                        {job.status}
                      </span>
                    </div>
                  );
                })}
              {shipJobs.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No recent activity</p>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'components' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Ship Components</h3>
              {canManage && (
                <button
                  onClick={() => setShowComponentModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus size={16} className="mr-2" />
                  Add Component
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            {shipComponents.length === 0 ? (
              <div className="text-center py-8">
                <Settings size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No components found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">Add components to track their maintenance</p>
                {canManage && (
                  <button
                    onClick={() => setShowComponentModal(true)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Component
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shipComponents.map((component) => {
                  const componentJobs = shipJobs.filter(j => j.componentId === component.id);
                  const activeJobs = componentJobs.filter(j => j.status === 'Open' || j.status === 'In Progress');
                  const isOverdue = component.nextMaintenanceDate && isDateOverdue(component.nextMaintenanceDate);
                  const daysUntil = component.nextMaintenanceDate ? getDaysUntil(component.nextMaintenanceDate) : null;

                  return (
                    <div key={component.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{component.name}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${componentStatusColors[component.status]}`}>
                          {component.status}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                        <div className="flex justify-between">
                          <span>Serial:</span>
                          <span>{component.serialNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Installed:</span>
                          <span>{formatDate(component.installDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Last Maintenance:</span>
                          <span>{formatDate(component.lastMaintenanceDate)}</span>
                        </div>
                        {component.nextMaintenanceDate && (
                          <div className="flex justify-between">
                            <span>Next Maintenance:</span>
                            <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                              {formatDate(component.nextMaintenanceDate)}
                              {daysUntil !== null && (
                                <span className="ml-1 text-xs">
                                  ({isOverdue ? `${Math.abs(daysUntil)} days overdue` : `${daysUntil} days`})
                                </span>
                              )}
                            </span>
                          </div>
                        )}
                      </div>

                      {activeJobs.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs text-gray-500 mb-2">Active Jobs:</p>
                          <div className="space-y-1">
                            {activeJobs.slice(0, 2).map((job) => (
                              <div key={job.id} className="text-xs bg-gray-50 rounded p-2">
                                <div className="flex justify-between">
                                  <span>{job.type}</span>
                                  <span className={`px-1 py-0.5 rounded ${priorityColors[job.priority]}`}>
                                    {job.priority}
                                  </span>
                                </div>
                              </div>
                            ))}
                            {activeJobs.length > 2 && (
                              <p className="text-xs text-gray-500">+{activeJobs.length - 2} more</p>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        {canCreateJobs && (
                          <button
                            onClick={() => handleCreateJob(component.id)}
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Create Job
                          </button>
                        )}
                        
                        {canManage && (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditComponent(component)}
                              className="p-1 text-gray-400 hover:text-blue-600 rounded"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteComponent(component.id)}
                              className="p-1 text-gray-400 hover:text-red-600 rounded"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'maintenance' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Maintenance History</h3>
          </div>

          <div className="p-6">
            {shipJobs.length === 0 ? (
              <div className="text-center py-8">
                <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No maintenance history</h3>
                <p className="text-gray-500 dark:text-gray-400">Maintenance jobs will appear here once created</p>
              </div>
            ) : (
              <div className="space-y-4">
                {shipJobs
                  .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                  .map((job) => {
                    const component = shipComponents.find(c => c.id === job.componentId);
                    const engineer = user; // In a real app, you'd look up the engineer by job.assignedEngineerId

                    return (
                      <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900">{job.type}</h4>
                            <p className="text-sm text-gray-600">{component?.name}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[job.priority]}`}>
                              {job.priority}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${jobStatusColors[job.status]}`}>
                              {job.status}
                            </span>
                          </div>
                        </div>

                        {job.description && (
                          <p className="text-sm text-gray-600 mb-3">{job.description}</p>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Scheduled:</span>
                            <p className="font-medium">{formatDate(job.scheduledDate)}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Created:</span>
                            <p className="font-medium">{formatDate(job.createdAt)}</p>
                          </div>
                          {job.estimatedHours && (
                            <div>
                              <span className="text-gray-500">Est. Hours:</span>
                              <p className="font-medium">{job.estimatedHours}h</p>
                            </div>
                          )}
                          {job.actualHours && (
                            <div>
                              <span className="text-gray-500">Actual Hours:</span>
                              <p className="font-medium">{job.actualHours}h</p>
                            </div>
                          )}
                        </div>

                        {job.completedDate && (
                          <div className="mt-3 text-sm">
                            <span className="text-gray-500">Completed:</span>
                            <span className="font-medium ml-2">{formatDate(job.completedDate)}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      {showComponentModal && (
        <ComponentModal
          component={editingComponent}
          shipId={ship.id}
          onClose={handleCloseComponentModal}
        />
      )}

      {showJobModal && (
        <JobModal
          job={null}
          shipId={ship.id}
          componentId={selectedComponentId}
          onClose={handleCloseJobModal}
        />
      )}
    </div>
  );
};

export default ShipDetail;