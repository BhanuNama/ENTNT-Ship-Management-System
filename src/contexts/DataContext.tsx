import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Ship, Component, MaintenanceJob, Notification, User, DataContextType } from '../types';

const DataContext = createContext<DataContextType | undefined>(undefined);

const MOCK_USERS: User[] = [
  { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123", name: "John Administrator" },
  { id: "2", role: "Inspector", email: "inspector@entnt.in", password: "inspect123", name: "Sarah Inspector" },
  { id: "3", role: "Engineer", email: "engineer@entnt.in", password: "engine123", name: "Mike Engineer" }
];

const INITIAL_SHIPS: Ship[] = [
  { 
    id: "s1", 
    name: "Ever Given", 
    imo: "9811000", 
    flag: "Panama", 
    status: "Active",
    type: "Container Ship",
    yearBuilt: 2018,
    lastInspection: "2024-01-15"
  },
  { 
    id: "s2", 
    name: "Maersk Alabama", 
    imo: "9164263", 
    flag: "USA", 
    status: "Under Maintenance",
    type: "Container Ship",
    yearBuilt: 2008,
    lastInspection: "2023-11-20"
  },
  { 
    id: "s3", 
    name: "Queen Mary 2", 
    imo: "9241061", 
    flag: "United Kingdom", 
    status: "Active",
    type: "Passenger Ship",
    yearBuilt: 2003,
    lastInspection: "2024-02-10"
  }
];

const INITIAL_COMPONENTS: Component[] = [
  { 
    id: "c1", 
    shipId: "s1", 
    name: "Main Engine", 
    serialNumber: "ME-1234", 
    installDate: "2020-01-10", 
    lastMaintenanceDate: "2024-03-12",
    status: "Good",
    nextMaintenanceDate: "2024-09-12"
  },
  { 
    id: "c2", 
    shipId: "s2", 
    name: "Radar System", 
    serialNumber: "RAD-5678", 
    installDate: "2021-07-18", 
    lastMaintenanceDate: "2023-12-01",
    status: "Warning",
    nextMaintenanceDate: "2024-06-01"
  },
  { 
    id: "c3", 
    shipId: "s1", 
    name: "Navigation System", 
    serialNumber: "NAV-9012", 
    installDate: "2020-01-10", 
    lastMaintenanceDate: "2024-01-20",
    status: "Critical",
    nextMaintenanceDate: "2024-04-20"
  },
  { 
    id: "c4", 
    shipId: "s3", 
    name: "Propulsion System", 
    serialNumber: "PROP-3456", 
    installDate: "2019-05-15", 
    lastMaintenanceDate: "2024-02-28",
    status: "Good",
    nextMaintenanceDate: "2024-08-28"
  }
];

const INITIAL_JOBS: MaintenanceJob[] = [
  { 
    id: "j1", 
    componentId: "c1", 
    shipId: "s1", 
    type: "Inspection", 
    priority: "High", 
    status: "Open", 
    assignedEngineerId: "3", 
    scheduledDate: "2024-05-15",
    description: "Routine engine inspection",
    estimatedHours: 8,
    createdAt: "2024-04-01T10:00:00Z",
    updatedAt: "2024-04-01T10:00:00Z"
  },
  { 
    id: "j2", 
    componentId: "c2", 
    shipId: "s2", 
    type: "Repair", 
    priority: "Critical", 
    status: "In Progress", 
    assignedEngineerId: "3", 
    scheduledDate: "2024-04-20",
    description: "Radar calibration and repair",
    estimatedHours: 12,
    actualHours: 8,
    createdAt: "2024-04-10T14:30:00Z",
    updatedAt: "2024-04-18T09:15:00Z"
  },
  { 
    id: "j3", 
    componentId: "c3", 
    shipId: "s1", 
    type: "Replacement", 
    priority: "Critical", 
    status: "Open", 
    assignedEngineerId: "3", 
    scheduledDate: "2024-04-25",
    description: "Replace faulty navigation components",
    estimatedHours: 16,
    createdAt: "2024-04-12T11:20:00Z",
    updatedAt: "2024-04-12T11:20:00Z"
  }
];

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    type: "job_created",
    title: "New Maintenance Job Created",
    message: "Inspection job created for Ever Given main engine",
    timestamp: "2024-04-01T10:00:00Z",
    read: false,
    jobId: "j1",
    shipId: "s1"
  },
  {
    id: "n2",
    type: "maintenance_due",
    title: "Maintenance Due",
    message: "Navigation System on Ever Given requires critical maintenance",
    timestamp: "2024-04-12T08:00:00Z",
    read: false,
    shipId: "s1"
  }
];

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [ships, setShips] = useState<Ship[]>([]);
  const [components, setComponents] = useState<Component[]>([]);
  const [jobs, setJobs] = useState<MaintenanceJob[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [users] = useState<User[]>(MOCK_USERS);

  useEffect(() => {
    // Initialize data from localStorage or use defaults
    const storedShips = localStorage.getItem('ships');
    const storedComponents = localStorage.getItem('components');
    const storedJobs = localStorage.getItem('jobs');
    const storedNotifications = localStorage.getItem('notifications');

    setShips(storedShips ? JSON.parse(storedShips) : INITIAL_SHIPS);
    setComponents(storedComponents ? JSON.parse(storedComponents) : INITIAL_COMPONENTS);
    setJobs(storedJobs ? JSON.parse(storedJobs) : INITIAL_JOBS);
    setNotifications(storedNotifications ? JSON.parse(storedNotifications) : INITIAL_NOTIFICATIONS);
  }, []);

  useEffect(() => {
    // Clean up extraneous localStorage entries
    const allowedKeys = ['ships', 'components', 'jobs', 'notifications', 'theme'];
    Object.keys(localStorage).forEach(key => {
      if (!allowedKeys.includes(key)) {
        localStorage.removeItem(key);
      }
    });
  }, []);

  // Listen for localStorage changes from other tabs/windows and sync state
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'ships') {
        setShips(e.newValue ? JSON.parse(e.newValue) : []);
      } else if (e.key === 'components') {
        setComponents(e.newValue ? JSON.parse(e.newValue) : []);
      } else if (e.key === 'jobs') {
        setJobs(e.newValue ? JSON.parse(e.newValue) : []);
      } else if (e.key === 'notifications') {
        setNotifications(e.newValue ? JSON.parse(e.newValue) : []);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem('ships', JSON.stringify(ships));
  }, [ships]);

  useEffect(() => {
    localStorage.setItem('components', JSON.stringify(components));
  }, [components]);

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addShip = (ship: Omit<Ship, 'id'>) => {
    const now = new Date().toISOString();
    const newShip = { ...ship, id: `s${Date.now()}` };
    setShips(prev => [...prev, newShip]);
    // Notification for ship creation
    const notification: Notification = {
      id: `n${Date.now()}`,
      type: 'ship_created',
      title: 'Ship Created',
      message: `New ship "${newShip.name}" has been added.`,
      timestamp: now,
      read: false,
      shipId: newShip.id
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const updateShip = (id: string, ship: Partial<Ship>) => {
    setShips(prev => prev.map(s => s.id === id ? { ...s, ...ship } : s));
    // Notification for ship update
    const updatedShip = ships.find(s => s.id === id);
    if (updatedShip) {
      const now = new Date().toISOString();
      const notification: Notification = {
        id: `n${Date.now()}`,
        type: 'ship_updated',
        title: 'Ship Updated',
        message: `Ship "${updatedShip.name}" has been updated.`,
        timestamp: now,
        read: false,
        shipId: id
      };
      setNotifications(prev => [notification, ...prev]);
    }
  };

  const deleteShip = (id: string) => {
    // Notification for ship deletion
    const shipToDelete = ships.find(s => s.id === id);
    setShips(prev => prev.filter(s => s.id !== id));
    setComponents(prev => prev.filter(c => c.shipId !== id));
    setJobs(prev => prev.filter(j => j.shipId !== id));
    if (shipToDelete) {
      const now = new Date().toISOString();
      const notification: Notification = {
        id: `n${Date.now()}`,
        type: 'ship_deleted',
        title: 'Ship Deleted',
        message: `Ship "${shipToDelete.name}" has been removed.`,
        timestamp: now,
        read: false
      };
      setNotifications(prev => [notification, ...prev]);
    }
  };

  const addComponent = (component: Omit<Component, 'id'>) => {
    const now = new Date().toISOString();
    const newComponent = { ...component, id: `c${Date.now()}` };
    setComponents(prev => [...prev, newComponent]);
    // Notification for component creation
    const ship = ships.find(s => s.id === newComponent.shipId);
    const notification: Notification = {
      id: `n${Date.now()}`,
      type: 'component_created',
      title: 'Component Added',
      message: `Component "${newComponent.name}" added to ship "${ship?.name}".`,
      timestamp: now,
      read: false,
      shipId: newComponent.shipId
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const updateComponent = (id: string, component: Partial<Component>) => {
    setComponents(prev => prev.map(c => c.id === id ? { ...c, ...component } : c));
    // Notification for component update
    const updatedComponent = components.find(c => c.id === id);
    if (updatedComponent) {
      const now = new Date().toISOString();
      const notification: Notification = {
        id: `n${Date.now()}`,
        type: 'component_updated',
        title: 'Component Updated',
        message: `Component "${updatedComponent.name}" has been updated.`,
        timestamp: now,
        read: false,
        shipId: updatedComponent.shipId
      };
      setNotifications(prev => [notification, ...prev]);
    }
  };

  const deleteComponent = (id: string) => {
    // Notification for component deletion
    const componentToDelete = components.find(c => c.id === id);
    setComponents(prev => prev.filter(c => c.id !== id));
    setJobs(prev => prev.filter(j => j.componentId !== id));
    if (componentToDelete) {
      const now = new Date().toISOString();
      const notification: Notification = {
        id: `n${Date.now()}`,
        type: 'component_deleted',
        title: 'Component Removed',
        message: `Component "${componentToDelete.name}" has been removed.`,
        timestamp: now,
        read: false,
        shipId: componentToDelete.shipId
      };
      setNotifications(prev => [notification, ...prev]);
    }
  };

  // Load ships en masse (for import)
  const loadShips = (newShips: Ship[]) => {
    setShips(newShips.map(s => ({ ...s }))); // replace entire list
  };

  const addJob = (job: Omit<MaintenanceJob, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newJob = { 
      ...job, 
      id: `j${Date.now()}`,
      createdAt: now,
      updatedAt: now
    };
    setJobs(prev => [...prev, newJob]);
    
    // Add notification
    const ship = ships.find(s => s.id === job.shipId);
    const component = components.find(c => c.id === job.componentId);
    if (ship && component) {
      const notification: Notification = {
        id: `n${Date.now()}`,
        type: 'job_created',
        title: 'New Maintenance Job Created',
        message: `${job.type} job created for ${ship.name} - ${component.name}`,
        timestamp: now,
        read: false,
        jobId: newJob.id,
        shipId: job.shipId
      };
      setNotifications(prev => [notification, ...prev]);
    }
  };

  const updateJob = (id: string, job: Partial<MaintenanceJob>) => {
    const updatedJob = { ...job, updatedAt: new Date().toISOString() };
    setJobs(prev => prev.map(j => j.id === id ? { ...j, ...updatedJob } : j));
    
    // Add notification for status changes
    if (job.status) {
      const currentJob = jobs.find(j => j.id === id);
      const ship = ships.find(s => s.id === currentJob?.shipId);
      const component = components.find(c => c.id === currentJob?.componentId);
      
      if (currentJob && ship && component) {
        const notification: Notification = {
          id: `n${Date.now()}`,
          type: job.status === 'Completed' ? 'job_completed' : 'job_updated',
          title: job.status === 'Completed' ? 'Job Completed' : 'Job Updated',
          message: `${currentJob.type} for ${ship.name} - ${component.name} is now ${job.status}`,
          timestamp: new Date().toISOString(),
          read: false,
          jobId: id,
          shipId: currentJob.shipId
        };
        setNotifications(prev => [notification, ...prev]);
      }
    }
  };

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(j => j.id !== id));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const value: DataContextType = {
    ships,
    components,
    jobs,
    notifications,
    users,
    addShip,
    updateShip,
    deleteShip,
    addComponent,
    updateComponent,
    deleteComponent,
    addJob,
    updateJob,
    deleteJob,
    markNotificationRead,
    dismissNotification,
    loadShips,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};