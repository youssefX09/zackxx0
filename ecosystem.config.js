module.exports = {
  apps: [
    {
      name: 'zackxx0-backend',
      cwd: './backend',
      script: 'npm',
      args: 'run dev', // أو 'run start' للإنتاج
      env: {
        NODE_ENV: 'development',
        PORT: 5000,
        // تأكد من وجود ملف .env في مجلد backend يحتوي على DATABASE_URL وغيرها
      },
      instances: 1, // يمكن زيادتها لاستخدام Clustering في الإنتاج
      autorestart: true,
      watch: false, // اجعلها true في التطوير لمراقبة التغييرات (لكن قد تستهلك موارد)
      max_memory_restart: '500M',
      error_file: './logs/backend-error.log',
      out_file: './logs/backend-out.log',
      merge_logs: true,
    },
    {
      name: 'zackxx0-frontend',
      cwd: './frontend',
      script: 'npm',
      args: 'run dev',
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
        VITE_API_URL: 'http://localhost:5000/api', // عدل البورت حسب إعدادات باك إندك
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      error_file: './logs/frontend-error.log',
      out_file: './logs/frontend-out.log',
      merge_logs: true,
    }
  ]
};
