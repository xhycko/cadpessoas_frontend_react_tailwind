import React from 'react';
import { 
  ExclamationCircleIcon, 
  ArrowPathIcon, 
  XMarkIcon 
} from '@heroicons/react/24/outline';

const ErrorMessage = ({ 
  error, 
  onRetry, 
  onDismiss, 
  variant = 'danger',
  showIcon = true,
  dismissible = true 
}) => {
  if (!error) return null;

  const getErrorMessage = () => {
    if (typeof error === 'string') return error;
    if (error.message) return error.message;
    return 'Ocorreu um erro inesperado';
  };

  const getErrorDetails = () => {
    if (error.status === 0) {
      return 'Verifique se a API está rodando em http://localhost:8080';
    }
    if (error.status >= 500) {
      return 'Erro interno do servidor. Tente novamente em alguns instantes.';
    }
    if (error.status === 404) {
      return 'Recurso não encontrado.';
    }
    if (error.status >= 400 && error.status < 500) {
      return 'Verifique os dados informados.';
    }
    return null;
  };

  const variantClasses = {
    danger: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200'
  };

  return (
    <div className={`rounded-lg border p-4 animate-fade-in ${variantClasses[variant]}`}>
      <div className="flex items-start space-x-3">
        {showIcon && (
          <div className="flex-shrink-0">
            <ExclamationCircleIcon className="h-5 w-5" />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="font-medium">
            {getErrorMessage()}
          </div>
          
          {getErrorDetails() && (
            <div className="mt-1 text-sm opacity-80">
              {getErrorDetails()}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center space-x-1 px-3 py-1 text-sm font-medium rounded-md bg-white/20 hover:bg-white/30 transition-colors"
            >
              <ArrowPathIcon className="h-4 w-4" />
              <span>Tentar Novamente</span>
            </button>
          )}
          
          {dismissible && onDismiss && (
            <button
              onClick={onDismiss}
              className="p-1 rounded-md hover:bg-white/20 transition-colors"
              aria-label="Fechar"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;