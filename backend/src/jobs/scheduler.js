const cron = require('node-cron');
const { syncDatabaseStatus } = require('./syncDatabaseStatus.job');
const { suspendExpired } = require('./suspendExpired.job');
const { healthCheck } = require('./healthCheck.job');

function startScheduler() {
  cron.schedule('* * * * *',   syncDatabaseStatus);  // every 60s
  cron.schedule('0 2 * * *',   suspendExpired);       // daily at 02:00
  cron.schedule('*/5 * * * *', healthCheck);          // every 5 min
  console.log('Scheduler started');
}

module.exports = { startScheduler };
