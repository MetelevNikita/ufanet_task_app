module.exports = {
  apps: [
    {
      name: "ufanet_task_app",
      cwd: "./ufanetapp",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 4000",

      // ----------- Производительность и стабильность -----------

      exec_mode: "cluster",
      instances: "max",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      restart_delay: 3000,
      time: true,

      interpreter: "node",
      node_args: ["--max-old-space-size=1024"],    // ограничение по памяти
    }
  ]
};
