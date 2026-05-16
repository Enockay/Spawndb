import { useState } from 'react';
import CopyButton from '../ui/CopyButton';

export default function ConnectionStringDisplay({ connectionString }) {
  const [revealed, setRevealed] = useState(false);

  const masked = connectionString.replace(/:([^:@]+)@/, ':••••••••@');

  return (
    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
      <code className="flex-1 text-xs text-gray-700 break-all">
        {revealed ? connectionString : masked}
      </code>
      <button
        onClick={() => setRevealed((r) => !r)}
        className="text-xs text-gray-500 hover:text-gray-700 shrink-0"
      >
        {revealed ? 'Hide' : 'Reveal'}
      </button>
      <CopyButton text={connectionString} />
    </div>
  );
}
