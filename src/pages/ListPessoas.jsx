import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, ArrowPathIcon, UsersIcon } from '@heroicons/react/24/outline';
import { PessoaService } from '../services/api';
import PersonTable from '../components/forms/PersonTable';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { useToast } from '../components/common/Toast';
import { PageHeader, EmptyState } from '../components/ui';

const ListPessoas = () => {
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ show: false, pessoa: null });
  const [deletingId, setDeletingId] = useState(null);
  const { showSuccess, showError } = useToast();

  useEffect(() => { carregarPessoas(); }, []);

  const carregarPessoas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await PessoaService.listarPessoas();
      setPessoas(data);
    } catch (err) {
      setError(err);
      showError('Erro ao carregar lista de pessoas');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (pessoa) => setDeleteDialog({ show: true, pessoa });

  const handleDeleteConfirm = async () => {
    const { pessoa } = deleteDialog;
    try {
      setDeletingId(pessoa.id);
      await PessoaService.removerPessoa(pessoa.id);
      setPessoas(prev => prev.filter(p => p.id !== pessoa.id));
      showSuccess(`${pessoa.nome} foi removido(a) com sucesso`);
      setDeleteDialog({ show: false, pessoa: null });
    } catch (err) {
      showError(`Erro ao remover ${pessoa.nome}`);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <div className="container mx-auto px-4 py-8"><LoadingSpinner size="lg" text="Carregando pessoas..." centered /></div>;

  const actions = [
    <button key="refresh" onClick={carregarPessoas} disabled={loading} className="btn-secondary">
      <ArrowPathIcon className="h-4 w-4 mr-2" />Atualizar
    </button>,
    <Link key="add" to="/pessoas/novo" className="btn-primary">
      <PlusIcon className="h-4 w-4 mr-2" />Adicionar Pessoa
    </Link>
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader 
        title="Pessoas Cadastradas" 
        subtitle={pessoas.length === 0 ? 'Nenhuma pessoa cadastrada' : `${pessoas.length} pessoa${pessoas.length !== 1 ? 's' : ''} encontrada${pessoas.length !== 1 ? 's' : ''}`}
        icon={UsersIcon}
        actions={actions}
      />

      {error && <div className="mb-6"><ErrorMessage error={error} onRetry={carregarPessoas} onDismiss={() => setError(null)} /></div>}

      {pessoas.length === 0 ? (
        <EmptyState 
          icon={UsersIcon}
          title="Nenhuma pessoa cadastrada"
          description="Comece adicionando a primeira pessoa ao sistema."
          action={
            <Link to="/pessoas/novo" className="btn-primary text-base px-6 py-3">
              <PlusIcon className="h-5 w-5 mr-2" />Adicionar Primeira Pessoa
            </Link>
          }
        />
      ) : (
        <PersonTable 
          pessoas={pessoas} 
          onDelete={handleDeleteClick} 
          deletingId={deletingId} 
        />
      )}

      <ConfirmDialog
        show={deleteDialog.show}
        onHide={() => setDeleteDialog({ show: false, pessoa: null })}
        onConfirm={handleDeleteConfirm}
        title="Confirmar Exclusão"
        message={deleteDialog.pessoa ? `Tem certeza que deseja excluir "${deleteDialog.pessoa.nome}"? Esta ação não pode ser desfeita.` : ''}
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
        loading={deletingId !== null}
      />
    </div>
  );
};

export default ListPessoas;