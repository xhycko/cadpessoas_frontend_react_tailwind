// Componentes UI reutilizáveis otimizados

export const Badge = ({ variant = "default", children }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    success: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
    danger: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
    primary: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
  };
  
  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </div>
  );
};

export const Card = ({ title, icon: Icon, children, className = "" }) => (
  <div className={`card ${className}`}>
    <div className="card-body">
      {(title || Icon) && (
        <div className="flex items-center mb-3">
          {Icon && <Icon className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />}
          {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>}
        </div>
      )}
      {children}
    </div>
  </div>
);

export const PageHeader = ({ title, subtitle, icon: Icon, actions, backLink }) => (
  <div className="mb-6">
    {backLink && (
      <backLink.component
        to={backLink.to}
        className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-4"
      >
        <backLink.icon className="h-4 w-4 mr-2" />
        {backLink.text}
      </backLink.component>
    )}
    
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
          {Icon && <Icon className="h-8 w-8 mr-3 text-primary-600 dark:text-primary-400" />}
          {title}
        </h1>
        {subtitle && <p className="mt-2 text-gray-600 dark:text-gray-300">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center space-x-3">{actions}</div>}
    </div>
  </div>
);

export const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="text-center py-12">
    <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
      <Icon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">{description}</p>
    {action}
  </div>
);

export const Alert = ({ variant = "info", title, children, onDismiss }) => {
  const variants = {
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200",
    success: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200",
    warning: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200",
    danger: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200",
  };

  const iconMap = {
    info: "ℹ️",
    success: "✅", 
    warning: "⚠️",
    danger: "❌"
  };

  return (
    <div className={`rounded-lg border p-4 ${variants[variant]}`}>
      <div className="flex items-start">
        <span className="text-lg mr-3 flex-shrink-0">{iconMap[variant]}</span>
        <div className="flex-1">
          {title && <h3 className="text-sm font-medium mb-1">{title}</h3>}
          <div className="text-sm">{children}</div>
        </div>
        {onDismiss && (
          <button onClick={onDismiss} className="ml-4 text-current opacity-70 hover:opacity-100">
            ✕
          </button>
        )}
      </div>
    </div>
  );
};