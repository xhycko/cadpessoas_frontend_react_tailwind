// COMPONENTE NÃO UTILIZADO - Comentado para evitar imports desnecessários
// O projeto usa LoadingSpinner em components/common/LoadingSpinner.jsx

/*
import React from 'react';
import { cn } from '../../utils/design-system';

/**
 * Spinner animado com diferentes variações
 */
const AnimatedSpinner = ({ 
  size = 'md', 
  variant = 'default',
  className = '',
  ...props 
}) => {
  const sizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  const variants = {
    default: 'border-secondary-200 border-t-primary-600',
    primary: 'border-primary-200 border-t-primary-600',
    secondary: 'border-secondary-200 border-t-secondary-600',
    success: 'border-success-200 border-t-success-600',
    error: 'border-error-200 border-t-error-600',
    warning: 'border-warning-200 border-t-warning-600',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2',
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

/**
 * Spinner com pulso
 */
export const PulseSpinner = ({ 
  size = 'md', 
  variant = 'primary',
  className = '',
  ...props 
}) => {
  const sizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  const variants = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    success: 'bg-success-600',
    error: 'bg-error-600',
    warning: 'bg-warning-600',
  };

  return (
    <div
      className={cn(
        'animate-pulse rounded-full',
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

/**
 * Spinner com pontos
 */
export const DotsSpinner = ({ 
  size = 'md', 
  variant = 'primary',
  className = '',
  ...props 
}) => {
  const sizes = {
    xs: 'h-1 w-1',
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-3 w-3',
    xl: 'h-4 w-4',
  };

  const variants = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    success: 'bg-success-600',
    error: 'bg-error-600',
    warning: 'bg-warning-600',
  };

  return (
    <div className={cn('flex space-x-1', className)} {...props}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'rounded-full animate-bounce',
            sizes[size],
            variants[variant]
          )}
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: '0.6s',
          }}
        />
      ))}
    </div>
  );
};

/**
 * Skeleton loader animado
 */
export const SkeletonLoader = ({ 
  className = '',
  lines = 1,
  ...props 
}) => {
  return (
    <div className={cn('animate-pulse space-y-2', className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded"
          style={{
            width: i === lines - 1 ? '75%' : '100%',
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedSpinner;
*/