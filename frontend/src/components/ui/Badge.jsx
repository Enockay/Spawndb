const styles = {
  Active:       'bg-green-100 text-green-800',
  Provisioning: 'bg-yellow-100 text-yellow-800',
  Suspended:    'bg-red-100 text-red-800',
};

export default function Badge({ status }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${styles[status] ?? 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  );
}
