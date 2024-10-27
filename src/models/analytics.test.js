import Analytics from './analytics.js';

const createLogEntry = (ip, url) => ({ ipAddress: ip, url });

describe('Analytics Class', () => {
  let analytics;
  let consoleLogSpy;

  beforeEach(() => {
    analytics = new Analytics();

    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  describe('processLogEntry', () => {
    it('should correctly process log entries by updating IP and URL counts and tracking unique IPs', () => {
      const logEntries = [
        createLogEntry('127.0.0.1', '/home'),
        createLogEntry('127.0.0.1', '/about'),
        createLogEntry('192.168.0.1', '/home'),
      ];

      logEntries.forEach(entry => analytics.processLogEntry(entry));

      expect(analytics.getUniqueIPCount()).toBe(2);
      expect(analytics.ipCounts.get('127.0.0.1')).toBe(2);
      expect(analytics.ipCounts.get('192.168.0.1')).toBe(1);
      expect(analytics.urlCounts.get('/home')).toBe(2);
      expect(analytics.urlCounts.get('/about')).toBe(1);
    });
  });

  describe('getUniqueIPCount', () => {
    it('should return the correct count of unique IP addresses', () => {
      const logEntries = [
        createLogEntry('127.0.0.1', '/home'),
        createLogEntry('192.168.0.1', '/about'),
        createLogEntry('10.0.0.1', '/contact'),
        createLogEntry('127.0.0.1', '/home'),
      ];

      logEntries.forEach(entry => analytics.processLogEntry(entry));

      expect(analytics.getUniqueIPCount()).toBe(3);
    });
  });

  describe('hasData', () => {
    it('should return true when there is data in both ipCounts and urlCounts', () => {
      analytics.processLogEntry(createLogEntry('127.0.0.1', '/home'));

      const result = analytics.hasData();

      expect(result).toBe(true);
    });

    it('should return false when ipCounts is empty', () => {
      // No log entries processed

      const result = analytics.hasData();

      expect(result).toBe(false);
    });

    it('should return false when urlCounts is empty', () => {
      // No log entries processed

      // Manually clear urlCounts to simulate empty state
      analytics.urlCounts.clear();

      const result = analytics.hasData();

      expect(result).toBe(false);
    });
  });

  describe('getTopN', () => {
    it('should return the top N entries sorted by count and key', () => {
      const logEntries = [
        createLogEntry('127.0.0.1', '/home'),
        createLogEntry('127.0.0.1', '/home'),
        createLogEntry('192.168.0.1', '/about'),
        createLogEntry('10.0.0.1', '/contact'),
        createLogEntry('10.0.0.1', '/home'),
        createLogEntry('10.0.0.1', '/about'),
        createLogEntry('192.168.0.2', '/home'),
      ];

      logEntries.forEach(entry => analytics.processLogEntry(entry));

      const topIPs = analytics.getTopN(analytics.ipCounts, 2);
      const topUrls = analytics.getTopN(analytics.urlCounts, 2);

      expect(topIPs).toEqual([
        { key: '10.0.0.1', count: 3, rank: 1 },
        { key: '127.0.0.1', count: 2, rank: 2 },
      ]);

      expect(topUrls).toEqual([
        { key: '/home', count: 4, rank: 1 },
        { key: '/about', count: 2, rank: 2 },
      ]);
    });

    it('should include all entries that tie for the Nth rank', () => {
      const logEntries = [
        createLogEntry('127.0.0.1', '/home'),
        createLogEntry('192.168.0.1', '/about'),
        createLogEntry('10.0.0.1', '/contact'),
        createLogEntry('10.0.0.2', '/home'),
        createLogEntry('10.0.0.3', '/about'),
      ];

      logEntries.forEach(entry => analytics.processLogEntry(entry));

      const topIPs = analytics.getTopN(analytics.ipCounts, 2);
      const topUrls = analytics.getTopN(analytics.urlCounts, 2);

      expect(topIPs).toEqual([
        { key: '10.0.0.1', count: 1, rank: 1 },
        { key: '10.0.0.2', count: 1, rank: 1 },
        { key: '10.0.0.3', count: 1, rank: 1 },
        { key: '127.0.0.1', count: 1, rank: 1 },
        { key: '192.168.0.1', count: 1, rank: 1 },
      ]);

      expect(topUrls).toEqual([
        { key: '/about', count: 2, rank: 1 },
        { key: '/home', count: 2, rank: 1 },
        { key: '/contact', count: 1, rank: 2 },
      ]);
    });
  });

  describe('printResults', () => {
    it('should print the correct number of unique IP addresses and top URLs and IPs', () => {
      const logEntries = [
        createLogEntry('127.0.0.1', '/home'),
        createLogEntry('127.0.0.1', '/home'),
        createLogEntry('192.168.0.1', '/about'),
        createLogEntry('10.0.0.1', '/contact'),
        createLogEntry('10.0.0.1', '/home'),
        createLogEntry('10.0.0.1', '/about'),
        createLogEntry('192.168.0.2', '/home'),
      ];

      logEntries.forEach(entry => analytics.processLogEntry(entry));

      analytics.printResults();

      expect(console.log).toHaveBeenCalledWith('\nNumber of Unique IP Addresses: 4');

      expect(console.log).toHaveBeenCalledWith('\nTop 3 Most Visited URLs:');
      expect(console.log).toHaveBeenCalledWith('\n1st - 4 visits:');
      expect(console.log).toHaveBeenCalledWith('/home');
      expect(console.log).toHaveBeenCalledWith('\n2nd - 2 visits:');
      expect(console.log).toHaveBeenCalledWith('/about');

      expect(console.log).toHaveBeenCalledWith('\nTop 3 Most Active IP Addresses:');
      expect(console.log).toHaveBeenCalledWith('\n1st - 3 requests:');
      expect(console.log).toHaveBeenCalledWith('10.0.0.1');
      expect(console.log).toHaveBeenCalledWith('\n2nd - 2 requests:');
      expect(console.log).toHaveBeenCalledWith('127.0.0.1');
      expect(console.log).toHaveBeenCalledWith('192.168.0.1');
    });

    it('should handle cases with fewer than N entries gracefully', () => {
      const logEntries = [
        createLogEntry('127.0.0.1', '/home'),
      ];

      logEntries.forEach(entry => analytics.processLogEntry(entry));

      analytics.printResults();

      expect(console.log).toHaveBeenCalledWith('\nNumber of Unique IP Addresses: 1');

      expect(console.log).toHaveBeenCalledWith('\nTop 3 Most Visited URLs:');
      expect(console.log).toHaveBeenCalledWith('\n1st - 1 visits:');
      expect(console.log).toHaveBeenCalledWith('/home');
      expect(console.log).toHaveBeenCalledWith('\n2nd:');
      expect(console.log).toHaveBeenCalledWith('N/A');
      expect(console.log).toHaveBeenCalledWith('\n3rd:');
      expect(console.log).toHaveBeenCalledWith('N/A');

      expect(console.log).toHaveBeenCalledWith('\nTop 3 Most Active IP Addresses:');
      expect(console.log).toHaveBeenCalledWith('\n1st - 1 requests:');
      expect(console.log).toHaveBeenCalledWith('127.0.0.1');
      expect(console.log).toHaveBeenCalledWith('\n2nd:');
      expect(console.log).toHaveBeenCalledWith('N/A');
      expect(console.log).toHaveBeenCalledWith('\n3rd:');
      expect(console.log).toHaveBeenCalledWith('N/A');
    });
  });
});
