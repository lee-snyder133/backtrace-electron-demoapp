# Backtrace Electron Reporter

example application demoing **Backtrace Error Reporting** with an Electron application.

## Features

* **Error Types:**
  * **Handled Errors:** Standard `try/catch` reporting.
  * **Messages:** Sending custom feedback logs.
  * **Crashes:** Simulating unhandled exceptions to test stability.
  * **Promise Rejections:** Capturing async failures automatically.
  * **Range Errors:** Demonstrating native JS error categorization.
* **Dark Mode UI:** Custom-styled interface matching the brand palette.
* **Production Ready:** Configured with `electron-builder` for native installers (.dmg / .exe).

## Prerequisites

* [Node.js](https://nodejs.org/)
* A Backtrace account (to get your submission URL)

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/YOUR_USERNAME/backtrace-electron-demo.git
cd backtrace-electron-demo
```

1. **Install dependencies:**

```bash
npm install
```

## Configuration

**Crucial:** This project uses environment variables for the submission token. You must create a `.env` file before running the app.

1. Create a file named `.env` in the root of the project.
2. Add your Backtrace submission URL:

```ini
BACKTRACE_URL=https://submit.backtrace.io/YOUR_UNIVERSE/YOUR_TOKEN/json
```

## Development

To run the application:

```bash
npm start
```

## Building for Production

To create a standalone application installer:

```bash
npm run build
```

Output Location: The installers will be generated in the dist/ folder.
