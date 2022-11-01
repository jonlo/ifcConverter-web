/* eslint-disable no-undef */
const { execSync } = require('child_process');
execSync('npm install', { stdio: 'inherit' });
process.env.NODE_ENV = 'development';
execSync(`nodemon server/server.js --env ${process.env.NODE_ENV}`,
	{ stdio: 'inherit' }
);