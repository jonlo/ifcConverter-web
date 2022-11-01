/* eslint-disable no-undef */
const { execSync } = require('child_process');
execSync('npm install', { stdio: 'inherit' });
execSync('node server/server.js --env production', { stdio: 'inherit' });
