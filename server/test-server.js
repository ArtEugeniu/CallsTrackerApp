// Test script to check if server starts without errors
import('./app.js')
  .then(() => {
    console.log('✅ Server started successfully!');
  })
  .catch((error) => {
    console.error('❌ Server failed to start:', error);
    process.exit(1);
  });
