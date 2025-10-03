// Design System - Constantes e Utilitários TypeScript

// Paleta de cores do sistema
export const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  info: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
    950: '#083344',
  },
} as const;

// Tamanhos de espaçamento
export const spacing = {
  xs: '0.5rem',    // 8px
  sm: '0.75rem',   // 12px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px
  '5xl': '8rem',   // 128px
} as const;

// Tamanhos de fonte
export const fontSize = {
  xs: '0.75rem',     // 12px
  sm: '0.875rem',    // 14px
  base: '1rem',      // 16px
  lg: '1.125rem',    // 18px
  xl: '1.25rem',     // 20px
  '2xl': '1.5rem',   // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px
  '6xl': '3.75rem',  // 60px
} as const;

// Breakpoints responsivos
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Durações de animação
export const duration = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  slower: '750ms',
} as const;

// Curvas de animação
export const easing = {
  linear: 'linear',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// Sombras
export const shadows = {
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  card: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  cardHover: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
} as const;

// Border radius
export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const;

// Tipos para TypeScript
export type ColorScale = keyof typeof colors.primary;
export type ColorName = keyof typeof colors;
export type SpacingSize = keyof typeof spacing;
export type FontSize = keyof typeof fontSize;
export type Breakpoint = keyof typeof breakpoints;
export type Duration = keyof typeof duration;
export type Easing = keyof typeof easing;
export type Shadow = keyof typeof shadows;
export type BorderRadius = keyof typeof borderRadius;

// Utilitários para classes CSS
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Utilitário para obter cor com escala
export const getColor = (colorName: ColorName, scale: ColorScale): string => {
  return colors[colorName][scale];
};

// Utilitário para gerar classes de cor Tailwind
export const getColorClass = (
  colorName: ColorName,
  scale: ColorScale,
  type: 'bg' | 'text' | 'border' | 'ring' = 'bg'
): string => {
  return `${type}-${colorName}-${scale}`;
};

// Utilitário para classes responsivas
export const responsive = (
  base: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string,
  xxl?: string
): string => {
  const classes = [base];
  
  if (sm) classes.push(`sm:${sm}`);
  if (md) classes.push(`md:${md}`);
  if (lg) classes.push(`lg:${lg}`);
  if (xl) classes.push(`xl:${xl}`);
  if (xxl) classes.push(`2xl:${xxl}`);
  
  return classes.join(' ');
};

// Utilitário para estados de hover/focus
export const interactive = (
  base: string,
  hover?: string,
  focus?: string,
  active?: string
): string => {
  const classes = [base];
  
  if (hover) classes.push(`hover:${hover}`);
  if (focus) classes.push(`focus:${focus}`);
  if (active) classes.push(`active:${active}`);
  
  return classes.join(' ');
};

// Utilitário para modo escuro
export const darkMode = (light: string, dark: string): string => {
  return `${light} dark:${dark}`;
};

// Classes base para componentes
export const buttonClasses = {
  base: 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  sizes: {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  },
  variants: {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 active:bg-primary-800',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500 active:bg-secondary-800',
    success: 'bg-success-600 text-white hover:bg-success-700 focus:ring-success-500 active:bg-success-800',
    error: 'bg-error-600 text-white hover:bg-error-700 focus:ring-error-500 active:bg-error-800',
    warning: 'bg-warning-600 text-white hover:bg-warning-700 focus:ring-warning-500 active:bg-warning-800',
    ghost: 'bg-transparent hover:bg-secondary-100 dark:hover:bg-secondary-800 text-secondary-700 dark:text-secondary-300',
  },
};

export const inputClasses = {
  base: 'block w-full px-3 py-2 border rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
  variants: {
    default: 'border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 placeholder-secondary-400 dark:placeholder-secondary-500',
    error: 'border-error-300 dark:border-error-600 focus:ring-error-500 focus:border-error-500',
    success: 'border-success-300 dark:border-success-600 focus:ring-success-500 focus:border-success-500',
  },
};

export const cardClasses = {
  base: 'bg-white dark:bg-secondary-800 rounded-lg shadow-card border border-secondary-200 dark:border-secondary-700',
  variants: {
    default: '',
    hover: 'transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1',
    interactive: 'transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 cursor-pointer',
  },
};

// Funções utilitárias para gerar classes
export const getButtonClasses = (variant: keyof typeof buttonClasses.variants = 'primary', size: keyof typeof buttonClasses.sizes = 'md'): string => {
  return cn(buttonClasses.base, buttonClasses.variants[variant], buttonClasses.sizes[size]);
};

export const getInputClasses = (variant: keyof typeof inputClasses.variants = 'default'): string => {
  return cn(inputClasses.base, inputClasses.variants[variant]);
};

export const getCardClasses = (variant: keyof typeof cardClasses.variants = 'default'): string => {
  return cn(cardClasses.base, cardClasses.variants[variant]);
};

// Constantes para ícones e avatars
export const avatarColors = [
  'bg-primary-500',
  'bg-success-500',
  'bg-warning-500',
  'bg-error-500',
  'bg-info-500',
  'bg-secondary-500',
] as const;

// Função para obter cor de avatar baseada em string
export const getAvatarColor = (str: string): string => {
  const index = str.length % avatarColors.length;
  return avatarColors[index];
};

// Função para obter iniciais de nome
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Constantes para validação de formulário
export const formValidation = {
  required: 'Este campo é obrigatório',
  email: 'Digite um email válido',
  minLength: (min: number) => `Mínimo de ${min} caracteres`,
  maxLength: (max: number) => `Máximo de ${max} caracteres`,
  phone: 'Digite um telefone válido no formato (XX) XXXXX-XXXX',
} as const;

// Função para formatar telefone
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  
  return phone;
};

// Função para validar email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Função para validar telefone brasileiro
export const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 11;
};