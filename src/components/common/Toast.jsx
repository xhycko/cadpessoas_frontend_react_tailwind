import React, { useState, useEffect } from 'react';
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

// Context para gerenciar toasts globalmente
export const ToastContext = React.createContext();

// Hook para usar toasts
export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser usado dentro de ToastProvider');
  }
  return context;
};

// Provider de toasts
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random();
    const toast = { id, message, type, duration };

    setToasts(prev => [...prev, toast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showSuccess = (message, duration) => addToast(message, 'success', duration);
  const showError = (message, duration) => addToast(message, 'error', duration);
  const showWarning = (message, duration) => addToast(message, 'warning', duration);
  const showInfo = (message, duration) => addToast(message, 'info', duration);

  return (
    <ToastContext.Provider value={{
      addToast,
      removeToast,
      showSuccess,
      showError,
      showWarning,
      showInfo
    }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-1 max-w-xs">
        {toasts.map(toast => (
          <CustomToast
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const CustomToast = ({ toast, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircleIcon className="h-3 w-3 text-green-500" />;
      case 'error':
        return <XCircleIcon className="h-3 w-3 text-red-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-3 w-3 text-yellow-500" />;
      case 'info':
      default:
        return <InformationCircleIcon className="h-3 w-3 text-blue-500" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success': return 'border-green-500';
      case 'error': return 'border-red-500';
      case 'warning': return 'border-yellow-500';
      case 'info':
      default: return 'border-blue-500';
    }
  };

  return (
    <div className={`transform transition-all duration-300 ease-in-out ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } bg-white dark:bg-gray-800 border-l-2 ${getBorderColor()} shadow-md rounded p-2 max-w-xs w-full`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-1.5 flex-1 min-w-0">
          <div className="text-xs text-gray-900 dark:text-white truncate">
            {toast.message}
          </div>
        </div>
        <div className="ml-1.5 flex-shrink-0">
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            aria-label="Fechar"
          >
            <XMarkIcon className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomToast;