// COMPONENTE NÃO UTILIZADO - Comentado para evitar imports desnecessários
// O projeto usa classes CSS diretamente para botões (btn-primary, btn-secondary, etc.)

/*
import React from 'react';
import { cn } from '../../utils/design-system';

/**
 * Botão otimizado para dispositivos touch
 * Área de toque mínima de 44px conforme diretrizes de acessibilidade
 */
const TouchButton = ({ 
  children, 
  className = '', 
  variant = 'default',
  size = 'md',
  disabled = false,
  loading = false,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation select-none';
  
  const variants = {
    default: 'bg-secondary-100 dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 hover:bg-secondary-200 dark:hover:bg-secondary-600 focus:ring-secondary-500 active:bg-secondary-300 dark:active:bg-secondary-500',
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 active:bg-primary-800 shadow-sm hover:shadow-md',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500 active:bg-secondary-800 shadow-sm hover:shadow-md',
    success: 'bg-success-600 text-white hover:bg-success-700 focus:ring-success-500 active:bg-success-800 shadow-sm hover:shadow-md',
    error: 'bg-error-600 text-white hover:bg-error-700 focus:ring-error-500 active:bg-error-800 shadow-sm hover:shadow-md',
    warning: 'bg-warning-600 text-white hover:bg-warning-700 focus:ring-warning-500 active:bg-warning-800 shadow-sm hover:shadow-md',
    ghost: 'bg-transparent hover:bg-secondary-100 dark:hover:bg-secondary-800 text-secondary-700 dark:text-secondary-300 focus:ring-secondary-500',
    outline: 'border-2 border-secondary-300 dark:border-secondary-600 bg-transparent text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800 focus:ring-secondary-500',
  };
  
  const sizes = {
    sm: 'min-h-[36px] min-w-[36px] px-3 py-2 text-sm',
    md: 'min-h-[44px] min-w-[44px] px-4 py-2.5 text-base',
    lg: 'min-h-[48px] min-w-[48px] px-6 py-3 text-lg',
    xl: 'min-h-[52px] min-w-[52px] px-8 py-4 text-xl',
  };
  
  const classes = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    loading && 'cursor-wait',
    className
  );
  
  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="spinner-sm" />
          <span>Carregando...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default TouchButton;
*/