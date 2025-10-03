import { useState, useEffect, useCallback } from "react";
import SignalIcon from '@heroicons/react/24/outline/SignalIcon';
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import ServerIcon from '@heroicons/react/24/outline/ServerIcon';
import ClockIcon from '@heroicons/react/24/outline/ClockIcon';
import CheckIcon from '@heroicons/react/24/outline/CheckIcon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import PlayIcon from '@heroicons/react/24/outline/PlayIcon';
import PauseIcon from '@heroicons/react/24/outline/PauseIcon';
import { PessoaService } from "../services/api";
import { Badge, Card, PageHeader, Alert } from "../components/ui";

const HealthCheck = () => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastCheck, setLastCheck] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const verificarHealth = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const startTime = Date.now();
      const data = await PessoaService.verificarHealth();
      const responseTime = Date.now() - startTime;
      setHealthData({
        ...data,
        responseTime,
        timestamp: new Date().toISOString(),
      });
      setLastCheck(new Date());
    } catch (err) {
      setError(err);
      setHealthData(null);
      setLastCheck(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    verificarHealth();
  }, [verificarHealth]);
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(verificarHealth, 30000);
    return () => clearInterval(interval);
  }, [autoRefresh, verificarHealth]);

  const getStatusVariant = () =>
    error ? "danger" : healthData ? "success" : "default";
  const getStatusText = () =>
    error ? "Offline" : healthData ? "Online" : "Verificando...";
  const getResponseTimeVariant = (time) =>
    time < 200 ? "success" : time < 500 ? "warning" : "danger";
  const formatTimestamp = (timestamp) =>
    timestamp ? new Date(timestamp).toLocaleString("pt-BR") : "Nunca";
  const formatLastCheck = (date) => {
    if (!date) return "Nunca";
    const diff = Math.floor((new Date() - date) / 1000);
    if (diff < 60) return `${diff} segundos atrás`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutos atrás`;
    return date.toLocaleString("pt-BR");
  };

  const actions = [
    <button
      key="auto"
      onClick={() => setAutoRefresh(!autoRefresh)}
      className={autoRefresh ? "btn-primary" : "btn-secondary"}
    >
      {autoRefresh ? (
        <PauseIcon className="h-4 w-4 mr-2" />
      ) : (
        <PlayIcon className="h-4 w-4 mr-2" />
      )}
      Auto-refresh {autoRefresh ? "ON" : "OFF"}
    </button>,
    <button
      key="refresh"
      onClick={verificarHealth}
      disabled={loading}
      className="btn-secondary"
    >
      <ArrowPathIcon
        className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
      />
      Atualizar
    </button>,
  ];

  return (
    <div className="container mx-auto px-4 py-4">
      <PageHeader
        title="Status da API"
        subtitle="Monitoramento da API"
        icon={SignalIcon}
        actions={actions}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card title="Status da API" icon={ServerIcon}>
          <div className="flex items-center justify-between mb-2">
            <Badge variant={getStatusVariant()}>
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border border-current border-t-transparent mr-1" />
                  Verificando...
                </>
              ) : (
                <>
                  {error ? (
                    <XMarkIcon className="h-3 w-3 mr-1" />
                  ) : (
                    <CheckIcon className="h-3 w-3 mr-1" />
                  )}
                  {getStatusText()}
                </>
              )}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Endpoint:
              </span>
              <span className="text-gray-900 dark:text-white font-mono text-xs">
                {(() => {
                  if (import.meta.env.VITE_API_BASE_URL)
                    return import.meta.env.VITE_API_BASE_URL;
                  const host = window.location.hostname;
                  return host !== "localhost" && host !== "127.0.0.1"
                    ? `http://${host}:8080/api`
                    : "http://localhost:8080/api";
                })()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Última verificação:
              </span>
              <span className="text-gray-900 dark:text-white">
                {formatLastCheck(lastCheck)}
              </span>
            </div>
          </div>
        </Card>

        <Card title="Tempo de Resposta" icon={ClockIcon}>
          <div className="flex items-center justify-between mb-2">
            {healthData && (
              <Badge variant={getResponseTimeVariant(healthData.responseTime)}>
                {healthData.responseTime}ms
              </Badge>
            )}
          </div>
          <div className="text-center">
            {healthData ? (
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {healthData.responseTime}ms
              </div>
            ) : (
              <div className="text-gray-500 dark:text-gray-400">
                {loading ? "Medindo..." : "Sem dados"}
              </div>
            )}
          </div>
        </Card>

        <Card title="Detalhes" icon={SignalIcon}>
          <div className="space-y-2">
            {healthData ? (
              <>
                {healthData.status && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Status:
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {healthData.status}
                    </span>
                  </div>
                )}
                {healthData.timestamp && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Timestamp:
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {formatTimestamp(healthData.timestamp)}
                    </span>
                  </div>
                )}
                {healthData.version && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Versão:
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {healthData.version}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400">
                {loading ? "Carregando..." : "Dados indisponíveis"}
              </div>
            )}
          </div>
        </Card>
      </div>

      {error && (
        <div className="mb-6">
          <Alert variant="danger" title="Falha na conexão com a API">
            <p>
              {error.message ||
                "Não foi possível conectar com a API. Verifique se o servidor está rodando."}
            </p>
            {error.status === 0 && (
              <p className="mt-2">
                Certifique-se de que a API está rodando em{" "}
                <code className="bg-red-100 dark:bg-red-800 px-1 rounded">
                  http://localhost:8080
                </code>
              </p>
            )}
          </Alert>
        </div>
      )}

      <Alert variant="info" title="Monitoramento Automático">
        Verifica status da API a cada 30 segundos quando auto-refresh está ativo.
      </Alert>
    </div>
  );
};

export default HealthCheck;
