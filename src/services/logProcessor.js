import fs from 'fs';
import readline from 'readline';
import { URL } from 'url';
import { validateIpAddress, validateUrl } from '../utils/validations.js';
import { parseLogLine } from './logParser.js';

/**
 * Processes the log file line by line using streams.
 * @param {string} filename - Path to the log file.
 * @param {Analytics} analytics - Instance of the Analytics class.
 * @returns {Promise<void>}
 */
export async function processLogFile(filename, analytics) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: fs.createReadStream(filename),
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
      const logEntry = parseLogLine(line);
      if (logEntry) {
        let urlPath;

        // Normalize and validate the URL
        if (
          logEntry.url.startsWith('http://') ||
          logEntry.url.startsWith('https://')
        ) {
          try {
            const parsedUrl = new URL(logEntry.url);
            urlPath = parsedUrl.pathname;
          } catch (error) {
            console.error(`Invalid URL found: ${logEntry.url}`);
            urlPath = '/';
          }
        } else {
          // It's a relative path
          urlPath = logEntry.url;
        }

        // Normalize the path
        if (!urlPath.endsWith('/')) {
          urlPath += '/';
        }

        // Validate IP address and URL
        const isIpValid = validateIpAddress(logEntry.ipAddress);
        const isUrlValid = validateUrl(urlPath);

        if (isIpValid && isUrlValid) {
          analytics.processLogEntry({
            ipAddress: logEntry.ipAddress,
            url: urlPath,
          });
        }
      }
    });

    rl.on('close', () => {
      resolve();
    });

    rl.on('error', (err) => {
      reject(err);
    });
  });
}