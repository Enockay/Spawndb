import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Instant cloud databases, <span className="text-indigo-600">on demand.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-xl mb-8">
          Spin up PostgreSQL, MySQL, Redis, or MongoDB in seconds. Pay only for what you use.
        </p>
        <Link to="/signup"><Button>Start for free</Button></Link>
      </main>
      <Footer />
    </div>
  );
}
