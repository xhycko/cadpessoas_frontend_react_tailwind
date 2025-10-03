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
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
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

// Componente de toast individual
const CustomToast = ({ toast, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Pequeno delay para animação de entrada
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300); // Aguarda animação de saída
  };

  const getIcon = () => {
    const iconClasses = "h-5 w-5";
    switch (toast.type) {
      case 'success':
        return <CheckCircleIcon className={`${iconClasses} text-green-500`} />;
      case 'error':
        return <XCircleIcon className={`${iconClasses} text-red-500`} />;
      case 'warning':
        return <ExclamationTriangleIcon className={`${iconClasses} text-yellow-500`} />;
      case 'info':
      default:
        return <InformationCircleIcon className={`${iconClasses} text-blue-500`} />;
    }
  };

  const getToastClasses = () => {
    const baseClasses = `transform transition-all duration-300 ease-in-out ${
      show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`;
    
    switch (toast.type) {
      case 'success':
        return `${baseClasses} bg-white dark:bg-gray-800 border-l-4 border-green-500 shadow-lg`;
      case 'error':
        return `${baseClasses} bg-white dark:bg-gray-800 border-l-4 border-red-500 shadow-lg`;
      case 'warning':
        return `${baseClasses} bg-white dark:bg-gray-800 border-l-4 border-yellow-500 shadow-lg`;
      case 'info':
      default:
        return `${baseClasses} bg-white dark:bg-gray-800 border-l-4 border-blue-500 shadow-lg`;
    }
  };

  const getTitle = () => {
    switch (toast.type) {
      case 'success': return 'Sucesso';
      case 'error': return 'Erro';
      case 'warning': return 'Atenção';
      case 'info': return 'Informação';
      default: return 'Notificação';
    }
  };

  return (
    <div className={`${getToastClasses()} rounded-lg p-4 max-w-sm w-full`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3 flex-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {getTitle()}
          </div>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {toast.message}
          </div>
        </div>
        <div className="ml-4 flex-shrink-0">
          <button
            onClick={handleClose}
            className="inline-flex text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            aria-label="Fechar"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomToast;