const app = require('./app');
const { PORT } = require('./config/env');

app.listen(PORT, () => {
  console.log(`SpawnDB API running on port ${PORT}`);
});
