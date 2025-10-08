// components/PermissionRedirect.jsx
import { useEffect } from 'react';
import { usePermissions } from '../../context/PermissionContext';
import { useNavigate } from 'react-router-dom';

export default function PermissionRedirect() {
  const { hasAnyModuleAccess, loading } = usePermissions();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !hasAnyModuleAccess) {
      console.log('🔀 Redirecionando usuário sem permissões para /status');
      navigate('/status', { replace: true });
    }
  }, [hasAnyModuleAccess, loading, navigate]);

  return null;
}