import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { formatDate } from '../utils/dateUtils';
import JobModal from '../components/Jobs/JobModal';

const Calendar: React.FC = () => {
  const { jobs, ships, components } = useData();
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week'>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);

  const canCreateJobs = user?.role === 'Admin' || user?.role === 'Inspector' || user?.role === 'Engineer';

  // Get jobs for a specific date
  const getJobsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return jobs.filter(job => job.scheduledDate.startsWith(dateStr));
  };

  // Generate calendar days for month view
  const generateMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 42); // 6 weeks
    
    for (let date = new Date(startDate); date < endDate; date.setDate(date.getDate() + 1)) {
      days.push(new Date(date));
    }
    
    return days;
  };

  // Generate week days for week view
  const generateWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const priorityColors = {
    'Low': 'bg-green-500',
    'Medium': 'bg-yellow-500',
    'High': 'bg-orange-500',
    'Critical': 'bg-red-500'
  };

  const statusColors = {
    'Open': 'border-l-gray-400',
    'In Progress': 'border-l-blue-500',
    'Completed': 'border-l-green-500',
    'Cancelled': 'border-l-red-500'
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = view === 'month' ? generateMonthDays() : generateWeekDays();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Maintenance Calendar</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Schedule and track maintenance jobs</p>
        </div>
        {canCreateJobs && (
          <button
            id="tour-schedule-job"
            onClick={() => setShowModal(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} className="mr-2" />
            Schedule Job
          </button>
        )}
      </div>

      {/* Calendar Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => view === 'month' ? navigateMonth('prev') : navigateWeek('prev')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            
            <h2 className="text-xl font-semibold text-gray-900">
              {view === 'month' 
                ? `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
                : `Week of ${formatDate(generateWeekDays()[0].toISOString())}`
              }
            </h2>
            
            <button
              onClick={() => view === 'month' ? navigateMonth('next') : navigateWeek('next')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              Today
            </button>
            <div className="flex bg-gray-100 rounded-md p-1">
              <button
                onClick={() => setView('month')}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  view === 'month' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setView('week')}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  view === 'week' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Week
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
          {/* Day headers */}
          {dayNames.map((day) => (
            <div key={day} className="bg-gray-50 p-3 text-center text-sm font-medium text-gray-700">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {days.map((date, index) => {
            const dayJobs = getJobsForDate(date);
            const isCurrentMonthDay = view === 'week' || isCurrentMonth(date);
            
            return (
              <div
                key={index}
                className={`bg-white min-h-[120px] p-2 ${
                  !isCurrentMonthDay ? 'text-gray-400 bg-gray-50' : ''
                } ${isToday(date) ? 'bg-blue-50' : ''} hover:bg-gray-50 transition-colors cursor-pointer`}
                onClick={() => setSelectedDate(date)}
              >
                <div className={`text-sm font-medium mb-2 ${
                  isToday(date) ? 'text-blue-600' : isCurrentMonthDay ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {date.getDate()}
                </div>
                
                <div className="space-y-1">
                  {dayJobs.slice(0, view === 'month' ? 3 : 5).map((job) => {
                    const ship = ships.find(s => s.id === job.shipId);
                    const component = components.find(c => c.id === job.componentId);
                    
                    return (
                      <div
                        key={job.id}
                        className={`text-xs p-1 rounded border-l-2 bg-gray-50 ${statusColors[job.status]} truncate`}
                        title={`${job.type} - ${ship?.name} - ${component?.name}`}
                      >
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${priorityColors[job.priority]}`}></div>
                          <span className="truncate">{job.type}</span>
                        </div>
                        <div className="text-gray-500 dark:text-gray-400 truncate">{ship?.name}</div>
                      </div>
                    );
                  })}
                  
                  {dayJobs.length > (view === 'month' ? 3 : 5) && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      +{dayJobs.length - (view === 'month' ? 3 : 5)} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Jobs for {formatDate(selectedDate.toISOString())}
          </h3>
          
          {getJobsForDate(selectedDate).length === 0 ? (
            <div className="text-center py-8">
              <CalendarIcon size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No jobs scheduled for this date</p>
              {canCreateJobs && (
                <button
                  onClick={() => setShowModal(true)}
                  className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus size={16} className="mr-2" />
                  Schedule Job
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {getJobsForDate(selectedDate).map((job) => {
                const ship = ships.find(s => s.id === job.shipId);
                const component = components.find(c => c.id === job.componentId);
                
                return (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{job.type}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[job.priority].replace('bg-', 'bg-').replace('-500', '-100')} ${priorityColors[job.priority].replace('bg-', 'text-').replace('-500', '-800')}`}>
                          {job.priority}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          job.status === 'Open' ? 'bg-gray-100 text-gray-800' :
                          job.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          job.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {job.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><span className="font-medium">Ship:</span> {ship?.name}</p>
                      <p><span className="font-medium">Component:</span> {component?.name}</p>
                      {job.description && (
                        <p><span className="font-medium">Description:</span> {job.description}</p>
                      )}
                      {job.estimatedHours && (
                        <p><span className="font-medium">Estimated Hours:</span> {job.estimatedHours}h</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
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

export default Calendar;