import axios from "axios";

// Função para detectar o IP correto automaticamente
const getApiBaseUrl = () => {
  // Se há variável de ambiente, usa ela
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // Se está acessando via IP (não localhost), usa o mesmo IP para a API
  const currentHost = window.location.hostname;
  if (currentHost !== 'localhost' && currentHost !== '127.0.0.1') {
    return `http://${currentHost}:8080/api`;
  }
  
  // Fallback para localhost
  return "http://localhost:8080/api";
};

// Configuração base do axios
const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Erro da API (4xx, 5xx)
      const apiError = new Error(
        error.response.data?.message ||
          `Erro ${error.response.status}: ${error.response.statusText}`
      );
      apiError.status = error.response.status;
      apiError.data = error.response.data;
      throw apiError;
    } else if (error.request) {
      // Erro de rede
      const apiUrl = getApiBaseUrl().replace('/api', '');
      const networkError = new Error(
        `Erro de conexão. Verifique se a API está rodando em ${apiUrl}`
      );
      networkError.status = 0;
      throw networkError;
    } else {
      // Erro genérico
      throw new Error("Erro inesperado. Tente novamente.");
    }
  }
);

/**
 * Serviço para operações CRUD de pessoas
 */
export class PessoaService {
  /**
   * Lista todas as pessoas
   * @returns {Promise<Array>} Lista de pessoas
   */
  static async listarPessoas() {
    try {
      const response = await api.get("/pessoas");
      return response.data;
    } catch (error) {
      console.error("Erro ao listar pessoas:", error);
      throw error;
    }
  }

  /**
   * Busca uma pessoa por ID
   * @param {number} id - ID da pessoa
   * @returns {Promise<Object>} Dados da pessoa
   */
  static async buscarPessoa(id) {
    try {
      const response = await api.get(`/pessoas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar pessoa ${id}:`, error);
      throw error;
    }
  }

  /**
   * Cria uma nova pessoa
   * @param {Object} pessoa - Dados da pessoa
   * @returns {Promise<Object>} Pessoa criada
   */
  static async criarPessoa(pessoa) {
    try {
      const response = await api.post("/pessoas", pessoa);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar pessoa:", error);
      throw error;
    }
  }

  /**
   * Atualiza uma pessoa existente
   * @param {number} id - ID da pessoa
   * @param {Object} pessoa - Dados atualizados da pessoa
   * @returns {Promise<Object>} Pessoa atualizada
   */
  static async atualizarPessoa(id, pessoa) {
    try {
      const response = await api.put(`/pessoas/${id}`, pessoa);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar pessoa ${id}:`, error);
      throw error;
    }
  }

  /**
   * Remove uma pessoa
   * @param {number} id - ID da pessoa
   * @returns {Promise<void>}
   */
  static async removerPessoa(id) {
    try {
      await api.delete(`/pessoas/${id}`);
    } catch (error) {
      console.error(`Erro ao remover pessoa ${id}:`, error);
      throw error;
    }
  }

  /**
   * Verifica o status da API
   * @returns {Promise<Object>} Status da API
   */
  static async verificarHealth() {
    try {
      const response = await api.get("/health");
      return response.data;
    } catch (error) {
      console.error("Erro ao verificar health da API:", error);
      throw error;
    }
  }
}

export default PessoaService;
