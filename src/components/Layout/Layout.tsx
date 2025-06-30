import React, { useState } from 'react';
import Header from './Header';
import NotificationBanner from './NotificationBanner';
import Sidebar from './Sidebar';
import GuidedTour from './GuidedTour';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex h-screen">
        <Sidebar 
          isOpen={isMobileMenuOpen} 
          onClose={closeMobileMenu} 
        />
        
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          <Header 
            onMenuToggle={toggleMobileMenu} 
            isMobileMenuOpen={isMobileMenuOpen} 
          />
          <NotificationBanner />
          <GuidedTour />
          
          <main className="flex-1 overflow-y-auto">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;