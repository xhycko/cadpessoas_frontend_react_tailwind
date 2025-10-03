import React from 'react';
import { cn } from '../../utils/design-system';

/**
 * Componente de texto responsivo otimizado para mobile-first
 * Escalas de tipografia que se adaptam ao tamanho da tela
 */
const ResponsiveText = ({ 
  children, 
  as = 'p',
  variant = 'body',
  className = '',
  ...props 
}) => {
  const Component = as;
  
  const variants = {
    // Títulos principais
    'display-lg': 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-secondary-900 dark:text-secondary-100',
    'display-md': 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-secondary-900 dark:text-secondary-100',
    'display-sm': 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-secondary-900 dark:text-secondary-100',
    
    // Títulos de seção
    'heading-xl': 'text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-900 dark:text-secondary-100',
    'heading-lg': 'text-xl sm:text-2xl md:text-3xl font-bold text-secondary-900 dark:text-secondary-100',
    'heading-md': 'text-lg sm:text-xl md:text-2xl font-semibold text-secondary-900 dark:text-secondary-100',
    'heading-sm': 'text-base sm:text-lg md:text-xl font-semibold text-secondary-900 dark:text-secondary-100',
    'heading-xs': 'text-sm sm:text-base md:text-lg font-semibold text-secondary-900 dark:text-secondary-100',
    
    // Subtítulos
    'subtitle-lg': 'text-lg sm:text-xl font-medium text-secondary-700 dark:text-secondary-300',
    'subtitle-md': 'text-base sm:text-lg font-medium text-secondary-700 dark:text-secondary-300',
    'subtitle-sm': 'text-sm sm:text-base font-medium text-secondary-700 dark:text-secondary-300',
    
    // Texto do corpo
    'body-lg': 'text-base sm:text-lg leading-relaxed text-secondary-700 dark:text-secondary-300',
    'body': 'text-sm sm:text-base leading-relaxed text-secondary-700 dark:text-secondary-300',
    'body-sm': 'text-xs sm:text-sm leading-relaxed text-secondary-600 dark:text-secondary-400',
    
    // Texto de apoio
    'caption': 'text-xs sm:text-sm text-secondary-500 dark:text-secondary-500',
    'overline': 'text-xs sm:text-sm font-medium uppercase tracking-wider text-secondary-500 dark:text-secondary-500',
    
    // Labels e formulários
    'label-lg': 'text-sm sm:text-base font-medium text-secondary-700 dark:text-secondary-300',
    'label': 'text-xs sm:text-sm font-medium text-secondary-700 dark:text-secondary-300',
    'label-sm': 'text-xs font-medium text-secondary-600 dark:text-secondary-400',
    
    // Estados especiais
    'error': 'text-sm sm:text-base text-error-600 dark:text-error-400',
    'success': 'text-sm sm:text-base text-success-600 dark:text-success-400',
    'warning': 'text-sm sm:text-base text-warning-600 dark:text-warning-400',
    'info': 'text-sm sm:text-base text-info-600 dark:text-info-400',
    
    // Texto monoespaçado
    'code': 'text-xs sm:text-sm font-mono bg-secondary-100 dark:bg-secondary-800 px-1.5 py-0.5 rounded text-secondary-800 dark:text-secondary-200',
    'code-block': 'text-sm font-mono bg-secondary-100 dark:bg-secondary-800 p-3 rounded-lg text-secondary-800 dark:text-secondary-200 overflow-x-auto',
  };
  
  const classes = cn(variants[variant], className);
  
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

// Componentes de conveniência
ResponsiveText.Display = ({ size = 'md', ...props }) => (
  <ResponsiveText as="h1" variant={`display-${size}`} {...props} />
);

ResponsiveText.Heading = ({ level = 1, size = 'md', ...props }) => (
  <ResponsiveText as={`h${level}`} variant={`heading-${size}`} {...props} />
);

ResponsiveText.Subtitle = ({ size = 'md', ...props }) => (
  <ResponsiveText as="h2" variant={`subtitle-${size}`} {...props} />
);

ResponsiveText.Body = ({ size = 'md', ...props }) => (
  <ResponsiveText as="p" variant={size === 'md' ? 'body' : `body-${size}`} {...props} />
);

ResponsiveText.Caption = (props) => (
  <ResponsiveText as="span" variant="caption" {...props} />
);

ResponsiveText.Label = ({ size = 'md', ...props }) => (
  <ResponsiveText as="label" variant={size === 'md' ? 'label' : `label-${size}`} {...props} />
);

ResponsiveText.Code = ({ block = false, ...props }) => (
  <ResponsiveText as={block ? 'pre' : 'code'} variant={block ? 'code-block' : 'code'} {...props} />
);

ResponsiveText.Error = (props) => (
  <ResponsiveText as="p" variant="error" {...props} />
);

ResponsiveText.Success = (props) => (
  <ResponsiveText as="p" variant="success" {...props} />
);

ResponsiveText.Warning = (props) => (
  <ResponsiveText as="p" variant="warning" {...props} />
);

ResponsiveText.Info = (props) => (
  <ResponsiveText as="p" variant="info" {...props} />
);

export default ResponsiveText;