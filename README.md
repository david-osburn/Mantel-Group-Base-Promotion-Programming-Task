# Mantel Group Base Promotion Programming Task

Node.js HTTP Request Parsing Task with ES6 Modules, Stream Processing, and Modern JavaScript Practices

## Background

A programming task assigned by Mantel Group for parsing HTTP requests from a log file. The application processes the log file to provide analytics on unique IP addresses, the top 3 most visited URLs, and the top 3 most active IP addresses.

## Technologies and Frameworks

- **Node.js**: JavaScript runtime for executing code server-side.
- **ES6 Modules**: Using `import` and `export` for modular code.
- **Stream Processing**: Efficiently handling large log files line by line.
- **ESLint and Prettier**: For code linting and formatting.
- **Jest**: Testing framework for JavaScript.

## Scripts

```bash
# Install dependencies
npm install

# Run the project
npm start

# Run the project with a specific log file
npm start -- --file ./path/to/your/logfile.log

# Run the tests
npm test

# Check for lint errors
npm run lint

# Fix lint errors
npm run lint:fix

# Run Prettier to format code
npm run format

# Check for Prettier formatting issues
npm run format:check
```

## Details

### Project Structure

```
DigIO-Programming-Task
├── logs/
│   └── programming-task-example-data.log
├── src/
│   ├── analytics.js
│   ├── functions.js
│   ├── index.js
│   ├── logParser.js
│   └── validations.js
├── __test__/
│   ├── analytics.test.js
│   ├── functions.test.js
│   ├── logParser.test.js
│   └── testData.js
├── package.json
├── package-lock.json
└── README.md
```

### Source Files (`src/`)

- **`index.js`**: The entry point for the program. Handles command-line arguments and orchestrates the execution flow.
- **`analytics.js`**: Contains the `Analytics` class for processing and storing analytics data, including methods to process log entries and print results.
- **`functions.js`**: Houses the `processLogFile` function that reads and processes the log file using streams.
- **`logParser.js`**: Contains the `parseLogLine` function to parse individual log lines.
- **`validations.js`**: Includes validation functions for IP addresses and URLs.

### Logs (`logs/`)

- **`programming-task-example-data.log`**: A sample log file provided by DigIO, used as the basis for parsing and performing analytics.

### Tests (`__test__/`)

- **`analytics.test.js`**: Contains unit tests for the `Analytics` class.
- **`functions.test.js`**: Contains unit tests for `processLogFile` and related functions.
- **`logParser.test.js`**: Contains unit tests for the `parseLogLine` function.
- **`testData.js`**: Provides sample data for testing purposes.

## Assumptions

- **Language Choice**: JavaScript was chosen for this task to align with the technologies specified for the position (React Native / Node.js / Vue.js).
- **Console-Based Application**: The application runs in the console, focusing on backend processing without a GUI.
- **Log Format Consistency**: All logs follow the Apache Common Log Format, as in the example:
  ```
  177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574
  ```
- **URL Handling**:
  - URLs can be relative paths like `/intranet-analytics/` or full URLs like `http://example.net/faq/`.
  - Relative paths and full URLs pointing to the same resource are considered equivalent and are aggregated in analytics.
- **Definition of Terms**:
  - **"Most Visited" URLs**: URLs requested most frequently in the log file, regardless of the date or time accessed.
  - **"Most Active" IP Addresses**: IP addresses that made the most requests in the log file.
- **Handling of Ties**: If multiple URLs or IP addresses have the same count, they share the same rank, and all are displayed.
- **HTTP Response Status Codes**: All requests are considered in analytics, regardless of the response status code (e.g., `200`, `404`, `500`).
- **Invalid Data Handling**:
  - The application validates IP addresses and URLs.
  - Invalid log entries are skipped, and an error message is displayed.
  - If no valid log entries are found, the application notifies the user.

## Features

- **Stream Processing**: Efficiently processes large log files without loading the entire file into memory.
- **Robust Validation**: Validates IP addresses and URLs to ensure accurate analytics.
- **Extensibility**: Modular code design allows for easy extension and maintenance.
- **Error Handling**: Provides meaningful error messages for invalid log entries or files.
- **CLI Support**: Users can specify the log file path via command-line arguments.

## Usage

### Running the Application

By default, the application processes the sample log file:

```bash
npm start
```

To specify a different log file:

```bash
npm start -- --file ./path/to/your/logfile.log
```

### Expected Output

The application outputs:

- The number of unique IP addresses.
- The top 3 most visited URLs along with the number of visits.
- The top 3 most active IP addresses along with the number of requests.

**Example Output:**

```
Number of Unique IP Addresses: 11

Top 3 Most Visited URLs:

1st - 2 visits:
/docs/manage-websites/
/faq/

2nd - 1 visits:
/intranet-analytics/
/blog/category/meta/
/blog/2018/08/survey-your-opinion-matters/
/docs/manage-users/
/blog/category/community/
/faq/how-to/
/...

Top 3 Most Active IP Addresses:

1st - 4 requests:
168.41.191.40

2nd - 3 requests:
50.112.00.11
177.71.128.21
72.44.32.10

3rd - 2 requests:
168.41.191.34
168.41.191.43
168.41.191.9
```

### Error Handling

- If the log file contains no valid entries or cannot be found, the application outputs:
  ```
  No valid log entries found. Please check the log file.
  ```
- Invalid log lines are skipped, and an error message is displayed for each:
  ```
  Invalid log line: [content of the invalid line]
  ```

## Weaknesses and Future Improvements

Given more time, the following areas could be enhanced:

- **Enhanced Validation**:
  - Implement stricter validation for log file formats.
  - Validate additional HTTP methods and protocols.
- **Optimizations**:
  - Improve performance in ranking algorithms.
  - Optimize data structures for large-scale data.
- **Test Coverage**:
  - Increase unit and integration test coverage.
  - Add tests for edge cases and invalid inputs.
- **Error Handling Enhancements**:
  - Provide more detailed error messages.
  - Implement retry mechanisms or fallbacks for certain errors.
- **User Interface Improvements**:
  - Implement a more user-friendly CLI with options for output formats (e.g., JSON, CSV).
  - Allow filtering by date ranges or specific criteria.
- **Continuous Integration**:
  - Set up CI/CD pipelines using tools like GitHub Actions or Jenkins to automate testing and deployment.
- **Configuration Flexibility**:
  - Use a configuration file or command-line options to adjust parameters like the number of top results to display.

## Installation and Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/DigIO-Programming-Task.git
   cd DigIO-Programming-Task
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the Application**:

   ```bash
   npm start
   ```

## Running Tests

Execute the test suite using:

```bash
npm test
```

This will run all unit tests in the `__test__/` directory using Jest.

## Linting and Formatting

- **Check for Lint Errors**:

  ```bash
  npm run lint
  ```

- **Fix Lint Errors**:

  ```bash
  npm run lint:fix
  ```

- **Format Code with Prettier**:

  ```bash
  npm run format
  ```

- **Check for Formatting Issues**:

  ```bash
  npm run format:check
  ```

## Conclusion

This project demonstrates parsing and analyzing HTTP request logs using Node.js and modern JavaScript practices. By leveraging stream processing and modular design, the application efficiently handles large datasets and provides meaningful analytics.

Feel free to contribute, raise issues, or suggest improvements!
