import React, { useState } from 'react';
import { 
  SunIcon, 
  MoonIcon, 
  ComputerDesktopIcon,
  ChevronDownIcon 
} from '@heroicons/react/24/outline';
import { useTheme } from '../../contexts/ThemeContext';
import { cn } from '../../utils/design-system';

const ThemeToggle = ({ variant = 'button', className = '' }) => {
  const { theme, toggleTheme, setLightTheme, setDarkTheme, setSystemTheme, isDark } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);

  // Versão simples - apenas toggle
  if (variant === 'button') {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          'p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-secondary-800',
          'bg-secondary-100 dark:bg-secondary-700 hover:bg-secondary-200 dark:hover:bg-secondary-600',
          'text-secondary-700 dark:text-secondary-300 hover:text-secondary-900 dark:hover:text-secondary-100',
          className
        )}
        aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
        title={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      >
        {isDark ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )}
      </button>
    );
  }

  // Versão com dropdown - mais opções
  const themeOptions = [
    {
      key: 'light',
      label: 'Claro',
      icon: SunIcon,
      action: setLightTheme,
    },
    {
      key: 'dark',
      label: 'Escuro',
      icon: MoonIcon,
      action: setDarkTheme,
    },
    {
      key: 'system',
      label: 'Sistema',
      icon: ComputerDesktopIcon,
      action: setSystemTheme,
    },
  ];

  const currentTheme = themeOptions.find(option => {
    if (theme === 'light') return option.key === 'light';
    if (theme === 'dark') return option.key === 'dark';
    return option.key === 'system';
  });

  const CurrentIcon = currentTheme?.icon || SunIcon;

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={cn(
          'flex items-center space-x-2 p-2 rounded-lg transition-all duration-200',
          'bg-secondary-100 dark:bg-secondary-700 hover:bg-secondary-200 dark:hover:bg-secondary-600',
          'text-secondary-700 dark:text-secondary-300 hover:text-secondary-900 dark:hover:text-secondary-100',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-secondary-800'
        )}
        aria-label="Selecionar tema"
        aria-expanded={showDropdown}
        aria-haspopup="true"
      >
        <CurrentIcon className="h-5 w-5" />
        {variant === 'dropdown-with-text' && (
          <>
            <span className="text-sm font-medium">{currentTheme?.label}</span>
            <ChevronDownIcon className={cn(
              'h-4 w-4 transition-transform duration-200',
              showDropdown && 'rotate-180'
            )} />
          </>
        )}
        {variant === 'dropdown' && (
          <ChevronDownIcon className={cn(
            'h-4 w-4 transition-transform duration-200',
            showDropdown && 'rotate-180'
          )} />
        )}
      </button>

      {showDropdown && (
        <>
          {/* Overlay para fechar dropdown */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowDropdown(false)}
          />
          
          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-secondary-800 rounded-lg shadow-lg border border-secondary-200 dark:border-secondary-700 py-1 z-20 animate-fade-in">
            {themeOptions.map(({ key, label, icon: Icon, action }) => (
              <button
                key={key}
                onClick={() => {
                  action();
                  setShowDropdown(false);
                }}
                className={cn(
                  'flex items-center space-x-3 w-full px-4 py-2 text-left text-sm transition-colors duration-150',
                  'hover:bg-secondary-100 dark:hover:bg-secondary-700',
                  'text-secondary-700 dark:text-secondary-300 hover:text-secondary-900 dark:hover:text-secondary-100',
                  currentTheme?.key === key && 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
                {currentTheme?.key === key && (
                  <div className="ml-auto">
                    <div className="h-2 w-2 bg-primary-600 rounded-full" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeToggle;