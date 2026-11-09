import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="page-loading">
        <span className="spinner" aria-hidden="true" />
        Yükleniyor…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/giris" replace />;
  }

  return <Outlet />;
}
