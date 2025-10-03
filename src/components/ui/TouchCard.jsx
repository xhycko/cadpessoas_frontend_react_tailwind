// COMPONENTE NÃO UTILIZADO - Comentado para evitar imports desnecessários
// O projeto usa Card do index.jsx para cards

/*
import React from 'react';
import { cn } from '../../utils/design-system';

/**
 * Card otimizado para dispositivos touch
 * Melhor espaçamento e interações para mobile
 */
const TouchCard = ({ 
  children, 
  className = '',
  variant = 'default',
  padding = 'md',
  interactive = false,
  onClick,
  ...props 
}) => {
  const baseClasses = 'bg-white dark:bg-secondary-800 rounded-xl border border-secondary-200 dark:border-secondary-700 transition-all duration-300';
  
  const variants = {
    default: 'shadow-card',
    elevated: 'shadow-lg',
    flat: 'shadow-none border-2',
    glass: 'glass backdrop-blur-md',
  };
  
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
    xl: 'p-8 sm:p-10',
  };
  
  const interactiveClasses = interactive || onClick ? 
    'cursor-pointer hover:shadow-card-hover hover:-translate-y-1 active:translate-y-0 active:shadow-card touch-manipulation' : '';
  
  const classes = cn(
    baseClasses,
    variants[variant],
    paddings[padding],
    interactiveClasses,
    className
  );
  
  const CardComponent = onClick ? 'button' : 'div';
  
  return (
    <CardComponent
      className={classes}
      onClick={onClick}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

// Subcomponentes para melhor organização
TouchCard.Header = ({ children, className = '', ...props }) => (
  <div 
    className={cn('pb-4 border-b border-secondary-200 dark:border-secondary-700 mb-4', className)}
    {...props}
  >
    {children}
  </div>
);

TouchCard.Body = ({ children, className = '', ...props }) => (
  <div className={cn('', className)} {...props}>
    {children}
  </div>
);

TouchCard.Footer = ({ children, className = '', ...props }) => (
  <div 
    className={cn('pt-4 border-t border-secondary-200 dark:border-secondary-700 mt-4', className)}
    {...props}
  >
    {children}
  </div>
);

TouchCard.Title = ({ children, className = '', level = 2, ...props }) => {
  const Component = `h${level}`;
  const sizeClasses = {
    1: 'text-2xl sm:text-3xl',
    2: 'text-xl sm:text-2xl',
    3: 'text-lg sm:text-xl',
    4: 'text-base sm:text-lg',
    5: 'text-sm sm:text-base',
    6: 'text-xs sm:text-sm',
  };
  
  return (
    <Component 
      className={cn(
        'font-semibold text-secondary-900 dark:text-secondary-100 leading-tight',
        sizeClasses[level],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

TouchCard.Description = ({ children, className = '', ...props }) => (
  <p 
    className={cn('text-secondary-600 dark:text-secondary-400 leading-relaxed', className)}
    {...props}
  >
    {children}
  </p>
);

export default TouchCard;
*/