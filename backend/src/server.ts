import cluster from 'cluster';
import { cpus } from 'os';
import { env } from './config/env';
import { logger } from './config/logger';
import app from './app';

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  logger.info(`Primary ${process.pid} started`);
  logger.info(`Running on ${numCPUs} CPUs`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Listen for worker exits and restart new workers
  cluster.on('exit', (worker, code, signal) => {
    logger.warn(`Worker ${worker.process.pid} died with code: ${code}, signal: ${signal}`);
    logger.info('Forking a new worker...');
    cluster.fork();
  });

  // Handle graceful shutdown
  process.on('SIGTERM', () => {
    logger.info('SIGTERM received. Shutting down gracefully...');
    
    Object.keys(cluster.workers || {}).forEach((id) => {
      cluster.workers![id]?.kill('SIGTERM');
    });

    setTimeout(() => {
      process.exit(0);
    }, 10000);
  });

} else {
  // Worker process
  const server = app.listen(env.PORT, () => {
    logger.info(`Worker ${process.pid} started on port ${env.PORT}`);
  });

  // Handle graceful shutdown in worker
  process.on('SIGTERM', () => {
    logger.info(`Worker ${process.pid} received SIGTERM`);
    
    server.close(() => {
      logger.info(`Worker ${process.pid} closed connections`);
      process.exit(0);
    });

    // Force close after 10 seconds
    setTimeout(() => {
      process.exit(1);
    }, 10000);
  });
}
