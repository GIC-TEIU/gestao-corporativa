import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredPermission }) => {
  const { currentUser, loading, hasPermission } = useAuth();
  const location = useLocation();

  console.log('🛡️ ProtectedRoute - Estado:', {
    loading,
    currentUser: !!currentUser,
    requiredPermission,
    hasRequiredPermission: requiredPermission ? hasPermission(requiredPermission) : 'N/A',
    path: location.pathname
  });

  // Apenas aguarda o contexto carregar, sem mostrar nada
  if (loading) return null;

  if (!currentUser) {
    console.log('🔐 Redirecionando para login - usuário não autenticado');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    console.log('🚫 Acesso negado - sem permissão:', requiredPermission);
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Acesso Negado</h2>
        <p className="text-gray-600 mb-4">Você não tem permissão para acessar esta página.</p>
        <p className="text-sm text-gray-500">
          Permissão necessária: <strong>{requiredPermission}</strong>
        </p>
        <button 
          onClick={() => window.history.back()}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Voltar
        </button>
      </div>
    );
  }

  console.log('✅ Acesso permitido para:', location.pathname);
  return children;
};

export default ProtectedRoute;
