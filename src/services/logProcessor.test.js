import fs from 'fs';
import readline from 'readline';
import { Readable } from 'stream';
import { processLogFile } from './logProcessor.js';
import { parseLogLine } from './logParser.js';
import { validateIpAddress, validateUrl } from '../utils/validations.js';

jest.mock('./logParser.js', () => ({
  parseLogLine: jest.fn(),
}));

jest.mock('../utils/validations.js', () => ({
  validateIpAddress: jest.fn(),
  validateUrl: jest.fn(),
}));

describe('processLogFile', () => {
  let mockReadStream;
  let mockReadlineInterface;
  let analyticsMock;
  let consoleErrorSpy;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Mock fs.createReadStream to return a mock stream
    mockReadStream = new Readable({
      read() {},
    });
    jest.spyOn(fs, 'createReadStream').mockReturnValue(mockReadStream);

    // Mock readline.createInterface to return a mock readline interface
    mockReadlineInterface = {
      on: jest.fn(),
    };
    jest
      .spyOn(readline, 'createInterface')
      .mockReturnValue(mockReadlineInterface);

    // Create a mock Analytics instance with a mock processLogEntry method
    analyticsMock = {
      processLogEntry: jest.fn(),
    };

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore all mocks after each test to avoid interference between tests
    jest.restoreAllMocks();
  });

  it('should handle invalid URLs by setting urlPath to "/" and process them if valid', async () => {
    const logLine =
      '177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET http:// HTTP/1.1" 200 3574 "-" "-"';

    // Mock parseLogLine to return the parsed log entry with an invalid URL
    parseLogLine.mockReturnValueOnce({
      ipAddress: '177.71.128.21',
      dateTime: '10/Jul/2018:22:21:28 +0200',
      method: 'GET',
      url: 'http://', // Invalid URL, missing hostname
    });

    // Mock validation functions
    validateIpAddress.mockReturnValue(true);
    validateUrl.mockImplementation((url) => url === '/'); // Only '/' is considered valid

    // Set up mock callbacks for 'line' and 'close' events
    const lineCallback = jest.fn();
    const closeCallback = jest.fn();
    mockReadlineInterface.on.mockImplementation((event, callback) => {
      if (event === 'line') {
        lineCallback.mockImplementation(callback);
      } else if (event === 'close') {
        closeCallback.mockImplementation(callback);
      }
    });

    const processPromise = processLogFile('invalid-url.log', analyticsMock);

    // Emit the log line and then close the stream
    lineCallback(logLine);
    closeCallback();

    // Await the processing to complete
    await processPromise;

    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid URL found: http://');

    expect(validateUrl).toHaveBeenCalledWith('/');

    expect(analyticsMock.processLogEntry).toHaveBeenCalledWith({
      ipAddress: '177.71.128.21',
      url: '/',
    });
  });
});
