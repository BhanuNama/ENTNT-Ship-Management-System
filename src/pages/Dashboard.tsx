import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Ship, 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Calendar,
  Users,
  Wrench,
  BarChart3
} from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { formatDate, isDateOverdue, getDaysUntil } from '../utils/dateUtils';

const Dashboard: React.FC = () => {
  const { ships, components, jobs, notifications } = useData();
  const { user } = useAuth();

  // Calculate KPIs
  const totalShips = ships.length;
  const activeShips = ships.filter(s => s.status === 'Active').length;
  const shipsUnderMaintenance = ships.filter(s => s.status === 'Under Maintenance').length;
  
  const totalComponents = components.length;
  const criticalComponents = components.filter(c => c.status === 'Critical').length;
  const warningComponents = components.filter(c => c.status === 'Warning').length;
  const overdueComponents = components.filter(c => 
    c.nextMaintenanceDate && isDateOverdue(c.nextMaintenanceDate)
  ).length;
  
  const totalJobs = jobs.length;
  const openJobs = jobs.filter(j => j.status === 'Open').length;
  const inProgressJobs = jobs.filter(j => j.status === 'In Progress').length;
  const completedJobs = jobs.filter(j => j.status === 'Completed').length;
  const criticalJobs = jobs.filter(j => j.priority === 'Critical').length;

  const unreadNotifications = notifications.filter(n => !n.read).length;

  // Recent activity
  const recentJobs = jobs
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const upcomingMaintenance = components
    .filter(c => c.nextMaintenanceDate)
    .sort((a, b) => new Date(a.nextMaintenanceDate!).getTime() - new Date(b.nextMaintenanceDate!).getTime())
    .slice(0, 5);

  const StatCard = ({ title, value, icon: Icon, color, link, percentage }: any) => {
    // Create solid colored background based on color prop
    const colorMap: { [key: string]: string } = {
      'text-blue-600': 'bg-blue-600',
      'text-red-600': 'bg-red-600', 
      'text-orange-600': 'bg-orange-600',
      'text-yellow-600': 'bg-yellow-600',
      'text-green-600': 'bg-green-600'
    };
    
    const iconBg = colorMap[color] || 'bg-gray-600';
    
    return (
      <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl hover:shadow-gray-200/20 dark:hover:shadow-gray-900/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/50 dark:to-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
        
                  <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <p className="text-sm font-nav text-gray-500 dark:text-gray-400 mb-1 tracking-wide">{title}</p>
                <p className="text-numeric-3xl font-numeric text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-200">{value}</p>
              </div>
              <div className={`h-14 w-14 ${iconBg} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}> 
                <Icon size={28} className="text-white" />
              </div>
            </div>
            
            {percentage && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp size={16} className="text-emerald-500 mr-2" />
                  <span className="font-numeric text-numeric-md text-emerald-600 dark:text-emerald-400">{percentage}</span>
                </div>
                <span className="font-temporal text-xs text-gray-400 dark:text-gray-500">vs last month</span>
              </div>
            )}
            
            {link && (
              <Link 
                to={link} 
                className="inline-flex items-center font-action text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mt-4 group-hover:translate-x-1 transition-transform duration-200"
              >
                View details 
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Ships"
          value={totalShips}
          icon={Ship}
          color="text-blue-600"
          percentage="+12%"
          link="/ships"
        />
        <StatCard
          title="Overdue Maintenance"
          value={overdueComponents}
          icon={AlertTriangle}
          color="text-red-600"
          percentage="-8%"
        />
        <StatCard
          title="Jobs in Progress"
          value={inProgressJobs}
          icon={Wrench}
          color="text-yellow-600"
          percentage="+5%"
        />
        <StatCard
          title="Completed Jobs"
          value={completedJobs}
          icon={CheckCircle}
          color="text-green-600"
          percentage="+23%"
        />
      </div>

      {/* Charts Section - Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Priority Distribution - Spans 1 column */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl hover:shadow-purple-100/20 dark:hover:shadow-purple-900/20 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center mb-6">
            <div className="h-12 w-12 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg mr-4 group-hover:scale-110 transition-transform duration-300">
              <BarChart3 size={24} className="text-white" />
            </div>
            <h3 className="font-header text-display-lg text-gray-900 dark:text-white">Priority Distribution</h3>
          </div>
          
          <div className="space-y-3">
            {[
              { label: 'Critical', value: jobs.filter(j => j.priority === 'Critical').length, color: 'bg-red-500', gradientFrom: 'from-red-500', gradientTo: 'to-red-600' },
              { label: 'High', value: jobs.filter(j => j.priority === 'High').length, color: 'bg-orange-500', gradientFrom: 'from-orange-500', gradientTo: 'to-orange-600' },
              { label: 'Medium', value: jobs.filter(j => j.priority === 'Medium').length, color: 'bg-yellow-500', gradientFrom: 'from-yellow-500', gradientTo: 'to-yellow-600' },
              { label: 'Low', value: jobs.filter(j => j.priority === 'Low').length, color: 'bg-green-500', gradientFrom: 'from-green-500', gradientTo: 'to-green-600' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100/70 dark:hover:bg-gray-600/70 transition-all duration-200 border border-gray-100/50 dark:border-gray-600/50"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${item.gradientFrom} ${item.gradientTo} shadow-sm`}></div>
                  <span className="font-label text-gray-900 dark:text-gray-100">{item.label}</span>
                </div>
                <div className={`h-8 w-8 bg-gradient-to-br ${item.gradientFrom} ${item.gradientTo} rounded-lg flex items-center justify-center text-white font-numeric text-numeric-md shadow-sm`}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities - Spans 2 columns */}
        <div className="lg:col-span-2 group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl hover:shadow-blue-100/20 dark:hover:shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                <Clock size={24} className="text-white" />
              </div>
              <h3 className="font-header text-display-lg text-gray-900 dark:text-white">Recent Activities</h3>
            </div>
            <Link 
              to="/jobs" 
              className="inline-flex items-center font-action text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
            >
              View all
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentJobs.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">No recent activities</p>
              </div>
            ) : (
              recentJobs.map((job) => {
                const ship = ships.find(s => s.id === job.shipId);
                const component = components.find(c => c.id === job.componentId);
                
                const priorityColors = {
                  Low: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
                  Medium: 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white',
                  High: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
                  Critical: 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                };

                const statusColors = {
                  Open: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white',
                  'In Progress': 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
                  Completed: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white',
                  Cancelled: 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                };

                return (
                  <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100/70 dark:hover:bg-gray-600/70 transition-all duration-200 border border-gray-100/50 dark:border-gray-600/50">
                    <div className="flex-1">
                      <p className="font-display-name text-display-sm text-gray-900 dark:text-white mb-1">
                        {job.type} - {ship?.name}
                      </p>
                      <p className="font-body text-xs text-gray-600 dark:text-gray-300 mb-2">{component?.name}</p>
                      <p className="font-temporal text-xs text-gray-400 dark:text-gray-500">
                        Updated {formatDate(job.updatedAt)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1.5 font-label text-xs rounded-lg shadow-sm ${priorityColors[job.priority]}`}>
                        {job.priority}
                      </span>
                      <span className={`px-3 py-1.5 font-label text-xs rounded-lg shadow-sm ${statusColors[job.status]}`}>
                        {job.status}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Maintenance - Full Width Bento Card */}
      <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl hover:shadow-indigo-100/20 dark:hover:shadow-indigo-900/20 hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg mr-4 group-hover:scale-110 transition-transform duration-300">
              <Calendar size={24} className="text-white" />
            </div>
            <h3 className="font-header text-display-lg text-gray-900 dark:text-white">Upcoming Maintenance</h3>
          </div>
          <Link 
            to="/calendar" 
            className="inline-flex items-center font-action text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 px-4 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200"
          >
            View calendar
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {upcomingMaintenance.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={32} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <p className="font-body text-gray-500 dark:text-gray-400">No upcoming maintenance scheduled</p>
            </div>
          ) : (
            upcomingMaintenance.map((component) => {
              const ship = ships.find(s => s.id === component.shipId);
              const daysUntil = getDaysUntil(component.nextMaintenanceDate!);
              const isOverdue = daysUntil < 0;
              
              return (
                <div key={component.id} className="group relative bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-indigo-50/30 dark:to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-display-name text-display-sm text-gray-900 dark:text-white leading-tight">{component.name}</h4>
                      <span className={`px-3 py-1.5 font-label text-xs rounded-lg shadow-sm ${
                        isOverdue 
                          ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
                          : daysUntil <= 7 
                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white' 
                            : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'
                      }`}>
                        {isOverdue ? `${Math.abs(daysUntil)}d overdue` : `${daysUntil}d`}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center font-body text-xs text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></div>
                        {ship?.name}
                      </div>
                      <div className="flex items-center font-temporal text-xs text-gray-500 dark:text-gray-400">
                        Due: {formatDate(component.nextMaintenanceDate!)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;