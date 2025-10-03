import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PencilIcon, 
  TrashIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  CalendarIcon, 
  UserIcon 
} from '@heroicons/react/24/outline';
import { formatarData, gerarIniciais } from '../../utils/formatters';

const PersonCard = ({ pessoa, onDelete, loading = false }) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(pessoa);
    }
  };

  const getGeneroBadgeClasses = (genero) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (genero) {
      case 'Masculino':
        return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`;
      case 'Feminino':
        return `${baseClasses} bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200`;
      case 'Não Informado':
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`;
    }
  };

  const getGeneroIcon = (genero) => {
    switch (genero) {
      case 'Masculino':
        return '👨';
      case 'Feminino':
        return '👩';
      case 'Não Informado':
      default:
        return '👤';
    }
  };

  return (
    <div className={`card relative ${loading ? 'opacity-75' : ''}`}>
      <div className="card-body">
        {/* Header com avatar e nome */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                {gerarIniciais(pessoa.nome)}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 text-lg">
              {getGeneroIcon(pessoa.genero)}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {pessoa.nome}
            </h3>
            <div className="mt-1">
              <span className={getGeneroBadgeClasses(pessoa.genero)}>
                {pessoa.genero}
              </span>
            </div>
          </div>
        </div>

        {/* Detalhes da pessoa */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <EnvelopeIcon className="h-4 w-4 flex-shrink-0" />
            <span className="truncate" title={pessoa.email}>
              {pessoa.email}
            </span>
          </div>

          {pessoa.telefone && (
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <PhoneIcon className="h-4 w-4 flex-shrink-0" />
              <span>{pessoa.telefone}</span>
            </div>
          )}

          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <CalendarIcon className="h-4 w-4 flex-shrink-0" />
            <span>{formatarData(pessoa.dataNascimento)}</span>
          </div>

          {pessoa.id && (
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <UserIcon className="h-4 w-4 flex-shrink-0" />
              <span>ID: {pessoa.id}</span>
            </div>
          )}
        </div>

        {/* Ações */}
        <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            to={`/pessoas/${pessoa.id}/editar`}
            className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              loading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/40'
            }`}
          >
            <PencilIcon className="h-4 w-4 mr-1" />
            Editar
          </Link>

          <button
            onClick={handleDelete}
            disabled={loading}
            className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              loading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40'
            }`}
          >
            <TrashIcon className="h-4 w-4 mr-1" />
            Excluir
          </button>
        </div>
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 rounded-lg flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary-600 border-t-transparent" />
        </div>
      )}
    </div>
  );
};

export default PersonCard;