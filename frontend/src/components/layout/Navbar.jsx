import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <Link to="/" className="text-xl font-bold text-indigo-600">SpawnDB</Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link to="/dashboard" className="text-sm text-gray-600">Dashboard</Link>
            <Link to="/billing" className="text-sm text-gray-600">Billing</Link>
            <span className="text-sm text-gray-500">{user.email}</span>
            <Button variant="secondary" onClick={logout}>Logout</Button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm text-gray-600">Login</Link>
            <Link to="/signup"><Button>Get Started</Button></Link>
          </>
        )}
      </div>
    </nav>
  );
}
