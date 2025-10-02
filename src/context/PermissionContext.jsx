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
    ENVELOPE_CREATOR: {
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
            PERMISSIONS.REQUEST_CREATE, // CORREÇÃO: estava PERMISSONS (erro de digitação)
            PERMISSIONS.RH_PANEL
        ]
    },
    REQUEST_VIEWER: {
        id: 'request_viewer',
        name: 'Consultor de Requisição',
        permissions: [
            PERMISSIONS.REQUEST_VIEW
        ]
    }
};

export function usePermissions() {
    return useContext(PermissionContext);    
}

export function PermissionProvider({ children }) {
    const { currentUser } = useAuth();
    const [userPermissions, setUserPermissions] = useState([]);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        if (currentUser) {
            // CORREÇÃO: pegar a role do currentUser e usar toUpperCase()
            const userRoleType = currentUser.role || 'request_viewer';
            const roleConfig = USER_ROLES[userRoleType.toUpperCase()] || USER_ROLES.REQUEST_VIEWER;

            setUserRole(roleConfig);
            setUserPermissions(roleConfig.permissions);   
        } else {
            setUserPermissions([]);
            setUserRole(null);
        }
    }, [currentUser]);

    // CORREÇÃO: função hasPermission estava com erro
    const hasPermission = (permission) => {
        return userPermissions.includes(permission);
    };

    // CORREÇÃO: adicionar funções que estavam faltando
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

    const value = {
        userPermissions,
        userRole,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        availableModules,
        PERMISSIONS,
        USER_ROLES
    };

    return (
        <PermissionContext.Provider value={value}>  
            {children}
        </PermissionContext.Provider>
    );
}