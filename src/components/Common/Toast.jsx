import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor = type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const iconColor = type === 'success' ? 'text-green-600' : 'text-red-600';
  const Icon = type === 'success' ? CheckCircle : AlertCircle;

  return (
    <div className={`fixed top-4 right-4 ${bgColor} border rounded-lg p-4 shadow-lg flex items-center gap-3 max-w-md z-50 animate-in fade-in slide-in-from-top-2 duration-200`}>
      <Icon size={20} className={iconColor} />
      <p className={`${textColor} text-sm font-medium flex-1`}>{message}</p>
      <button onClick={onClose} className={`${textColor} hover:opacity-70`}>
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
