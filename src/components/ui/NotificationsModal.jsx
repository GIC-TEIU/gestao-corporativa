import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { 
  Bell, 
  X, 
  CheckCircle2, 
  Filter, 
  ExternalLink,
  Clock
} from "lucide-react";

function NotificationsModal({ isOpen, onClose, onNotificationsUpdate }) {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all"); // all, unread, read

  // Buscar notificações
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      // Mock data - substitua pela sua API
      const mockNotifications = [
        {
          id: 1,
          title: "Novo envelope recebido",
          message: "Você recebeu um novo envelope para assinatura do documento #1234",
          timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutos atrás
          read: false,
          type: "envelope",
          priority: "high",
          link: "/view"
        },
        {
          id: 2,
          title: "Assinatura pendente",
          message: "Documento #5678 aguarda sua assinatura desde ontem",
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
          read: false,
          type: "signature",
          priority: "medium",
          link: "/view"
        },
        {
          id: 3,
          title: "Envelope finalizado",
          message: "O envelope #9012 foi concluído com sucesso",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
          read: true,
          type: "completion",
          priority: "low",
          link: "/view"
        },
      ];
      
      setNotifications(mockNotifications);
      // Substitua por:
      // const data = await notificationService.getNotifications(currentUser.id);
      // setNotifications(data);
      
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
    } finally {
      setLoading(false);
    }
  };

  // Marcar como lida
  const markAsRead = async (notificationId) => {
    try {
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
      
      // Chamar API
      // await notificationService.markAsRead(notificationId);
      
      // Notificar header para atualizar contador
      onNotificationsUpdate();
      
    } catch (error) {
      console.error("Erro ao marcar como lida:", error);
    }
  };

  // Marcar todas como lidas
  const markAllAsRead = async () => {
    try {
      setNotifications(prev =>
        prev.map(notif => ({ ...notif, read: true }))
      );
      
      // Chamar API
      // await notificationService.markAllAsRead(currentUser.id);
      
      // Notificar header para atualizar contador
      onNotificationsUpdate();
      
    } catch (error) {
      console.error("Erro ao marcar todas como lidas:", error);
    }
  };

  // Filtrar notificações
  const filteredNotifications = notifications.filter(notif => {
    if (filter === "unread") return !notif.read;
    if (filter === "read") return notif.read;
    return true;
  });

  const unreadCount = notifications.filter(notif => !notif.read).length;

  // Formatar timestamp
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);
    
    if (diffInSeconds < 60) return "Agora mesmo";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min atrás`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} h atrás`;
    return `${Math.floor(diffInSeconds / 86400)} dias atrás`;
  };

  // Obter cor baseada na prioridade
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-100 border-red-400 text-red-800";
      case "medium": return "bg-yellow-100 border-yellow-400 text-yellow-800";
      case "low": return "bg-green-100 border-green-400 text-green-800";
      default: return "bg-gray-100 border-gray-400 text-gray-800";
    }
  };

  // Fechar modal com ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevenir scroll
      fetchNotifications();
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black bg-opacity-50">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-in fade-in-90 slide-in-from-bottom-10 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header do Modal */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-[#0D6578]" />
            <h2 className="text-xl font-semibold text-gray-900">Notificações</h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white px-2 rounded-full text-xs text-center mr-1">
                {unreadCount} não lidas
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-2 text-sm bg-[#0D6578] text-white rounded-lg hover:bg-[#0a5161] transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                Marcar todas
              </button>
            )}
            
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                filter === "all" 
                  ? "bg-[#0D6578] text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                filter === "unread" 
                  ? "bg-[#0D6578] text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Não lidas
            </button>
            <button
              onClick={() => setFilter("read")}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                filter === "read" 
                  ? "bg-[#0D6578] text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Lidas
            </button>
          </div>
        </div>

        {/* Lista de Notificações */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-8 space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : filteredNotifications.length > 0 ? (
            <div className="p-4 space-y-3">
              {filteredNotifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-all cursor-pointer hover:shadow-md ${
                    !notification.read 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-white border-gray-200'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    {/* Indicador de prioridade */}
                    <div className={`w-1 rounded-full ${getPriorityColor(notification.priority)}`}></div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className={`font-medium text-sm ${
                          !notification.read ? 'text-blue-900' : 'text-gray-900'
                        }`}>
                          {notification.title}
                        </h3>
                        
                        {!notification.read && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                            className="p-1 text-gray-400 hover:text-green-600 transition-colors ml-2"
                            title="Marcar como lida"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-2">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTimeAgo(notification.timestamp)}
                        </div>
                        
                        {notification.type && (
                          <span className="px-2 py-1 bg-gray-100 rounded-full">
                            {notification.type}
                          </span>
                        )}
                        
                        {notification.link && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              // Navegar para o link
                              window.location.href = notification.link;
                            }}
                            className="flex items-center gap-1 text-[#0D6578] hover:text-[#0a5161]"
                          >
                            Ver detalhes
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Nenhuma notificação
              </h3>
              <p className="text-gray-500 text-sm">
                {filter === "all" 
                  ? "Você está em dia com todas as notificações!"
                  : filter === "unread"
                  ? "Você não tem notificações não lidas."
                  : "Você não tem notificações lidas."
                }
              </p>
            </div>
          )}
        </div>

        {/* Footer do Modal */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-center">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationsModal;