const types = [
  { value: 'postgresql', label: 'PostgreSQL', icon: '🐘' },
  { value: 'mysql',      label: 'MySQL',      icon: '🐬' },
  { value: 'redis',      label: 'Redis',      icon: '🔴' },
  { value: 'mongodb',    label: 'MongoDB',    icon: '🍃' },
];

export default function DatabaseTypeSelector({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {types.map((t) => (
        <button
          key={t.value}
          type="button"
          onClick={() => onChange(t.value)}
          className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-colors ${
            value === t.value ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <span className="text-2xl">{t.icon}</span>
          <span className="text-sm font-medium">{t.label}</span>
        </button>
      ))}
    </div>
  );
}
