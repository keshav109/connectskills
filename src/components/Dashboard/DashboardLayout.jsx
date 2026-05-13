import React, { useState } from 'react';
import Header from '../Layout/Header';
import Sidebar from '../Layout/Sidebar';
import CustomerDashboard from '../Customer/CustomerDashboard';
import PostJob from '../Customer/PostJob';
import MyJobs from '../Customer/MyJobs';
import WorkerDashboard from '../Worker/WorkerDashboard';
import BrowseJobs from '../Worker/BrowseJobs';
import MyBids from '../Worker/MyBids';
import ActiveJobs from '../Worker/ActiveJobs';
import Earnings from '../Worker/Earnings';
import Reviews from '../Worker/Reviews';
import AdminDashboard from '../Admin/AdminDashboard';
import ManageUsers from '../Admin/ManageUsers';
import ManageJobs from '../Admin/ManageJobs';
import Analytics from '../Admin/Analytics';
import Messages from '../Common/Messages';
import Profile from '../Common/Profile';
import Settings from '../Common/Settings';
import { useAuth } from '../../contexts/AuthContext';

const DashboardLayout = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser } = useAuth();

  React.useEffect(() => {
    const handleNavigate = (e) => {
      if (e.detail && e.detail.page) {
        setCurrentPage(e.detail.page);
        setSidebarOpen(false);
      }
    };
    window.addEventListener('navigate', handleNavigate);
    return () => window.removeEventListener('navigate', handleNavigate);
  }, []);

  const getPageTitle = () => {
    if (currentPage === 'dashboard') {
      return `${currentUser?.role === 'customer' ? 'Customer' : currentUser?.role === 'worker' ? 'Worker' : 'Admin'} Dashboard`;
    }
    
    const pageTitles = {
      'my-jobs': 'My Jobs',
      'browse-jobs': 'Browse Jobs',
      'my-bids': 'My Bids',
      'active-jobs': 'Active Jobs',
      'earnings': 'Earnings',
      'reviews': 'Reviews',
      'messages': 'Messages',
      'profile': 'Profile',
      'users': 'Users',
      'jobs': 'Jobs',
      'analytics': 'Analytics'
    };
    
    return pageTitles[currentPage] || 'Dashboard';
  };

  const renderPageContent = () => {
    // Customer Pages
    if (currentUser?.role === 'customer') {
      switch (currentPage) {
        case 'dashboard':
          return <CustomerDashboard />;
        case 'my-jobs':
          return <MyJobs />;
        case 'messages':
          return <Messages />;
        case 'profile':
          return <Profile />;
        default:
          return <CustomerDashboard />;
      }
    }

    // Worker Pages
    if (currentUser?.role === 'worker') {
      switch (currentPage) {
        case 'dashboard':
          return <WorkerDashboard />;
        case 'browse-jobs':
          return <BrowseJobs />;
        case 'my-bids':
          return <MyBids />;
        case 'active-jobs':
          return <ActiveJobs />;
        case 'earnings':
          return <Earnings />;
        case 'reviews':
          return <Reviews />;
        case 'profile':
          return <Profile />;
        default:
          return <WorkerDashboard />;
      }
    }

    // Admin Pages
    if (currentUser?.role === 'admin') {
      switch (currentPage) {
        case 'dashboard':
          return <AdminDashboard />;
        case 'users':
          return <ManageUsers />;
        case 'jobs':
          return <ManageJobs />;
        case 'analytics':
          return <Analytics />;
        default:
          return <AdminDashboard />;
      }
    }

    return <div>Unknown user role</div>;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={(page) => {
          setCurrentPage(page);
          setSidebarOpen(false);
        }} 
        isOpen={sidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <Header 
          title={getPageTitle()} 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          showMenuToggle={true}
        />
        <main className="p-4 lg:p-6">
          {renderPageContent()}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;