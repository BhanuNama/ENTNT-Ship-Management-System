export interface User {
  id: string;
  role: 'Admin' | 'Inspector' | 'Engineer';
  email: string;
  password: string;
  name: string;
}

export interface Ship {
  id: string;
  name: string;
  imo: string;
  flag: string;
  status: 'Active' | 'Under Maintenance' | 'Docked' | 'Inactive';
  type?: string;
  yearBuilt?: number;
  lastInspection?: string;
}

export interface Component {
  id: string;
  shipId: string;
  name: string;
  serialNumber: string;
  installDate: string;
  lastMaintenanceDate: string;
  status: 'Good' | 'Warning' | 'Critical';
  nextMaintenanceDate?: string;
}

export interface MaintenanceJob {
  id: string;
  componentId: string;
  shipId: string;
  type: 'Inspection' | 'Repair' | 'Replacement' | 'Preventive';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Completed' | 'Cancelled';
  assignedEngineerId: string;
  scheduledDate: string;
  completedDate?: string;
  description?: string;
  estimatedHours?: number;
  actualHours?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  type: 'job_created' | 'job_updated' | 'job_completed' | 'maintenance_due'
        | 'ship_created' | 'ship_updated' | 'ship_deleted'
        | 'component_created' | 'component_updated' | 'component_deleted';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  jobId?: string;
  shipId?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface DataContextType {
  ships: Ship[];
  components: Component[];
  jobs: MaintenanceJob[];
  notifications: Notification[];
  users: User[];
  addShip: (ship: Omit<Ship, 'id'>) => void;
  updateShip: (id: string, ship: Partial<Ship>) => void;
  deleteShip: (id: string) => void;
  loadShips: (newShips: Ship[]) => void;
  addComponent: (component: Omit<Component, 'id'>) => void;
  updateComponent: (id: string, component: Partial<Component>) => void;
  deleteComponent: (id: string) => void;
  addJob: (job: Omit<MaintenanceJob, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateJob: (id: string, job: Partial<MaintenanceJob>) => void;
  deleteJob: (id: string) => void;
  markNotificationRead: (id: string) => void;
  dismissNotification: (id: string) => void;
}