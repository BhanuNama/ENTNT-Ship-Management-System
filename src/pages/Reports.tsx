import React from 'react';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle, Clock, Ship } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { formatDate, isDateOverdue } from '../utils/dateUtils';

const Reports: React.FC = () => {
  const { ships, components, jobs } = useData();

  // Calculate metrics
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

  // Job completion rate
  const completionRate = totalJobs > 0 ? Math.round((completedJobs / totalJobs) * 100) : 0;

  // Average job completion time (mock calculation)
  const avgCompletionTime = 4.2; // days

  // Jobs by priority
  const jobsByPriority = {
    Low: jobs.filter(j => j.priority === 'Low').length,
    Medium: jobs.filter(j => j.priority === 'Medium').length,
    High: jobs.filter(j => j.priority === 'High').length,
    Critical: jobs.filter(j => j.priority === 'Critical').length
  };

  // Jobs by type
  const jobsByType = {
    Inspection: jobs.filter(j => j.type === 'Inspection').length,
    Repair: jobs.filter(j => j.type === 'Repair').length,
    Replacement: jobs.filter(j => j.type === 'Replacement').length,
    Preventive: jobs.filter(j => j.type === 'Preventive').length
  };

  // Recent completed jobs
  const recentCompletedJobs = jobs
    .filter(j => j.status === 'Completed')
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  // Ships with most jobs
  const shipJobCounts = ships.map(ship => ({
    ship,
    jobCount: jobs.filter(j => j.shipId === ship.id).length,
    activeJobs: jobs.filter(j => j.shipId === ship.id && (j.status === 'Open' || j.status === 'In Progress')).length
  })).sort((a, b) => b.jobCount - a.jobCount).slice(0, 5);

  const MetricCard = ({ title, value, icon: Icon, color, subtitle }: any) => {
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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className={`h-12 w-12 ${iconBg} rounded-lg flex items-center justify-center`}>
            <Icon size={24} className="text-white" />
          </div>
        </div>
      </div>
    );
  };

  const ChartCard = ({ title, children }: any) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );

  const BarChart = ({ data, colors }: any) => {
    const maxValue = Math.max(...Object.values(data).map(v => Number(v)));
    
    return (
      <div className="space-y-3">
        {Object.entries(data).map(([key, value]: [string, any]) => (
          <div key={key} className="flex items-center">
            <div className="w-20 text-sm text-gray-600">{key}</div>
            <div className="flex-1 mx-3">
              <div className="bg-gray-200 rounded-full h-4 relative">
                <div
                  className={`h-4 rounded-full ${colors[key] || 'bg-blue-500'}`}
                  style={{ width: `${maxValue > 0 ? (value / maxValue) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            <div className="w-8 text-sm text-gray-900 font-medium">{value}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600 mt-1">Comprehensive overview of maintenance operations</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Fleet Status"
          value={`${activeShips}/${totalShips}`}
          icon={Ship}
          color="text-blue-600"
          subtitle="Active ships"
        />
        <MetricCard
          title="Job Completion Rate"
          value={`${completionRate}%`}
          icon={CheckCircle}
          color="text-green-600"
          subtitle={`${completedJobs} of ${totalJobs} jobs`}
        />
        <MetricCard
          title="Critical Issues"
          value={criticalComponents + criticalJobs}
          icon={AlertTriangle}
          color="text-red-600"
          subtitle="Components & jobs"
        />
        <MetricCard
          title="Avg. Completion Time"
          value={`${avgCompletionTime} days`}
          icon={Clock}
          color="text-orange-600"
          subtitle="Per maintenance job"
        />
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Ships Under Maintenance"
          value={shipsUnderMaintenance}
          icon={Ship}
          color="text-orange-600"
        />
        <MetricCard
          title="Overdue Maintenance"
          value={overdueComponents}
          icon={AlertTriangle}
          color="text-red-600"
        />
        <MetricCard
          title="Active Jobs"
          value={openJobs + inProgressJobs}
          icon={Clock}
          color="text-blue-600"
        />
        <MetricCard
          title="Warning Components"
          value={warningComponents}
          icon={AlertTriangle}
          color="text-yellow-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Jobs by Priority">
          <BarChart
            data={jobsByPriority}
            colors={{
              Low: 'bg-green-500',
              Medium: 'bg-yellow-500',
              High: 'bg-orange-500',
              Critical: 'bg-red-500'
            }}
          />
        </ChartCard>

        <ChartCard title="Jobs by Type">
          <BarChart
            data={jobsByType}
            colors={{
              Inspection: 'bg-blue-500',
              Repair: 'bg-orange-500',
              Replacement: 'bg-red-500',
              Preventive: 'bg-green-500'
            }}
          />
        </ChartCard>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Completed Jobs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Completed Jobs</h3>
          </div>
          <div className="p-6">
            {recentCompletedJobs.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No completed jobs</p>
            ) : (
              <div className="space-y-4">
                {recentCompletedJobs.map((job) => {
                  const ship = ships.find(s => s.id === job.shipId);
                  const component = components.find(c => c.id === job.componentId);
                  
                  return (
                    <div key={job.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {job.type} - {ship?.name}
                        </p>
                        <p className="text-xs text-gray-500">{component?.name}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Completed {formatDate(job.completedDate || job.updatedAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          {job.priority}
                        </span>
                        {job.actualHours && (
                          <p className="text-xs text-gray-500 mt-1">{job.actualHours}h</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Ships with Most Jobs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Ships by Job Volume</h3>
          </div>
          <div className="p-6">
            {shipJobCounts.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No job data available</p>
            ) : (
              <div className="space-y-4">
                {shipJobCounts.map(({ ship, jobCount, activeJobs }) => (
                  <div key={ship.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{ship.name}</p>
                      <p className="text-xs text-gray-500">IMO: {ship.imo}</p>
                      <p className="text-xs text-gray-400 mt-1">Status: {ship.status}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{jobCount} total jobs</p>
                      <p className="text-xs text-gray-500">{activeJobs} active</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-sm text-white p-6">
        <h3 className="text-lg font-semibold mb-4">Fleet Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-blue-100 text-sm">Fleet Utilization</p>
            <p className="text-2xl font-bold">{Math.round((activeShips / totalShips) * 100)}%</p>
            <p className="text-blue-100 text-xs">{activeShips} of {totalShips} ships active</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm">Maintenance Efficiency</p>
            <p className="text-2xl font-bold">{completionRate}%</p>
            <p className="text-blue-100 text-xs">Job completion rate</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm">Critical Attention Needed</p>
            <p className="text-2xl font-bold">{criticalComponents + criticalJobs + overdueComponents}</p>
            <p className="text-blue-100 text-xs">Critical issues requiring immediate attention</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;