import React from 'react';
import { 
  ExclamationTriangleIcon, 
  CheckIcon, 
  XMarkIcon 
} from '@heroicons/react/24/outline';

const ConfirmDialog = ({
  show,
  onHide,
  onConfirm,
  title = 'Confirmar ação',
  message = 'Tem certeza que deseja continuar?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'danger',
  loading = false
}) => {
  if (!show) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onHide();
    }
  };

  const getIcon = () => {
    const iconClasses = "h-6 w-6";
    switch (variant) {
      case 'danger':
        return <ExclamationTriangleIcon className={`${iconClasses} text-red-600`} />;
      case 'warning':
        return <ExclamationTriangleIcon className={`${iconClasses} text-yellow-600`} />;
      case 'success':
        return <CheckIcon className={`${iconClasses} text-green-600`} />;
      default:
        return <ExclamationTriangleIcon className={`${iconClasses} text-blue-600`} />;
    }
  };

  const getConfirmButtonClasses = () => {
    const baseClasses = "inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
    switch (variant) {
      case 'danger':
        return `${baseClasses} bg-red-600 hover:bg-red-700 text-white`;
      case 'warning':
        return `${baseClasses} bg-yellow-600 hover:bg-yellow-700 text-white`;
      case 'success':
        return `${baseClasses} bg-green-600 hover:bg-green-700 text-white`;
      default:
        return `${baseClasses} bg-primary-600 hover:bg-primary-700 text-white`;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full animate-slide-up">
        {/* Header */}
        <div className="flex items-center space-x-3 p-6 border-b border-gray-200 dark:border-gray-700">
          {getIcon()}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
        
        {/* Body */}
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300">
            {message}
          </p>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onHide}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <XMarkIcon className="h-4 w-4 mr-2" />
            {cancelText}
          </button>
          
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={getConfirmButtonClasses()}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Processando...
              </>
            ) : (
              <>
                <CheckIcon className="h-4 w-4 mr-2" />
                {confirmText}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;