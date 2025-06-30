import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Ship, Edit, Trash2, Eye } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { formatDate } from '../utils/dateUtils';
import { downloadCSV, downloadJSON } from '../utils/exportUtils';
import ShipModal from '../components/Ships/ShipModal';

const Ships: React.FC = () => {
  const { ships, deleteShip, loadShips } = useData();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingShip, setEditingShip] = useState(null);

  const canManageShips = user?.role === 'Admin' || user?.role === 'Inspector';

  // Bulk selection state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isAllSelected = ships.length > 0 && selectedIds.length === ships.length;

  const toggleSelectAll = () => {
    setSelectedIds(isAllSelected ? [] : ships.map(s => s.id));
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedIds.length} ships? This is irreversible.`)) {
      selectedIds.forEach(id => deleteShip(id));
      setSelectedIds([]);
    }
  };

  const handleExportJSON = () => downloadJSON(ships, 'ships.json');
  const handleExportCSV = () => downloadCSV(ships, ['id','name','imo','flag','status'], 'ships.csv');

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string);
          if (Array.isArray(data)) {
            loadShips(data);
            alert('Ships imported successfully');
          } else {
            alert('Invalid JSON format');
          }
        } catch {
          alert('Error parsing JSON');
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    }
  };

  const filteredShips = ships.filter(ship => {
    const matchesSearch = ship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ship.imo.includes(searchTerm) ||
                         ship.flag.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || ship.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    'Active': 'bg-green-100 text-green-800',
    'Under Maintenance': 'bg-orange-100 text-orange-800',
    'Docked': 'bg-blue-100 text-blue-800',
    'Inactive': 'bg-gray-100 text-gray-800'
  };

  const handleEdit = (ship: any) => {
    setEditingShip(ship);
    setShowModal(true);
  };

  const handleDelete = (shipId: string) => {
    if (window.confirm('Are you sure you want to delete this ship? This will also delete all associated components and jobs.')) {
      deleteShip(shipId);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingShip(null);
  };

  return (
    <div className="space-y-6">
      {/* Bulk actions and import/export */}
      <div className="flex flex-wrap items-center space-x-2 mb-4">
        <button
          onClick={toggleSelectAll}
          className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-action text-sm rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {isAllSelected ? 'Deselect All' : 'Select All'}
        </button>
        <button
          onClick={handleBulkDelete}
          disabled={selectedIds.length === 0}
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-action text-sm rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
        >Delete Selected</button>
        <button
          onClick={handleExportJSON}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-action text-sm rounded-md hover:bg-blue-700 transition-colors"
        >Export JSON</button>
        <button
          onClick={handleExportCSV}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-action text-sm rounded-md hover:bg-blue-700 transition-colors"
        >Export CSV</button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-action text-sm rounded-md hover:bg-green-700 transition-colors"
        >Import JSON</button>
        <input
          type="file"
          accept="application/json"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImportJSON}
        />
      </div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
                      <h1 className="font-header text-display-xl text-gray-900 dark:text-white">Ships Management</h1>
          <p className="font-body text-gray-600 dark:text-gray-300 mt-1">Manage your fleet of ships and their information</p>
        </div>
        {canManageShips && (
          <button
            id="tour-add-ship"
            onClick={() => setShowModal(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white font-action text-sm rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} className="mr-2" />
            Add Ship
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="form-filter-container">
        <div className="form-row">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search ships by name, IMO, or flag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-search"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-select"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Under Maintenance">Under Maintenance</option>
              <option value="Docked">Docked</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ships Grid - Modern Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredShips.map((ship) => (
          <div key={ship.id} className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:shadow-blue-100/20 dark:hover:shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/30 dark:to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Checkbox with improved styling */}
            <div className="absolute top-4 left-4 z-20">
              <input
                type="checkbox"
                checked={selectedIds.includes(ship.id)}
                onChange={() => toggleSelectOne(ship.id)}
                className="h-5 w-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2 shadow-sm"
              />
            </div>
            
            <div className="relative z-10 p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="h-14 w-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Ship size={24} className="text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-display-name text-display-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{ship.name}</h3>
                    <p className="font-technical text-sm text-gray-500 dark:text-gray-400">IMO: {ship.imo}</p>
                  </div>
                </div>
                <span className={`px-3 py-1.5 font-label text-xs rounded-lg shadow-sm ${
                  ship.status === 'Active' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' :
                  ship.status === 'Under Maintenance' ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white' :
                  ship.status === 'Docked' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' :
                  'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
                }`}>
                  {ship.status}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 bg-gray-50/70 dark:bg-gray-700/50 rounded-lg">
                  <span className="font-body text-sm text-gray-600 dark:text-gray-300">Flag:</span>
                  <span className="font-display-name text-sm text-gray-900 dark:text-white">{ship.flag}</span>
                </div>
                {ship.type && (
                  <div className="flex items-center justify-between p-3 bg-gray-50/70 dark:bg-gray-700/50 rounded-lg">
                    <span className="font-body text-sm text-gray-600 dark:text-gray-300">Type:</span>
                    <span className="font-display-name text-sm text-gray-900 dark:text-white">{ship.type}</span>
                  </div>
                )}
                {ship.yearBuilt && (
                  <div className="flex items-center justify-between p-3 bg-gray-50/70 dark:bg-gray-700/50 rounded-lg">
                    <span className="font-body text-sm text-gray-600 dark:text-gray-300">Year Built:</span>
                    <span className="font-numeric text-numeric-md text-gray-900 dark:text-white">{ship.yearBuilt}</span>
                  </div>
                )}
                {ship.lastInspection && (
                  <div className="flex items-center justify-between p-3 bg-gray-50/70 dark:bg-gray-700/50 rounded-lg">
                    <span className="font-body text-sm text-gray-600 dark:text-gray-300">Last Inspection:</span>
                    <span className="font-temporal text-sm text-gray-900 dark:text-white">{formatDate(ship.lastInspection)}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100/50 dark:border-gray-600/50">
                <Link
                  to={`/ships/${ship.id}`}
                  className="inline-flex items-center font-action text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 group-hover:translate-x-1"
                >
                  <Eye size={16} className="mr-2" />
                  View Details
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                
                {canManageShips && (
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleEdit(ship)}
                      className="p-2.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(ship.id)}
                      className="p-2.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredShips.length === 0 && (
        <div className="text-center py-12">
          <Ship size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="font-header text-display-md text-gray-900 mb-2">No ships found</h3>
                          <p className="font-body text-gray-500 dark:text-gray-400 mb-4">
            {searchTerm || statusFilter !== 'All' 
              ? 'Try adjusting your search criteria'
              : 'Get started by adding your first ship'}
          </p>
          {canManageShips && !searchTerm && statusFilter === 'All' && (
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-action text-sm rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} className="mr-2" />
              Add Ship
            </button>
          )}
        </div>
      )}

      {/* Ship Modal */}
      {showModal && (
        <ShipModal
          ship={editingShip}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Ships;