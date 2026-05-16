import { useState } from 'react';

export default function CopyButton({ text, className = '' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-50 transition-colors ${className}`}
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  );
}
