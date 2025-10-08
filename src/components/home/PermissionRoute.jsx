// components/ProtectedRouteWithPermissions.jsx
import { usePermissions } from '../../context/PermissionContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRouteWithPermissions({ children }) {
  const { hasAnyModuleAccess, loading } = usePermissions();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  if (!hasAnyModuleAccess) {
    return <Navigate to="/status" replace />;
  }

  return children;
}