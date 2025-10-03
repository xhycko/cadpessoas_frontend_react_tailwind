import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline';
import { PessoaService } from '../services/api';
import PersonForm from '../components/forms/PersonForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { useToast } from '../components/common/Toast';
import { PageHeader } from '../components/ui';

const EditPessoa = () => {
  const [pessoa, setPessoa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  useEffect(() => { carregarPessoa(); }, [id]);

  const carregarPessoa = async () => {
    try {
      setLoading(true);
      setError(null);
      const pessoaData = await PessoaService.buscarPessoa(id);
      setPessoa(pessoaData);
    } catch (err) {
      setError(err);
      if (err.status === 404) {
        showError('Pessoa não encontrada');
        navigate('/pessoas');
      } else {
        showError('Erro ao carregar dados da pessoa');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (pessoaData) => {
    try {
      setSaving(true);
      const pessoaAtualizada = await PessoaService.atualizarPessoa(id, pessoaData);
      showSuccess(`${pessoaAtualizada.nome} foi atualizado(a) com sucesso!`);
      navigate('/pessoas');
    } catch (error) {
      showError(error.message || 'Erro ao atualizar pessoa. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="container mx-auto px-4 py-8"><LoadingSpinner size="lg" text="Carregando dados da pessoa..." centered /></div>;

  if (error && !pessoa) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Link to="/pessoas" className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-6">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />Voltar para Lista
        </Link>
        <ErrorMessage error={error} onRetry={carregarPessoa} onDismiss={() => setError(null)} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader 
        title="Editar Pessoa"
        subtitle={pessoa ? `Editando dados de ${pessoa.nome}` : 'Carregando...'}
        icon={PencilIcon}
        backLink={{ component: Link, to: '/pessoas', icon: ArrowLeftIcon, text: 'Voltar' }}
      />
      <div className="max-w-4xl">
        {pessoa && (
          <PersonForm
            pessoa={pessoa}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/pessoas')}
            loading={saving}
            submitText="Salvar Alterações"
            title={`Editando: ${pessoa.nome}`}
          />
        )}
      </div>
    </div>
  );
};

export default EditPessoa;