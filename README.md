# Mantel Group Base Promotion Programming Task

Node.js HTTP Request Parsing Task with ES6 Modules, Stream Processing, and Modern JavaScript Practices

---

## Table of Contents

- [Background](#background)
- [Technologies and Frameworks](#technologies-and-frameworks)
- [Project Structure](#project-structure)
- [Improvements Over Previous Version](#improvements-over-previous-version)
- [Approach and Best Practices](#approach-and-best-practices)
  - [Correctness](#correctness)
  - [Assumptions](#assumptions)
  - [Scalability](#scalability)
  - [Modularity](#modularity)
  - [Ease of Reading](#ease-of-reading)
  - [Ease of Use](#ease-of-use)
- [Features](#features)
- [Suggestions for Further Improvement](#suggestions-for-further-improvement)
- [Scripts](#scripts)
- [Usage](#usage)
  - [Running the Application](#running-the-application)
- [Testing](#testing)
- [Linting and Formatting](#linting-and-formatting)
- [Continuous Integration](#continuous-integration)
- [Installation and Setup](#installation-and-setup)
- [Future Improvements](#future-improvements)

---

## Background

This project is a programming task assigned by Mantel Group for parsing HTTP requests from a log file. The application processes the log file to provide analytics on:

- The number of unique IP addresses.
- The top 3 most visited URLs.
- The top 3 most active IP addresses.

---

## Technologies and Frameworks

- **Node.js**: JavaScript runtime for executing code server-side.
- **ES6 Modules**: Using `import` and `export` for modular code.
- **Stream Processing**: Efficiently handling large log files line by line.
- **ESLint and Prettier**: For code linting and formatting.
- **Jest**: Testing framework for JavaScript.
- **GitHub Actions**: For continuous integration and testing.

---

## Project Structure

```
Mantel-Group-Log-Assessment
├── .eslintrc
├── .gitignore
├── .prettierrc
├── README.md
├── logs
│   └── programming-task-example-data.log
├── package-lock.json
├── package.json
└── src
    ├── controllers
    │   ├── analyticsController.js
    │   └── analyticsController.test.js
    ├── index.js
    ├── models
    │   ├── analytics.js
    │   └── analytics.test.js
    ├── services
    │   ├── logParser.js
    │   ├── logParser.test.js
    │   ├── logProcessor.js
    │   └── logProcessor.test.js
    └── utils
        ├── validations.js
        └── validations.test.js
```

- **`src/`**: Contains all source code and tests.
  - **`controllers/`**: Handles the application logic and orchestrates calls between services and models.
  - **`models/`**: Contains the `Analytics` class for processing and storing analytics data.
  - **`services/`**: Houses the core logic for processing data, such as reading files and parsing logs.
  - **`utils/`**: Includes utility functions for validation.
  - **`index.js`**: The entry point for the application.
- **`logs/`**: Contains sample log files.
- **Tests**: Tests are co-located with their corresponding source files for ease of access and organization.

---

## Improvements Over Previous Version

https://github.com/david-osburn/DigIO-Programming-Task

The project has undergone significant enhancements to align with industry best practices:

- **Modular Structure**: The codebase is now organized into directories (`controllers`, `models`, `services`, `utils`), reflecting a clear separation of concerns.
- **Testing**: Unit tests have been added for each module, increasing test coverage and ensuring correctness.
- **Continuous Integration**: Set up GitHub Actions for automated testing and linting on each push or pull request.
- **Code Quality**: Integrated ESLint and Prettier for consistent code formatting and style.
- **Error Handling**: Enhanced error handling with informative messages and logging.
- **Scalability**: Stream processing and efficient algorithms ensure the application can handle large log files.
- **Features Enhancement**: Added support for command-line arguments and improved validation.

**Previous Structure:**

```
Old-Project
├── .eslintrc
├── .gitignore
├── README.md
├── __test__
│   └── functions.test.js
├── logs
│   └── programming-task-example-data.log
├── package-lock.json
├── package.json
└── src
    ├── functions.js
    ├── index.js
    └── validations.js
```

The old version was more primitive, with less modularity and limited testing. The new structure promotes better organization, readability, and maintainability.

---

## Approach and Best Practices

### Correctness

- **Verification Through Testing**: Implemented comprehensive unit tests using Jest for all modules to ensure each piece functions correctly.
- **Validation Functions**: Created robust validation functions for IP addresses and URLs to prevent incorrect data from affecting analytics.
- **Error Handling**: Added try-catch blocks and informative error messages to handle exceptions gracefully.

### Assumptions

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

### Scalability

- **Stream Processing**: Uses Node.js streams to process the log file line by line without loading the entire file into memory.
- **Efficient Algorithms**: Optimized data structures and sorting algorithms to handle large datasets effectively.
- **Asynchronous Processing**: Utilizes async/await to handle file processing without blocking the event loop.

### Modularity

- **Separation of Concerns**:
  - **Controllers**: Orchestrate the flow between services and models.
  - **Models**: Define data structures and business logic.
  - **Services**: Contain the core processing logic.
  - **Utils**: Provide shared utility functions.
- **Independent Modules**: Each module can be independently verified and tested.
- **Scalable Structure**: The project structure supports easy addition of new features and modules.

### Ease of Reading

- **Consistent Naming**: Used clear and descriptive names for files, functions, and variables.
- **Code Formatting**: Enforced consistent code style using ESLint and Prettier.
- **Comments and Documentation**: Added JSDoc comments for functions and classes.
- **Well-Known Patterns**: Followed standard design patterns and best practices for Node.js applications.

### Ease of Use

- **Command-Line Interface**: The application can be run from the command line with ease.
- **Minimal Setup Required**: With `npm install` and `npm start`, the application is ready to use.
- **Detailed README**: Provides clear instructions on installation, usage, and running tests.

---

## Features

- **Stream Processing**: Efficiently processes large log files without loading the entire file into memory.
- **Robust Validation**: Validates IP addresses and URLs to ensure accurate analytics.
- **Extensibility**: Modular code design allows for easy extension and maintenance.
- **Error Handling**: Provides meaningful error messages for invalid log entries or files.
- **CLI Support**: Users can specify the log file path via command-line arguments.

---

## Suggestions for Further Improvement

To continue enhancing the project and reflect higher-level thinking, consider the following suggestions:

1. **Implement Environment Variable Support**:
   - **Configuration Management**: Use the `dotenv` package to manage environment variables, allowing configurable settings like the log file path without hardcoding values.
   - **Benefit**: Enhances flexibility and makes the application easier to configure in different environments.

2. **Enhance Deployment Strategy**:
   - **Continuous Deployment**: Extend the existing CI pipeline to include deployment steps, automating the release process.
   - **Containerization**: Use Docker to containerize the application, ensuring consistent deployment across different environments.
   - **Benefit**: Streamlines deployment and makes scaling the application easier.

3. **Implement Advanced Logging**:
   - **Logging Libraries**: Integrate a robust logging library like `winston` or `pino` to handle different log levels (info, error, debug) and output logs to files or external systems.
   - **Benefit**: Improves debugging and monitoring capabilities, especially in production environments.

4. **Adopt TypeScript for Type Safety** (Optional):
   - **Static Typing**: Migrating to TypeScript can catch type-related errors at compile time and improve code maintainability.
   - **Benefit**: Enhances code quality and reduces runtime errors.

5. **Implement a More Advanced CLI**:
   - **CLI Frameworks**: Use a CLI framework like `commander` or `yargs` to provide a more robust command-line interface with options and help menus.
   - **Customizable Output**: Allow users to specify output formats (e.g., JSON, CSV) and filtering options.
   - **Benefit**: Enhances user experience and flexibility.

6. **Documentation and Contribution Guidelines**:
   - **Comprehensive Documentation**: Add detailed comments and documentation for developers.
   - **Contribution Guidelines**: Provide guidelines for contributing to the project to maintain code quality and consistency.
   - **Benefit**: Facilitates collaboration and future development.

7. **Implement Configuration Files**:
    - **Config Directory**: Use a dedicated configuration directory to manage settings for different environments (development, testing, production).
    - **Benefit**: Simplifies environment-specific configurations and enhances maintainability.

---

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

# Run tests in watch mode
npm run test:watch

# Check for lint errors
npm run lint

# Fix lint errors
npm run lint:fix

# Run Prettier to format code
npm run format

# Check for Prettier formatting issues
npm run format:check
```

---

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

---

## Testing

Execute the test suite using:

```bash
npm test
```

This will run all unit tests using Jest.

To run tests in watch mode:

```bash
npm run test:watch
```

To generate a coverage report:

```bash
npm test -- --coverage
```

---

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

---

## Continuous Integration

The project uses GitHub Actions for continuous integration.

- **Workflow File**: Located at `.github/workflows/node.js.yml`
- **Actions**:
  - Runs tests and linting on each push or pull request.
  - Tests against multiple Node.js versions (e.g., 14.x, 16.x).

---

## Installation and Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/Mantel-Group-Log-Assessment.git
   cd Mantel-Group-Log-Assessment
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the Application**:

   ```bash
   npm start
   ```

---

## Future Improvements

Given more time, the following areas could be enhanced:

- **Enhanced Validation**:
  - Implement stricter validation for log file formats.
  - Validate additional HTTP methods and protocols.
- **Error Handling Enhancements**:
  - Provide more detailed error messages.
  - Implement logging levels (info, warning, error).
- **User Interface Improvements**:
  - Implement a more user-friendly CLI with options for output formats (e.g., JSON, CSV).
  - Allow filtering by date ranges or specific criteria.
- **Deployment Strategy**:
  - Set up a deployment pipeline to automate the release process.
  - Containerize the application using Docker for consistent deployment.
- **Environment Variable Support**:
  - Use environment variables for configurable settings using `dotenv`.
  - Allows flexibility and easier configuration in different environments.
- **Use Husky for Pre-commit Hooks:**:
  - Automated Checks: Implement Husky to run linting, tests, and formatting checks before commits.
  - Benefit: Ensures code quality and consistency by catching issues early in the development process.

