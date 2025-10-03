import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  UsersIcon,
  PlusIcon,
  SignalIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import ThemeToggle from '../ui/ThemeToggle';

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  const handleClose = () => setShowMobileMenu(false);
  const handleToggle = () => setShowMobileMenu(!showMobileMenu);

  // Fechar menu ao mudar de rota
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location.pathname]);

  // Prevenir scroll quando menu está aberto
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMobileMenu]);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Início", icon: HomeIcon },
    { path: "/pessoas", label: "Listar Pessoas", icon: UsersIcon },
    { path: "/pessoas/novo", label: "Adicionar Pessoa", icon: PlusIcon },
    { path: "/health", label: "Status da API", icon: SignalIcon },
  ];

  return (
    <>
      {/* Header fixo com melhor responsividade */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-md shadow-sm border-b border-secondary-200 dark:border-secondary-700 transition-colors duration-300">

        <div className="container-app">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo/Brand otimizado para mobile */}
            <Link
              to="/"
              className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 focus-ring rounded-md p-1 -m-1"
            >
              <UsersIcon className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0" />
              <span className="text-lg sm:text-xl font-bold truncate">
                <span className="hidden xs:inline">CRUD de </span>Pessoas
              </span>
            </Link>

            {/* Controles do header */}
            <div className="flex items-center space-x-2">
              {/* Theme toggle */}
              <ThemeToggle variant="button" className="hidden sm:block" />

              {/* Menu hamburger com área de toque maior */}
              <button
                onClick={handleToggle}
                className="p-3 -m-1 rounded-lg text-secondary-600 dark:text-secondary-300 hover:text-secondary-900 dark:hover:text-white hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-all duration-200 focus-ring touch-manipulation"
                aria-label={showMobileMenu ? "Fechar menu" : "Abrir menu"}
                aria-expanded={showMobileMenu}
              >
                {showMobileMenu ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay do menu mobile com animação */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 z-40 backdrop animate-fade-in"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      {/* Menu mobile slide-in otimizado */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white dark:bg-secondary-800 shadow-2xl border-l-2 border-secondary-200 dark:border-secondary-700 transform transition-transform duration-300 ease-smooth ${showMobileMenu ? "translate-x-0" : "translate-x-full"
          }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        {/* Header do menu com melhor espaçamento */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b-2 border-secondary-200 dark:border-secondary-700">
          <h2
            id="mobile-menu-title"
            className="text-lg sm:text-xl font-semibold text-secondary-900 dark:text-white"
          >
            Menu
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg text-secondary-600 dark:text-secondary-300 hover:text-secondary-900 dark:hover:text-white hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-all duration-100 focus-ring"
            aria-label="Fechar menu"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Itens do menu com melhor UX mobile */}
        <nav className="p-4 sm:p-6" role="navigation">
          <ul className="space-y-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <li key={path}>
                <Link
                  to={path}
                  onClick={handleClose}
                  className={`flex items-center space-x-3 px-4 py-4 rounded-xl transition-all duration-200 touch-manipulation ${isActive(path)
                    ? "bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 shadow-sm"
                    : "text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700 hover:text-secondary-900 dark:hover:text-white active:bg-secondary-200 dark:active:bg-secondary-600"
                    }`}
                  aria-current={isActive(path) ? "page" : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium text-base">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer do menu com informações adicionais */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 border-t-2 border-secondary-200 dark:border-secondary-700 bg-secondary-50 dark:bg-secondary-900">
          {/* Theme toggle para mobile */}
          <div className="flex justify-center mb-4 sm:hidden">
            <ThemeToggle variant="dropdown-with-text" />
          </div>

          <div className="text-center">
            <p className="text-sm text-secondary-600 dark:text-secondary-400">
              CRUD de Pessoas
            </p>
            <p className="text-xs text-secondary-500 dark:text-secondary-500 mt-1">
              PWEB 2025.2 - xico@ufersa
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
