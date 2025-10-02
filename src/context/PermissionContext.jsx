// PermissionContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from "./AuthContext";

const PermissionContext = createContext();

export const PERMISSIONS = {
    DASHBOARD_FULL: 'dashboard_full',
    REQUEST_CREATE: 'request_create', 
    REQUEST_VIEW: 'request_view',
    RH_PANEL: 'hr_panel',
    SETTINGS: 'settings'
};

export const USER_ROLES = {
    ADMIN: {
        id: 'admin',
        name: 'Administrador',
        permissions: [
            PERMISSIONS.DASHBOARD_FULL,
            PERMISSIONS.REQUEST_CREATE,
            PERMISSIONS.REQUEST_VIEW,
            PERMISSIONS.RH_PANEL,
            PERMISSIONS.SETTINGS
        ]
    },
    REQUEST_CREATOR: {
        id: 'request_creator',
        name: 'Criador de Requisição',
        permissions: [
            PERMISSIONS.REQUEST_CREATE
        ]
    },
    RH_MANAGER: {
        id: 'rh_manager',
        name: 'Gestor RH',
        permissions: [
            PERMISSIONS.REQUEST_CREATE,
            PERMISSIONS.RH_PANEL
        ]
    },
    REQUEST_VIEWER: {
        id: 'request_viewer',
        name: 'Consultor de Requisição',
        permissions: [
            PERMISSIONS.REQUEST_VIEW
        ]
    },
    NO_ACCESS: {
        id: 'no_access',
        name: 'Sem Acesso',
        permissions: [] 
    }
};

export function usePermissions() {
    return useContext(PermissionContext);    
}

export function PermissionProvider({ children }) {
    const { currentUser } = useAuth();
    const [userPermissions, setUserPermissions] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentUser) {
            const userRoleType = currentUser.role || 'request_viewer';
           
            let roleConfig;
            switch(userRoleType) {
                case 'admin':
                    roleConfig = USER_ROLES.ADMIN;
                    break;
                case 'request_creator':
                    roleConfig = USER_ROLES.REQUEST_CREATOR;
                    break;
                case 'rh_manager':
                    roleConfig = USER_ROLES.RH_MANAGER;
                    break;
                case 'request_viewer':
                    roleConfig = USER_ROLES.REQUEST_VIEWER;
                    break;
                case 'no_access':
                    roleConfig = USER_ROLES.NO_ACCESS;
                    break;
                default:
                    roleConfig = USER_ROLES.REQUEST_VIEWER;
            }

            console.log('🔄 PermissionContext: ', { 
                userRoleType, 
                roleConfig: roleConfig.id,
                permissions: roleConfig.permissions 
            });

            setUserRole(roleConfig);
            setUserPermissions(roleConfig.permissions);   
        } else {
            setUserPermissions([]);
            setUserRole(null);
        }
        setLoading(false);
    }, [currentUser]);

    const hasPermission = (permission) => {
        return userPermissions.includes(permission);
    };

    const hasAnyPermission = (permissions) => {
        return permissions.some(permission => userPermissions.includes(permission));
    };

    const hasAllPermissions = (permissions) => {
        return permissions.every(permission => userPermissions.includes(permission));
    };

    const availableModules = {
        dashboard: hasPermission(PERMISSIONS.DASHBOARD_FULL),
        requestCreate: hasPermission(PERMISSIONS.REQUEST_CREATE),
        requestView: hasPermission(PERMISSIONS.REQUEST_VIEW),
        rhPanel: hasPermission(PERMISSIONS.RH_PANEL),
        settings: hasPermission(PERMISSIONS.SETTINGS)
    };

    // VERIFICA SE TEM ALGUM MÓDULO DISPONÍVEL
    const hasAnyModuleAccess = Object.values(availableModules).some(access => access);

    const value = {
        userPermissions,
        userRole,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        availableModules,
        hasAnyModuleAccess,
        loading,
        PERMISSIONS,
        USER_ROLES
    };

    return (
        <PermissionContext.Provider value={value}>  
            {children}
        </PermissionContext.Provider>
    );
}