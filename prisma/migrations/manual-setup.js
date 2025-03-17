// This is a simple script to run migrations
// Run with: node prisma/migrations/manual-setup.js

const { exec } = require('child_process');

console.log('Setting up database...');

// Run Prisma migrations
exec('npx prisma migrate dev --name init', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error running migrations: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Migration stderr: ${stderr}`);
  }
  console.log(`Migration stdout: ${stdout}`);
  
  console.log('Database setup complete!');
  console.log('You can now run the application with: npm run dev');
});