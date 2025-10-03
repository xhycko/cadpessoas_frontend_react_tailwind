import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { PessoaService } from '../services/api';
import PersonForm from '../components/forms/PersonForm';
import { useToast } from '../components/common/Toast';
import { PageHeader } from '../components/ui';

const AddPessoa = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (pessoaData) => {
    try {
      setLoading(true);
      const novaPessoa = await PessoaService.criarPessoa(pessoaData);
      showSuccess(`${novaPessoa.nome} foi adicionado(a) com sucesso!`);
      navigate('/pessoas');
    } catch (error) {
      showError(error.message || 'Erro ao adicionar pessoa. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader 
        title="Adicionar Pessoa"
        subtitle="Preencha os dados para cadastrar"
        icon={UserPlusIcon}
        backLink={{ component: Link, to: '/pessoas', icon: ArrowLeftIcon, text: 'Voltar' }}
      />
      <div className="max-w-4xl">
        <PersonForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/pessoas')}
          loading={loading}
          submitText="Adicionar"
          title="Dados da Pessoa"
        />
      </div>
    </div>
  );
};

export default AddPessoa;