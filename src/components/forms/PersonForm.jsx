import { useState, useEffect } from 'react';
import { 
  CheckIcon, 
  XMarkIcon, 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  CalendarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { GENEROS_OPCOES, criarPessoaVazia } from '../../models/Pessoa';
import { validarPessoa } from '../../utils/validation';
import { aplicarMascaraTelefone } from '../../utils/formatters';

const PersonForm = ({ 
  pessoa = null, 
  onSubmit, 
  onCancel, 
  loading = false,
  submitText = 'Salvar',
  title = 'Formulário de Pessoa'
}) => {
  const [formData, setFormData] = useState(pessoa || criarPessoaVazia());
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Atualiza o formulário quando a pessoa muda (útil para edição)
  useEffect(() => {
    if (pessoa) {
      setFormData(pessoa);
    }
  }, [pessoa]);

  // Valida o formulário em tempo real
  useEffect(() => {
    const newErrors = validarPessoa(formData);
    setErrors(newErrors);
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Marca o campo como tocado
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handleTelefoneChange = (e) => {
    const value = e.target.value;
    const maskedValue = aplicarMascaraTelefone(value);
    handleInputChange('telefone', maskedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Marca todos os campos como tocados
    const allFields = ['nome', 'email', 'telefone', 'genero', 'dataNascimento'];
    const newTouched = {};
    allFields.forEach(field => {
      newTouched[field] = true;
    });
    setTouched(newTouched);

    // Verifica se há erros
    const formErrors = validarPessoa(formData);
    if (Object.keys(formErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const getFieldError = (field) => {
    return touched[field] && errors[field] ? errors[field] : null;
  };

  const isFieldInvalid = (field) => {
    return touched[field] && errors[field];
  };

  const isFormValid = () => {
    return Object.keys(errors).length === 0 && 
           formData.nome && 
           formData.email && 
           formData.genero && 
           formData.dataNascimento;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header do formulário */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg mb-3">
          <UserIcon className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-1">
          {title}
        </h2>
        <p className="text-sm text-secondary-600 dark:text-secondary-400">
          Preencha os campos abaixo
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Card do formulário */}
        <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg border border-secondary-200 dark:border-secondary-700 overflow-hidden">
          <div className="p-6 space-y-4">
            
            {/* Grid 2 colunas para todos os campos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nome */}
              <div className="space-y-1">
                <label className="flex items-center text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
                  <div className="flex items-center justify-center w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-lg mr-2">
                    <UserIcon className="h-3 w-3 text-primary-600 dark:text-primary-400" />
                  </div>
                  Nome completo
                  <span className="text-error-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    onBlur={() => setTouched(prev => ({ ...prev, nome: true }))}
                    placeholder="Digite o nome completo"
                    disabled={loading}
                    className={`w-full px-3 py-3 text-sm border-2 rounded-lg transition-all duration-200 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-secondary-100 placeholder-secondary-400 dark:placeholder-secondary-500 focus:outline-none focus:ring-2 ${
                      isFieldInvalid('nome') 
                        ? 'border-error-300 dark:border-error-600 focus:border-error-500 focus:ring-error-500/20' 
                        : 'border-secondary-200 dark:border-secondary-600 focus:border-primary-500 focus:ring-primary-500/20 hover:border-secondary-300 dark:hover:border-secondary-500'
                    }`}
                  />
                  {formData.nome && !isFieldInvalid('nome') && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <CheckIcon className="h-4 w-4 text-success-500" />
                    </div>
                  )}
                </div>
                {getFieldError('nome') && (
                  <div className="flex items-center mt-1 text-xs text-error-600 dark:text-error-400">
                    <ExclamationTriangleIcon className="h-3 w-3 mr-1 flex-shrink-0" />
                    {getFieldError('nome')}
                  </div>
                )}
              </div>
              {/* Email */}
              <div className="space-y-1">
                <label className="flex items-center text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
                  <div className="flex items-center justify-center w-6 h-6 bg-info-100 dark:bg-info-900/30 rounded-lg mr-2">
                    <EnvelopeIcon className="h-3 w-3 text-info-600 dark:text-info-400" />
                  </div>
                  Email
                  <span className="text-error-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                    placeholder="exemplo@email.com"
                    disabled={loading}
                    className={`w-full px-3 py-3 text-sm border-2 rounded-lg transition-all duration-200 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-secondary-100 placeholder-secondary-400 dark:placeholder-secondary-500 focus:outline-none focus:ring-2 ${
                      isFieldInvalid('email') 
                        ? 'border-error-300 dark:border-error-600 focus:border-error-500 focus:ring-error-500/20' 
                        : 'border-secondary-200 dark:border-secondary-600 focus:border-primary-500 focus:ring-primary-500/20 hover:border-secondary-300 dark:hover:border-secondary-500'
                    }`}
                  />
                  {formData.email && !isFieldInvalid('email') && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <CheckIcon className="h-4 w-4 text-success-500" />
                    </div>
                  )}
                </div>
                {getFieldError('email') && (
                  <div className="flex items-center mt-1 text-xs text-error-600 dark:text-error-400">
                    <ExclamationTriangleIcon className="h-3 w-3 mr-1 flex-shrink-0" />
                    {getFieldError('email')}
                  </div>
                )}
              </div>

              {/* Telefone */}
              <div className="space-y-1">
                <label className="flex items-center text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
                  <div className="flex items-center justify-center w-6 h-6 bg-success-100 dark:bg-success-900/30 rounded-lg mr-2">
                    <PhoneIcon className="h-3 w-3 text-success-600 dark:text-success-400" />
                  </div>
                  Telefone
                  <span className="text-secondary-400 text-xs ml-2">(opcional)</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={formData.telefone}
                    onChange={handleTelefoneChange}
                    onBlur={() => setTouched(prev => ({ ...prev, telefone: true }))}
                    placeholder="(11) 99999-9999"
                    disabled={loading}
                    className={`w-full px-3 py-3 text-sm border-2 rounded-lg transition-all duration-200 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-secondary-100 placeholder-secondary-400 dark:placeholder-secondary-500 focus:outline-none focus:ring-2 ${
                      isFieldInvalid('telefone') 
                        ? 'border-error-300 dark:border-error-600 focus:border-error-500 focus:ring-error-500/20' 
                        : 'border-secondary-200 dark:border-secondary-600 focus:border-primary-500 focus:ring-primary-500/20 hover:border-secondary-300 dark:hover:border-secondary-500'
                    }`}
                  />
                  {formData.telefone && !isFieldInvalid('telefone') && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <CheckIcon className="h-4 w-4 text-success-500" />
                    </div>
                  )}
                </div>
                {getFieldError('telefone') ? (
                  <div className="flex items-center mt-1 text-xs text-error-600 dark:text-error-400">
                    <ExclamationTriangleIcon className="h-3 w-3 mr-1 flex-shrink-0" />
                    {getFieldError('telefone')}
                  </div>
                ) : (
                  <p className="mt-1 text-xs text-secondary-500 dark:text-secondary-400">
                    Formato: (XX) XXXXX-XXXX
                  </p>
                )}
              </div>

              {/* Gênero */}
              <div className="space-y-1">
                <label className="flex items-center text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
                  <div className="flex items-center justify-center w-6 h-6 bg-warning-100 dark:bg-warning-900/30 rounded-lg mr-2">
                    <UserIcon className="h-3 w-3 text-warning-600 dark:text-warning-400" />
                  </div>
                  Gênero
                  <span className="text-error-500 ml-1">*</span>
                </label>
                <div className="space-y-2">
                  {GENEROS_OPCOES.map((opcao) => (
                    <label key={opcao.value} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      formData.genero === opcao.value
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-secondary-200 dark:border-secondary-600 hover:border-secondary-300 dark:hover:border-secondary-500 bg-white dark:bg-secondary-900'
                    }`}>
                      <input
                        type="radio"
                        name="genero"
                        value={opcao.value}
                        checked={formData.genero === opcao.value}
                        onChange={(e) => handleInputChange('genero', e.target.value)}
                        onBlur={() => setTouched(prev => ({ ...prev, genero: true }))}
                        disabled={loading}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center transition-all duration-200 ${
                        formData.genero === opcao.value
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-secondary-300 dark:border-secondary-600'
                      }`}>
                        {formData.genero === opcao.value && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span className={`text-sm font-medium ${
                        formData.genero === opcao.value
                          ? 'text-primary-700 dark:text-primary-300'
                          : 'text-secondary-700 dark:text-secondary-300'
                      }`}>
                        {opcao.label}
                      </span>
                    </label>
                  ))}
                </div>
                {getFieldError('genero') && (
                  <div className="flex items-center mt-1 text-xs text-error-600 dark:text-error-400">
                    <ExclamationTriangleIcon className="h-3 w-3 mr-1 flex-shrink-0" />
                    {getFieldError('genero')}
                  </div>
                )}
              </div>

              {/* Data de Nascimento */}
              <div className="space-y-1">
                <label className="flex items-center text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
                  <div className="flex items-center justify-center w-6 h-6 bg-info-100 dark:bg-info-900/30 rounded-lg mr-2">
                    <CalendarIcon className="h-3 w-3 text-info-600 dark:text-info-400" />
                  </div>
                  Data de Nascimento
                  <span className="text-error-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.dataNascimento}
                    onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                    onBlur={() => setTouched(prev => ({ ...prev, dataNascimento: true }))}
                    disabled={loading}
                    max={new Date().toISOString().split('T')[0]}
                    className={`w-full px-3 py-3 text-sm border-2 rounded-lg transition-all duration-200 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 ${
                      isFieldInvalid('dataNascimento') 
                        ? 'border-error-300 dark:border-error-600 focus:border-error-500 focus:ring-error-500/20' 
                        : 'border-secondary-200 dark:border-secondary-600 focus:border-primary-500 focus:ring-primary-500/20 hover:border-secondary-300 dark:hover:border-secondary-500'
                    }`}
                  />
                  {formData.dataNascimento && !isFieldInvalid('dataNascimento') && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <CheckIcon className="h-4 w-4 text-success-500" />
                    </div>
                  )}
                </div>
                {getFieldError('dataNascimento') && (
                  <div className="flex items-center mt-1 text-xs text-error-600 dark:text-error-400">
                    <ExclamationTriangleIcon className="h-3 w-3 mr-1 flex-shrink-0" />
                    {getFieldError('dataNascimento')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Resumo de erros */}
        {Object.keys(errors).length > 0 && Object.keys(touched).length > 0 && (
          <div className="bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex items-center justify-center w-8 h-8 bg-error-100 dark:bg-error-900/30 rounded-lg mr-3 flex-shrink-0">
                <ExclamationTriangleIcon className="h-4 w-4 text-error-600 dark:text-error-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-error-800 dark:text-error-200 mb-2">
                  Corrija os seguintes campos:
                </h3>
                <div className="space-y-1">
                  {Object.entries(errors).map(([field, error]) => (
                    touched[field] && (
                      <div key={field} className="flex items-center text-xs text-error-700 dark:text-error-300 bg-white/50 dark:bg-secondary-800/50 rounded px-2 py-1">
                        <div className="w-1.5 h-1.5 bg-error-500 rounded-full mr-2 flex-shrink-0"></div>
                        {error}
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ações do formulário */}
        <div className="bg-secondary-50 dark:bg-secondary-800/50 rounded-lg p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-3">
            {/* Indicador de progresso */}
            <div className="flex items-center text-xs text-secondary-600 dark:text-secondary-400">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isFormValid() ? 'bg-success-500' : 'bg-secondary-300 dark:bg-secondary-600'}`}></div>
                <span className="font-medium">
                  {isFormValid() ? 'Formulário válido' : 'Preencha os campos obrigatórios'}
                </span>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-secondary-700 dark:text-secondary-300 bg-white dark:bg-secondary-700 border border-secondary-200 dark:border-secondary-600 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-secondary-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <XMarkIcon className="h-3 w-3 mr-1" />
                Cancelar
              </button>

              <button
                type="submit"
                disabled={loading || !isFormValid()}
                className={`inline-flex items-center px-6 py-2 text-sm font-semibold text-white rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isFormValid() && !loading
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:ring-primary-500/20 shadow-md hover:shadow-lg'
                    : 'bg-secondary-400 dark:bg-secondary-600 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent mr-1" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <CheckIcon className="h-3 w-3 mr-1" />
                    {submitText}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;