import { runAnalytics } from './controllers/analyticsController.js';

(async () => {
  try {
    const fileName = './logs/programming-task-example-data.log';
    await runAnalytics(fileName);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
})();
