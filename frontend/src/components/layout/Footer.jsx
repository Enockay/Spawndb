import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
      <div className="flex justify-center gap-6">
        <Link to="/tos">Terms of Service</Link>
        <Link to="/privacy">Privacy</Link>
        <a href="mailto:support@spawndb.io">Contact</a>
      </div>
      <p className="mt-2">© {new Date().getFullYear()} SpawnDB</p>
    </footer>
  );
}
