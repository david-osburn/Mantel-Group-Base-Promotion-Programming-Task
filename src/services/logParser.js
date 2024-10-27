/**
 * Parses a single line from the log file.
 * @param {string} line - A line from the log file.
 * @returns {Object|null} - Parsed log entry or null if invalid.
 */
export function parseLogLine(line) {
  const logLineRegex = /^(\S+) \S+ \S+ \[(.*?)\] "(GET|POST|PUT|DELETE|HEAD|OPTIONS|PATCH) (.*?) HTTP\/\d\.\d" (\d{3}) \S+.*$/;
  const match = line.match(logLineRegex);

  if (!match) {
    console.error(`Invalid log line: ${line}`);
    return null;
  }

  const ipAddress = match[1];
  const dateTime = match[2];
  const method = match[3];
  const url = match[4];
  // const statusCode = match[5];

  return {
    ipAddress,
    dateTime,
    method,
    url,
    // statusCode,
  };
}
