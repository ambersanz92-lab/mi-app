module.exports = {
  apps: [
    {
      name: "backend",
      script: "server.js",
      cwd: "/home/ssm-user/app/backend",
      instances: 1,
      autorestart: true,
      watch: false,
    }
  ]
};
