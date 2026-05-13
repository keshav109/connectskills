import React from 'react';
import { 
  Home, 
  Briefcase, 
  Users, 
  User, 
  Settings, 
  BarChart3,
  MessageSquare,
  Star,
  Wallet,
  FileText
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ currentPage, onPageChange, isOpen }) => {
  const { currentUser } = useAuth();

  const getMenuItems = () => {
    if (currentUser?.role === 'customer') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'my-jobs', label: 'My Jobs', icon: Briefcase },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'profile', label: 'Profile', icon: User }
      ];
    } else if (currentUser?.role === 'worker') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'browse-jobs', label: 'Browse Jobs', icon: Briefcase },
        { id: 'my-bids', label: 'My Bids', icon: FileText },
        { id: 'active-jobs', label: 'Active Jobs', icon: Briefcase },
        { id: 'earnings', label: 'Earnings', icon: Wallet },
        { id: 'reviews', label: 'Reviews', icon: Star },
        { id: 'profile', label: 'Profile', icon: User }
      ];
    } else if (currentUser?.role === 'admin') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'jobs', label: 'Jobs', icon: Briefcase },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 }
      ];
    }
    return [];
  };

  const menuItems = getMenuItems();

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex flex-col h-full">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-blue-600">SkillConnect</h2>
          <p className="text-sm text-gray-500 mt-1">Service Marketplace</p>
        </div>
        
        <nav className="flex-1 px-4 pb-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onPageChange(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;