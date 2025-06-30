import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Ship, 
  Settings, 
  Calendar, 
  ClipboardList,
  Users,
  BarChart3,
  Anchor
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['Admin', 'Inspector', 'Engineer'] },
    { name: 'Ships', href: '/ships', icon: Ship, roles: ['Admin', 'Inspector', 'Engineer'] },
    { name: 'Maintenance Jobs', href: '/jobs', icon: ClipboardList, roles: ['Admin', 'Inspector', 'Engineer'] },
    { name: 'Calendar', href: '/calendar', icon: Calendar, roles: ['Admin', 'Inspector', 'Engineer'] },
    { name: 'Reports', href: '/reports', icon: BarChart3, roles: ['Admin', 'Inspector'] },
    { name: 'Users', href: '/users', icon: Users, roles: ['Admin'] },
  ];

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user?.role || '')
  );

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out border-r border-gray-200 dark:border-gray-700
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center px-6 py-6 border-b border-gray-200 dark:border-gray-700">
            <Link id="tour-logo" to="/dashboard" className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Anchor className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-header text-display-md text-gray-900 dark:text-white">ENTNT Marine</h1>
                <p className="font-body text-xs text-gray-500 dark:text-gray-400">Ship Management</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex-1 flex flex-col pt-6 pb-4 overflow-y-auto">
            <nav className="flex-1 px-4 space-y-2">
              {filteredNavigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    id={`tour-nav-${item.name.toLowerCase().replace(/ /g, '-')}`}
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className={`
                      group flex items-center px-3 py-2.5 font-nav text-sm rounded-lg transition-all duration-200
                      ${active
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                      }
                    `}
                  >
                    <Icon
                      className={`
                        mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200
                        ${active
                          ? 'text-white'
                          : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                        }
                      `}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          {/* User info in sidebar */}
          <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="font-display-name text-sm text-blue-600 dark:text-blue-400">
                  {user?.name?.charAt(0)}
                </span>
              </div>
              <div className="ml-3">
                <p className="font-display-name text-sm text-gray-700 dark:text-gray-300">{user?.name}</p>
                <p className="font-label text-xs text-gray-500 dark:text-gray-400">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;