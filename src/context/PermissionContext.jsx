import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from "./AuthContext";

const PermissionContext = createContext();

export const PERMISSIONS = {
  REQUEST_CREATE: 'request_create',
  REQUEST_VIEW: 'request_view',
  HR_PANEL: 'hr_panel',
  USER_MANAGEMENT: 'user_management',
  SIGNATURE_MANAGEMENT: 'signature_management'
};

export function usePermissions() {
  return useContext(PermissionContext);
}

export function PermissionProvider({ children }) {
  const { currentUser, loading: authLoading } = useAuth();
  const [userPermissions, setUserPermissions] = useState([]);
  const [permissionsLoaded, setPermissionsLoaded] = useState(false);

  useEffect(() => {
    // Atualiza permissões quando o usuário ou o estado de autenticação muda
    if (!authLoading) {
      if (currentUser) {
        // Garante que sempre exista um array válido de permissões
        const permissions = currentUser.permissions && Array.isArray(currentUser.permissions)
          ? currentUser.permissions
          : [];
        setUserPermissions(permissions);
      } else {
        setUserPermissions([]);
      }
      setPermissionsLoaded(true);
    }
  }, [currentUser, authLoading]);

  // Verifica se o usuário possui uma permissão específica
  const hasPermission = (permission) => {
    return userPermissions.includes(permission);
  };

  // Verifica se o usuário possui pelo menos uma das permissões informadas
  const hasAnyPermission = (permissions) => {
    return permissions.some(permission => userPermissions.includes(permission));
  };

  // Verifica se o usuário possui todas as permissões informadas
  const hasAllPermissions = (permissions) => {
    return permissions.every(permission => userPermissions.includes(permission));
  };

  // Define quais módulos o usuário pode acessar
  const availableModules = {
    requestCreate: hasPermission(PERMISSIONS.REQUEST_CREATE),
    requestView: hasPermission(PERMISSIONS.REQUEST_VIEW),
    rhPanel: hasPermission(PERMISSIONS.HR_PANEL),
    userManagement: hasPermission(PERMISSIONS.USER_MANAGEMENT),
    signatureManagement: hasPermission(PERMISSIONS.SIGNATURE_MANAGEMENT)
  };

  // Verifica se o usuário tem acesso a pelo menos um módulo
  const hasAnyModuleAccess = Object.values(availableModules).some(access => access);

  // Estado de carregamento global (espera autenticação e permissões)
  const loading = authLoading || !permissionsLoaded;

  const value = {
    userPermissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    availableModules,
    hasAnyModuleAccess,
    loading,
    PERMISSIONS
  };

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
}
