import { validateIpAddress, validateUrl } from './validations.js';

describe('Validators', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('validateIpAddress', () => {
    it('should return true for valid IP addresses', () => {
      const validIPs = [
        '127.0.0.1',
        '192.168.1.1',
        '255.255.255.255',
        '0.0.0.0',
        '1.2.3.4',
        '01.002.003.004',
      ];

      validIPs.forEach((ip) => {
        expect(validateIpAddress(ip)).toBe(true);
      });
    });

    it('should return false for invalid IP addresses', () => {
      const invalidIPs = [
        '256.256.256.256', // Octet exceeds 255
        '192.168.1', // Incomplete IP
        '192.168.1.1.1', // Too many octets
        'abc.def.ghi.jkl', // Non-numeric
        '...1', // Missing octets
        '', // Empty string
        '123.456.78.90', // Invalid octet
        '1.1.1.-1', // Negative number
      ];

      invalidIPs.forEach((ip) => {
        expect(validateIpAddress(ip)).toBe(false);
        expect(console.error).toHaveBeenCalledWith(`Invalid IP Address: ${ip}`);
        consoleErrorSpy.mockClear();
      });
    });
  });

  describe('validateUrl', () => {
    it('should return true for valid URLs', () => {
      const validUrls = [
        '/home',
        '/about',
        '/contact-us',
        '/products/item/123',
        '/path/to/resource.html',
        '/some_path/with_numbers123',
        '/with-dashes-and_underscores',
        '/',
      ];

      validUrls.forEach((url) => {
        expect(validateUrl(url)).toBe(true);
      });
    });

    it('should return false for invalid URLs', () => {
      const invalidUrls = [
        'home', // Missing leading slash
        '/about?query=1', // Contains query parameters
        '/#section', // Contains fragment
        'http://example.com', // Full URL instead of path
        '', // Empty string
        '/invalid char', // Contains space
        '/特殊字符', // Non-ASCII characters
        '/<script>', // Contains angle brackets
      ];

      invalidUrls.forEach((url) => {
        expect(validateUrl(url)).toBe(false);
        expect(console.error).toHaveBeenCalledWith(`Invalid URL: ${url}`);
        consoleErrorSpy.mockClear();
      });
    });
  });
});
