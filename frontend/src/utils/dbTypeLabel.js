const labels = {
  postgresql: 'PostgreSQL',
  mysql:      'MySQL',
  redis:      'Redis',
  mongodb:    'MongoDB',
};

export function dbTypeLabel(type) {
  return labels[type] ?? type;
}
