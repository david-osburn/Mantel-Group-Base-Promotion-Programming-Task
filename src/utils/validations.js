/**
 * Validates an IP address.
 * Accepts leading zeros in octets.
 * @param {string} ipAddress - The IP address to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
export function validateIpAddress(ipAddress) {
  // Match four groups of 1 to 3 digits separated by dots
  const ipRegex = /^(\d{1,3})(\.(\d{1,3})){3}$/;
  const match = ipAddress.match(ipRegex);
  if (!match) {
    console.error(`Invalid IP Address: ${ipAddress}`);
    return false;
  }
  const octets = ipAddress.split('.').map(Number);
  const isValid = octets.every((octet) => octet >= 0 && octet <= 255);
  if (!isValid) {
    console.error(`Invalid IP Address: ${ipAddress}`);
    return false;
  }
  return true;
}

/**
 * Validates a URL path.
 * @param {string} url - The URL path to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
export function validateUrl(url) {
  const urlRegex = /^\/[\w\-./]*$/;
  if (!urlRegex.test(url)) {
    console.error(`Invalid URL: ${url}`);
    return false;
  }
  return true;
}
