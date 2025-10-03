import React from 'react';
// import AnimatedSpinner, { DotsSpinner, SkeletonLoader } from '../ui/AnimatedSpinner';
// import PageTransition from '../ui/PageTransition';
import { cn } from '../../utils/design-system';

const LoadingSpinner = ({ 
  size = 'md', 
  variant = 'primary', 
  type = 'spinner',
  text = 'Carregando...', 
  centered = true,
  overlay = false,
  className = '',
  ...props
}) => {
  // Mapeamento de tamanhos
  const sizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  // Mapeamento de variantes
  const variants = {
    default: 'border-secondary-200 border-t-primary-600',
    primary: 'border-primary-200 border-t-primary-600',
    secondary: 'border-secondary-200 border-t-secondary-600',
  };

  const renderSpinner = () => {
    if (type === 'skeleton') {
      return (
        <div className="animate-pulse space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded"
              style={{ width: i === 2 ? '75%' : '100%' }}
            />
          ))}
        </div>
      );
    }

    if (type === 'dots') {
      return (
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                'rounded-full animate-bounce bg-primary-600',
                size === 'xs' ? 'h-1 w-1' : size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2'
              )}
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: '0.6s',
              }}
            />
          ))}
        </div>
      );
    }

    // Spinner padrão
    return (
      <div
        className={cn(
          'animate-spin rounded-full border-2',
          sizes[size],
          variants[variant]
        )}
      />
    );
  };

  const spinnerComponent = (
    <div className={cn('flex flex-col items-center space-y-3 animate-fade-in', className)}>
      {renderSpinner()}
      {text && (
        <div className="text-sm text-secondary-600 dark:text-secondary-400 font-medium animate-pulse">
          {text}
        </div>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop animate-fade-in">
        <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-2xl border border-secondary-200 dark:border-secondary-700 animate-scale-in">
          {spinnerComponent}
        </div>
      </div>
    );
  }

  if (centered) {
    return (
      <div className="flex items-center justify-center min-h-32 py-8">
        {spinnerComponent}
      </div>
    );
  }

  return spinnerComponent;
};

export default LoadingSpinner;