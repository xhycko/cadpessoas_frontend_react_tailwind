// COMPONENTE NÃO UTILIZADO - Comentado para evitar imports desnecessários
// O projeto usa inputs HTML padrão com classes Tailwind

/*
import React, { forwardRef } from 'react';
import { cn } from '../../utils/design-system';

/**
 * Input otimizado para dispositivos touch
 * Altura mínima de 44px e melhor experiência em mobile
 */
const TouchInput = forwardRef(({ 
  label,
  error,
  helperText,
  className = '',
  containerClassName = '',
  variant = 'default',
  size = 'md',
  leftIcon,
  rightIcon,
  ...props 
}, ref) => {
  const baseClasses = 'block w-full border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 placeholder-secondary-400 dark:placeholder-secondary-500';
  
  const variants = {
    default: 'border-secondary-300 dark:border-secondary-600 focus:ring-primary-500 focus:border-primary-500',
    error: 'border-error-300 dark:border-error-600 focus:ring-error-500 focus:border-error-500 bg-error-50 dark:bg-error-900/10',
    success: 'border-success-300 dark:border-success-600 focus:ring-success-500 focus:border-success-500 bg-success-50 dark:bg-success-900/10',
  };
  
  const sizes = {
    sm: 'min-h-[36px] px-3 py-2 text-sm',
    md: 'min-h-[44px] px-4 py-2.5 text-base',
    lg: 'min-h-[48px] px-5 py-3 text-lg',
  };
  
  const inputClasses = cn(
    baseClasses,
    variants[error ? 'error' : variant],
    sizes[size],
    leftIcon && 'pl-10',
    rightIcon && 'pr-10',
    className
  );
  
  return (
    <div className={cn('space-y-1', containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
          {label}
          {props.required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="h-5 w-5 text-secondary-400 dark:text-secondary-500">
              {leftIcon}
            </div>
          </div>
        )}
        
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <div className="h-5 w-5 text-secondary-400 dark:text-secondary-500">
              {rightIcon}
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-error-600 dark:text-error-400 flex items-center space-x-1">
          <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-secondary-500 dark:text-secondary-400">
          {helperText}
        </p>
      )}
    </div>
  );
});

TouchInput.displayName = 'TouchInput';

export default TouchInput;
*/