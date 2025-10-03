import { Link } from 'react-router-dom';
import { 
  PencilIcon, 
  TrashIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  CalendarIcon 
} from '@heroicons/react/24/outline';
import { formatarData, gerarIniciais } from '../../utils/formatters';

const PersonTable = ({ pessoas, onDelete, deletingId }) => {
  const handleDelete = (pessoa) => {
    if (onDelete) {
      onDelete(pessoa);
    }
  };

  const getGeneroBadgeClasses = (genero) => {
    const baseClasses = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium";
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

  if (pessoas.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-200 dark:divide-secondary-700">
            <thead className="bg-secondary-50 dark:bg-secondary-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                  Pessoa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                  Contato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                  Gênero
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                  Nascimento
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-secondary-800 divide-y divide-secondary-200 dark:divide-secondary-700">
              {pessoas.map((pessoa) => {
                const isLoading = deletingId === pessoa.id;
                return (
                  <tr 
                    key={pessoa.id} 
                    className={`hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors ${
                      isLoading ? 'opacity-75' : ''
                    }`}
                  >
                    {/* Pessoa */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="relative flex-shrink-0 mr-4">
                          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                              {gerarIniciais(pessoa.nome)}
                            </span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 text-sm">
                            {getGeneroIcon(pessoa.genero)}
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-secondary-900 dark:text-white truncate">
                            {pessoa.nome}
                          </div>
                          {pessoa.id && (
                            <div className="text-xs text-secondary-500 dark:text-secondary-400">
                              ID: {pessoa.id}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Contato */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-secondary-900 dark:text-white">
                          <EnvelopeIcon className="h-4 w-4 mr-2 text-secondary-400" />
                          <span className="truncate max-w-48" title={pessoa.email}>
                            {pessoa.email}
                          </span>
                        </div>
                        {pessoa.telefone && (
                          <div className="flex items-center text-sm text-secondary-600 dark:text-secondary-300">
                            <PhoneIcon className="h-4 w-4 mr-2 text-secondary-400" />
                            <span>{pessoa.telefone}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Gênero */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getGeneroBadgeClasses(pessoa.genero)}>
                        {pessoa.genero}
                      </span>
                    </td>

                    {/* Data Nascimento */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-secondary-900 dark:text-white">
                        <CalendarIcon className="h-4 w-4 mr-2 text-secondary-400" />
                        {formatarData(pessoa.dataNascimento)}
                      </div>
                    </td>

                    {/* Ações */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/pessoas/${pessoa.id}/editar`}
                          className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                            isLoading 
                              ? 'opacity-50 cursor-not-allowed' 
                              : 'text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/40'
                          }`}
                        >
                          <PencilIcon className="h-3 w-3 mr-1" />
                          Editar
                        </Link>

                        <button
                          onClick={() => handleDelete(pessoa)}
                          disabled={isLoading}
                          className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                            isLoading 
                              ? 'opacity-50 cursor-not-allowed' 
                              : 'text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40'
                          }`}
                        >
                          {isLoading ? (
                            <div className="animate-spin rounded-full h-3 w-3 border border-red-600 border-t-transparent mr-1" />
                          ) : (
                            <TrashIcon className="h-3 w-3 mr-1" />
                          )}
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {pessoas.map((pessoa) => {
          const isLoading = deletingId === pessoa.id;
          return (
            <div 
              key={pessoa.id} 
              className={`card ${isLoading ? 'opacity-75' : ''}`}
            >
              <div className="card-body p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                          {gerarIniciais(pessoa.nome)}
                        </span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 text-sm">
                        {getGeneroIcon(pessoa.genero)}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold text-secondary-900 dark:text-white truncate">
                        {pessoa.nome}
                      </h3>
                      <span className={getGeneroBadgeClasses(pessoa.genero)}>
                        {pessoa.genero}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-secondary-600 dark:text-secondary-300">
                    <EnvelopeIcon className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate" title={pessoa.email}>
                      {pessoa.email}
                    </span>
                  </div>

                  {pessoa.telefone && (
                    <div className="flex items-center space-x-2 text-sm text-secondary-600 dark:text-secondary-300">
                      <PhoneIcon className="h-4 w-4 flex-shrink-0" />
                      <span>{pessoa.telefone}</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-2 text-sm text-secondary-600 dark:text-secondary-300">
                    <CalendarIcon className="h-4 w-4 flex-shrink-0" />
                    <span>{formatarData(pessoa.dataNascimento)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2 pt-3 border-t border-secondary-200 dark:border-secondary-700">
                  <Link
                    to={`/pessoas/${pessoa.id}/editar`}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isLoading 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/40'
                    }`}
                  >
                    <PencilIcon className="h-4 w-4 mr-1" />
                    Editar
                  </Link>

                  <button
                    onClick={() => handleDelete(pessoa)}
                    disabled={isLoading}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isLoading 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40'
                    }`}
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-600 border-t-transparent mr-1" />
                    ) : (
                      <TrashIcon className="h-4 w-4 mr-1" />
                    )}
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PersonTable;