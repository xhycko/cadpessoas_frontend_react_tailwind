import { CodeBracketIcon, HeartIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-secondary-800 border-t border-secondary-200 dark:border-secondary-700 mt-auto transition-colors duration-300">
      <div className="container-app py-4 sm:py-6">
        {/* Layout mobile-first otimizado */}
        <div className="flex flex-col items-center justify-center space-y-3 sm:flex-row sm:justify-between sm:space-y-0">
          
          {/* Branding com ícone */}
          <div className="flex items-center space-x-2 text-secondary-600 dark:text-secondary-400">
            <CodeBracketIcon className="h-5 w-5 flex-shrink-0" />
            <span className="font-medium text-sm sm:text-base">PWEB 2025.2</span>
          </div>
          
          {/* Informações do desenvolvedor */}
          <div className="flex flex-col items-center space-y-1 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3 text-xs sm:text-sm text-secondary-500 dark:text-secondary-400">
            <div className="flex items-center space-x-2">
              <span>xico@ufersa</span>
            </div>
            
            <div className="hidden sm:block text-secondary-300 dark:text-secondary-600">•</div>
            
            <span className="font-medium">2025</span>
          </div>
        </div>
        
        {/* Linha adicional para mobile com informações técnicas */}
        <div className="mt-3 pt-3 border-t border-secondary-200 dark:border-secondary-700 sm:hidden">
          <div className="text-center">
            <p className="text-xs text-secondary-400 dark:text-secondary-500">
              React + Tailwind CSS + Vite
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
