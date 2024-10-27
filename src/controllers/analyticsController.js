import Analytics from '../models/analytics.js';
import { processLogFile } from '../services/logProcessor.js';

export async function runAnalytics(fileName) {
    const analytics = new Analytics();

    try {
        await processLogFile(fileName, analytics);

        if (analytics.hasData()) {
        analytics.printResults();
        } else {
        console.error('No valid log entries found. Please check the log file.');
        }
    } catch (error) {
        console.error(error);
    }
}
