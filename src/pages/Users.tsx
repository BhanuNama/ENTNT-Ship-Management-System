import React from 'react';
import { Users as UsersIcon, User, Shield, Settings } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

const Users: React.FC = () => {
  const { users, jobs } = useData();
  const { user: currentUser } = useAuth();

  // Only admins can access this page
  if (currentUser?.role !== 'Admin') {
    return (
      <div className="text-center py-12">
        <Shield size={48} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
        <p className="text-gray-500">You don't have permission to view this page.</p>
      </div>
    );
  }

  const roleColors = {
    'Admin': 'bg-purple-100 text-purple-800',
    'Inspector': 'bg-blue-100 text-blue-800',
    'Engineer': 'bg-green-100 text-green-800'
  };

  const roleIcons = {
    'Admin': Shield,
    'Inspector': User,
    'Engineer': Settings
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-1">Manage system users and their roles</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <div className="h-12 w-12 bg-gray-600 rounded-lg flex items-center justify-center">
              <UsersIcon size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Engineers</p>
              <p className="text-2xl font-bold text-green-600">
                {users.filter(u => u.role === 'Engineer').length}
              </p>
            </div>
            <div className="h-12 w-12 bg-green-600 rounded-lg flex items-center justify-center">
              <Settings size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inspectors</p>
              <p className="text-2xl font-bold text-blue-600">
                {users.filter(u => u.role === 'Inspector').length}
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <User size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">System Users</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => {
              const userJobs = jobs.filter(j => j.assignedEngineerId === user.id);
              const activeJobs = userJobs.filter(j => j.status === 'Open' || j.status === 'In Progress');
              const completedJobs = userJobs.filter(j => j.status === 'Completed');
              const RoleIcon = roleIcons[user.role];

              return (
                <div key={user.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                        <RoleIcon size={20} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{user.name}</h4>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${roleColors[user.role]}`}>
                      {user.role}
                    </span>
                  </div>

                  {user.role === 'Engineer' && (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total Jobs:</span>
                        <span className="font-medium">{userJobs.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Active Jobs:</span>
                        <span className="font-medium text-blue-600">{activeJobs.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Completed:</span>
                        <span className="font-medium text-green-600">{completedJobs.length}</span>
                      </div>
                      {userJobs.length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Completion Rate:</span>
                          <span className="font-medium">
                            {Math.round((completedJobs.length / userJobs.length) * 100)}%
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">User ID: {user.id}</span>
                      <span className={`w-2 h-2 rounded-full ${
                        user.id === currentUser?.id ? 'bg-green-500' : 'bg-gray-300'
                      }`} title={user.id === currentUser?.id ? 'Current user' : 'Other user'}></span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Role Descriptions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Permissions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Shield size={20} className="text-purple-600 mr-2" />
              <h4 className="font-medium text-gray-900">Admin</h4>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Full system access</li>
              <li>• Manage ships and components</li>
              <li>• Create and assign jobs</li>
              <li>• View all reports</li>
              <li>• Manage users</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <User size={20} className="text-blue-600 mr-2" />
              <h4 className="font-medium text-gray-900">Inspector</h4>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• View and manage ships</li>
              <li>• Manage components</li>
              <li>• Create maintenance jobs</li>
              <li>• View reports</li>
              <li>• Monitor compliance</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Settings size={20} className="text-green-600 mr-2" />
              <h4 className="font-medium text-gray-900">Engineer</h4>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• View ships and components</li>
              <li>• Create maintenance jobs</li>
              <li>• Update job status</li>
              <li>• Record maintenance work</li>
              <li>• View assigned tasks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;