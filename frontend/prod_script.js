/* eslint-disable no-undef */
const { execSync } = require('child_process');
execSync('npm install', { stdio: 'inherit' });
process.env.NODE_ENV = 'production';
execSync(`npm run build --env ${process.env.NODE_ENV}`,
    { stdio: 'inherit' }
);