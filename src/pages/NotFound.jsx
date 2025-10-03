import { Link } from 'react-router-dom';
import { HomeIcon, ArrowLeftIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
    <div className="max-w-md w-full text-center">
      <div className="mb-8">
        <div className="mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6">
          <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500" />
        </div>
        
        <div className="text-6xl font-bold text-primary-400 mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-4">Página não encontrada</h1>
        <p className="text-gray-300 mb-8">A página que você está procurando não existe ou foi movida.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary">
            <HomeIcon className="h-4 w-4 mr-2" />Ir para Início
          </Link>
          <button onClick={() => window.history.back()} className="btn-secondary">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />Voltar
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default NotFound;