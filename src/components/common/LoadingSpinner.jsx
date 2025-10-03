import React from 'react';
import AnimatedSpinner, { DotsSpinner, SkeletonLoader } from '../ui/AnimatedSpinner';
import PageTransition from '../ui/PageTransition';
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
  const renderSpinner = () => {
    switch (type) {
      case 'dots':
        return <DotsSpinner size={size} variant={variant} />;
      case 'skeleton':
        return <SkeletonLoader lines={3} />;
      default:
        return <AnimatedSpinner size={size} variant={variant} />;
    }
  };

  const spinnerComponent = (
    <PageTransition animation="fade" className={cn('flex flex-col items-center space-y-3', className)}>
      {renderSpinner()}
      {text && (
        <div className="text-sm text-secondary-600 dark:text-secondary-400 font-medium animate-pulse">
          {text}
        </div>
      )}
    </PageTransition>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop animate-fade-in">
        <PageTransition 
          animation="scale" 
          className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-2xl border border-secondary-200 dark:border-secondary-700"
        >
          {spinnerComponent}
        </PageTransition>
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