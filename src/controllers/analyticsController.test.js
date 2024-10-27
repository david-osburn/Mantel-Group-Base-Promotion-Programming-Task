import { runAnalytics } from './analyticsController.js';
import Analytics from '../models/analytics.js';
import { processLogFile } from '../services/logProcessor.js';

jest.mock('../models/analytics.js');
jest.mock('../services/logProcessor.js');

describe('runAnalytics', () => {
  const fileName = 'test-log.log';
  let analyticsInstance;
  let consoleErrorSpy;

  beforeEach(() => {
    // Clear all mock histories and implementations before each test
    jest.clearAllMocks();

    // Create a mock instance of Analytics with jest.fn() for its methods
    analyticsInstance = {
      hasData: jest.fn(),
      printResults: jest.fn(),
    };

    // When Analytics is instantiated, return the mocked analyticsInstance
    Analytics.mockImplementation(() => analyticsInstance);

    // Spy on console.error and mock its implementation
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should process the log file and print results when data is present', async () => {
    analyticsInstance.hasData.mockReturnValue(true);
    processLogFile.mockResolvedValue();

    await runAnalytics(fileName);

    expect(Analytics).toHaveBeenCalledTimes(1);
    expect(processLogFile).toHaveBeenCalledWith(fileName, analyticsInstance);
    expect(analyticsInstance.hasData).toHaveBeenCalledTimes(1);
    expect(analyticsInstance.printResults).toHaveBeenCalledTimes(1);
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should process the log file and log an error when no data is present', async () => {
    analyticsInstance.hasData.mockReturnValue(false);
    processLogFile.mockResolvedValue();

    await runAnalytics(fileName);

    expect(Analytics).toHaveBeenCalledTimes(1);
    expect(processLogFile).toHaveBeenCalledWith(fileName, analyticsInstance);
    expect(analyticsInstance.hasData).toHaveBeenCalledTimes(1);
    expect(analyticsInstance.printResults).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('No valid log entries found. Please check the log file.');
  });

  it('should handle errors thrown by processLogFile', async () => {
    const error = new Error('Failed to process log file');
    processLogFile.mockRejectedValue(error);

    await runAnalytics(fileName);

    expect(Analytics).toHaveBeenCalledTimes(1);
    expect(processLogFile).toHaveBeenCalledWith(fileName, analyticsInstance);
    expect(analyticsInstance.hasData).not.toHaveBeenCalled();
    expect(analyticsInstance.printResults).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(error);
  });
});
