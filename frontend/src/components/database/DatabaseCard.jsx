import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';
import { dbTypeLabel } from '../../utils/dbTypeLabel';

export default function DatabaseCard({ db }) {
  return (
    <Link to={`/databases/${db.id}`} className="block border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">{db.name}</h3>
        <Badge status={db.status} />
      </div>
      <p className="text-sm text-gray-500 mt-1">{dbTypeLabel(db.db_type)}</p>
      <p className="text-sm text-gray-400 mt-2">${db.monthly_cost_usd}/mo</p>
    </Link>
  );
}
