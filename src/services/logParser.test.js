// src/services/logParser.test.js

import { parseLogLine } from './logParser.js';

describe('parseLogLine', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    // Spy on console.error to monitor its calls without actually logging
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore the original console.error implementation after each test
    consoleErrorSpy.mockRestore();
  });

  it('should correctly parse a valid log line', () => {
    const line =
      '177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "-"';

    const result = parseLogLine(line);

    expect(result).toEqual({
      ipAddress: '177.71.128.21',
      dateTime: '10/Jul/2018:22:21:28 +0200',
      method: 'GET',
      url: '/intranet-analytics/',
    });

    // Ensure that console.error was not called for a valid log line
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should return null for an invalid log line and log an error', () => {
    const line = 'Invalid log line';

    const result = parseLogLine(line);

    expect(result).toBeNull();

    // Ensure that console.error was called with the correct message
    expect(consoleErrorSpy).toHaveBeenCalledWith(`Invalid log line: ${line}`);
  });

  it('should correctly parse log lines with different HTTP methods', () => {
    const logLines = [
      '192.168.1.1 - - [12/Oct/2023:10:00:00 +0000] "POST /submit-form HTTP/1.1" 201 512 "-" "-"',
      '10.0.0.2 - - [12/Oct/2023:10:05:00 +0000] "PUT /update-profile HTTP/1.1" 200 1024 "-" "-"',
      '172.16.0.3 - - [12/Oct/2023:10:10:00 +0000] "DELETE /remove-account HTTP/1.1" 204 0 "-" "-"',
    ];

    const expectedResults = [
      {
        ipAddress: '192.168.1.1',
        dateTime: '12/Oct/2023:10:00:00 +0000',
        method: 'POST',
        url: '/submit-form',
      },
      {
        ipAddress: '10.0.0.2',
        dateTime: '12/Oct/2023:10:05:00 +0000',
        method: 'PUT',
        url: '/update-profile',
      },
      {
        ipAddress: '172.16.0.3',
        dateTime: '12/Oct/2023:10:10:00 +0000',
        method: 'DELETE',
        url: '/remove-account',
      },
    ];

    logLines.forEach((line, index) => {
      const result = parseLogLine(line);
      expect(result).toEqual(expectedResults[index]);
    });

    // Ensure that console.error was not called for valid log lines
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should return null and log an error for log lines with missing fields', () => {
    const incompleteLogLines = [
      '192.168.1.1 - - [12/Oct/2023:10:00:00 +0000] "GET HTTP/1.1" 200 512 "-" "-"', // Missing URL
      '10.0.0.2 - - [12/Oct/2023:10:05:00 +0000] "POST /submit-form" 200 1024 "-" "-"', // Missing HTTP version
      '172.16.0.3 - - [12/Oct/2023:10:10:00 +0000] "DELETE /remove-account HTTP/1.1" -" "-"', // Missing status code
    ];

    incompleteLogLines.forEach((line) => {
      const result = parseLogLine(line);
      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith(`Invalid log line: ${line}`);
    });
  });

  it('should return null and log an error for log lines with unsupported HTTP methods', () => {
    const unsupportedMethodLines = [
      '192.168.1.1 - - [12/Oct/2023:10:00:00 +0000] "CONNECT /proxy HTTP/1.1" 200 512 "-" "-"',
      '10.0.0.2 - - [12/Oct/2023:10:05:00 +0000] "TRACE /trace HTTP/1.1" 200 1024 "-" "-"',
    ];

    unsupportedMethodLines.forEach((line) => {
      const result = parseLogLine(line);
      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith(`Invalid log line: ${line}`);
    });
  });
});
