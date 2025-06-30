import React, { useState } from 'react';
import { Plus, Search, Filter, Clock, Settings, AlertTriangle, CheckCircle } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { formatDate } from '../utils/dateUtils';
import JobModal from '../components/Jobs/JobModal';
import JobCard from '../components/Jobs/JobCard';

const Jobs: React.FC = () => {
  const { jobs, ships, components, users } = useData();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [shipFilter, setShipFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);

  const canCreateJobs = user?.role === 'Admin' || user?.role === 'Inspector' || user?.role === 'Engineer';

  const filteredJobs = jobs.filter(job => {
    const ship = ships.find(s => s.id === job.shipId);
    const component = components.find(c => c.id === job.componentId);
    const engineer = users.find(u => u.id === job.assignedEngineerId);

    const matchesSearch = 
      job.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ship?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      engineer?.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || job.priority === priorityFilter;
    const matchesShip = shipFilter === 'All' || job.shipId === shipFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesShip;
  });

  const jobStats = {
    total: jobs.length,
    open: jobs.filter(j => j.status === 'Open').length,
    inProgress: jobs.filter(j => j.status === 'In Progress').length,
    completed: jobs.filter(j => j.status === 'Completed').length,
    critical: jobs.filter(j => j.priority === 'Critical').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-header text-display-xl text-gray-900">Maintenance Jobs</h1>
          <p className="font-body text-gray-600 mt-1">Manage and track maintenance work orders</p>
        </div>
        {canCreateJobs && (
          <button
            id="tour-create-job"
            onClick={() => setShowModal(true)}
            className="mt-4 sm:mt-0 btn-primary"
          >
            <Plus size={16} className="mr-2" />
            Create Job
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-nav text-sm text-gray-600 dark:text-gray-400">Total Jobs</p>
              <p className="font-numeric text-numeric-2xl text-gray-900 dark:text-gray-100">{jobStats.total}</p>
            </div>
            <div className="h-12 w-12 bg-gray-600 rounded-lg flex items-center justify-center">
              <Settings size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-nav text-sm text-gray-600 dark:text-gray-400">Open</p>
              <p className="font-numeric text-numeric-2xl text-yellow-600">{jobStats.open}</p>
            </div>
            <div className="h-12 w-12 bg-yellow-600 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-nav text-sm text-gray-600 dark:text-gray-400">In Progress</p>
              <p className="font-numeric text-numeric-2xl text-blue-600">{jobStats.inProgress}</p>
            </div>
            <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Settings size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-nav text-sm text-gray-600 dark:text-gray-400">Completed</p>
              <p className="font-numeric text-numeric-2xl text-green-600">{jobStats.completed}</p>
            </div>
            <div className="h-12 w-12 bg-green-600 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-nav text-sm text-gray-600 dark:text-gray-400">Critical</p>
              <p className="font-numeric text-numeric-2xl text-red-600">{jobStats.critical}</p>
            </div>
            <div className="h-12 w-12 bg-red-600 rounded-lg flex items-center justify-center">
              <AlertTriangle size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="form-filter-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs, ships, components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-search"
              />
            </div>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-select"
            >
              <option value="All">All Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="form-select"
            >
              <option value="All">All Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div>
            <select
              value={shipFilter}
              onChange={(e) => setShipFilter(e.target.value)}
              className="form-select"
            >
              <option value="All">All Ships</option>
              {ships.map(ship => (
                <option key={ship.id} value={ship.id}>{ship.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredJobs
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <Settings size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="font-header text-display-md text-gray-900 mb-2">No jobs found</h3>
          <p className="font-body text-gray-500 mb-4">
            {searchTerm || statusFilter !== 'All' || priorityFilter !== 'All' || shipFilter !== 'All'
              ? 'Try adjusting your search criteria'
              : 'Get started by creating your first maintenance job'}
          </p>
          {canCreateJobs && !searchTerm && statusFilter === 'All' && priorityFilter === 'All' && shipFilter === 'All' && (
            <button
              onClick={() => setShowModal(true)}
              className="btn-primary"
            >
              <Plus size={16} className="mr-2" />
              Create Job
            </button>
          )}
        </div>
      )}

      {/* Job Modal */}
      {showModal && (
        <JobModal
          job={null}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Jobs;