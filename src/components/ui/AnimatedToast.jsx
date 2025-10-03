import React, { useEffect, useState } from 'react';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';
import { cn } from '../../utils/design-system';

/**
 * Toast animado com diferentes tipos e animações
 */
const AnimatedToast = ({ 
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  className = '',
  position = 'top-right',
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Animar entrada
    const enterTimer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    // Auto-close
    const closeTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(closeTimer);
    };
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  const types = {
    success: {
      icon: CheckCircleIcon,
      colors: 'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800 text-success-800 dark:text-success-200',
      iconColor: 'text-success-600 dark:text-success-400',
    },
    error: {
      icon: XCircleIcon,
      colors: 'bg-error-50 dark:bg-error-900/20 border-error-200 dark:border-error-800 text-error-800 dark:text-error-200',
      iconColor: 'text-error-600 dark:text-error-400',
    },
    warning: {
      icon: ExclamationTriangleIcon,
      colors: 'bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800 text-warning-800 dark:text-warning-200',
      iconColor: 'text-warning-600 dark:text-warning-400',
    },
    info: {
      icon: InformationCircleIcon,
      colors: 'bg-info-50 dark:bg-info-900/20 border-info-200 dark:border-info-800 text-info-800 dark:text-info-200',
      iconColor: 'text-info-600 dark:text-info-400',
    },
  };

  const positions = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  const typeConfig = types[type];
  const Icon = typeConfig.icon;

  return (
    <div
      className={cn(
        'fixed z-50 max-w-sm w-full transition-all duration-300 ease-smooth',
        positions[position],
        isVisible && !isLeaving ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95',
        position.includes('left') && !isVisible && 'translate-x-full',
        position.includes('left') && !isVisible && '-translate-x-full',
        className
      )}
      {...props}
    >
      <div className={cn(
        'p-4 rounded-lg border shadow-lg backdrop-blur-sm',
        typeConfig.colors
      )}>
        <div className="flex items-start space-x-3">
          <Icon className={cn('h-6 w-6 flex-shrink-0 mt-0.5', typeConfig.iconColor)} />
          
          <div className="flex-1 min-w-0">
            {title && (
              <h4 className="text-sm font-semibold mb-1">
                {title}
              </h4>
            )}
            {message && (
              <p className="text-sm opacity-90">
                {message}
              </p>
            )}
          </div>
          
          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-150"
            aria-label="Fechar notificação"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
        
        {/* Barra de progresso */}
        <div className="mt-3 h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
          <div 
            className={cn(
              'h-full rounded-full transition-all ease-linear',
              type === 'success' && 'bg-success-600',
              type === 'error' && 'bg-error-600',
              type === 'warning' && 'bg-warning-600',
              type === 'info' && 'bg-info-600'
            )}
            style={{
              width: isLeaving ? '0%' : '100%',
              transitionDuration: `${duration}ms`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Container para múltiplos toasts
 */
export const ToastContainer = ({ 
  toasts = [], 
  position = 'top-right',
  className = '',
  ...props 
}) => {
  const positions = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'top-center': 'top-0 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
  };

  return (
    <div
      className={cn(
        'fixed z-50 p-4 space-y-2 max-w-sm w-full',
        positions[position],
        className
      )}
      {...props}
    >
      {toasts.map((toast, index) => (
        <AnimatedToast
          key={toast.id || index}
          {...toast}
          position="relative"
          className="relative top-auto right-auto bottom-auto left-auto translate-x-0"
        />
      ))}
    </div>
  );
};

export default AnimatedToast;