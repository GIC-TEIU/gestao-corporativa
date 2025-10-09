import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  
  console.log('ProtectedRoute - currentUser:', currentUser);
  console.log('ProtectedRoute - loading:', loading);
  
  if (loading) {
    return <div>Carregando...</div>;
  }
  
  return currentUser ? children : <Navigate to="/login" replace />;
}