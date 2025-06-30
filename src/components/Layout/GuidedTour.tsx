import React, { useState, useEffect } from 'react';
import Joyride, { Step, CallBackProps, STATUS } from 'react-joyride';
import { useAuth } from '../../contexts/AuthContext';

const steps: Step[] = [
  { target: '#tour-logo', content: 'Click here to return to the Dashboard.' },
  { target: '#tour-nav-ships', content: 'Browse and manage your ships.' },
  { target: '#tour-nav-components', content: 'View and edit ship components.' },
  { target: '#tour-nav-maintenance-jobs', content: 'Create and track maintenance jobs.' },
  { target: '#tour-nav-calendar', content: 'See scheduled jobs in the calendar.' },
  { target: '#tour-nav-reports', content: 'View key reports and analytics.' },
  { target: '#tour-nav-users', content: 'Manage system users and roles.' },
  { target: '#tour-theme-toggle', content: 'Toggle light/dark mode.' },
  { target: '#tour-notifications', content: 'View in-app notifications here.' },
  { target: '#tour-add-ship', content: 'Use this button to add a new ship.' },
  { target: '#tour-create-job', content: 'Use this button to create a maintenance job.' },
  { target: '#tour-schedule-job', content: 'Schedule jobs directly from this calendar view.' }
];

const GuidedTour: React.FC = () => {
  const { user } = useAuth();
  const [run, setRun] = useState(false);
  const skipKey = 'skipTutorialUsers';

  useEffect(() => {
    if (!user) return;
    const skipList: string[] = JSON.parse(localStorage.getItem(skipKey) || '[]');
    if (!skipList.includes(user.id)) {
      setRun(true);
    }
  }, [user]);

  const handleCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      if (window.confirm("Don't show the tutorial again?")) {
        const skipList: string[] = JSON.parse(localStorage.getItem(skipKey) || '[]');
        if (user && !skipList.includes(user.id)) {
          skipList.push(user.id);
          localStorage.setItem(skipKey, JSON.stringify(skipList));
        }
      }
      setRun(false);
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      showSkipButton={true}
      continuous={true}
      callback={handleCallback}
      styles={{
        options: {
          zIndex: 10000,
          backgroundColor: '#fff',
          textColor: '#111827', // gray-900
          primaryColor: '#2563eb', // blue-600
          arrowColor: '#fff',
          spotlightShadow: '0 0 0 2000px rgba(0,0,0,0.5)',
        },
        tooltipContainer: {
          background: '#ffffff',
          border: '1px solid #e5e7eb', // gray-200
          padding: '1.5rem',
          borderRadius: '0.75rem', // rounded-xl
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)', // shadow-sm
        },
        tooltipContent: {
          color: '#374151', // gray-700
          fontSize: '0.875rem',
        },
        buttonNext: {
          backgroundColor: '#2563eb', // blue-600
          borderRadius: '0.375rem', // rounded-md
          color: '#ffffff',
          padding: '0.5rem 1rem',
          fontWeight: 500,
        },
        buttonBack: {
          color: '#4b5563', // gray-600
          padding: '0.5rem 1rem',
          fontWeight: 500,
        },
        buttonSkip: {
          color: '#ef4444', // red-500
          padding: '0.5rem 1rem',
          fontWeight: 500,
        }
      }}
    />
  );
};

export default GuidedTour; 