# Portfolio-Tracker
A create app that checks price history for portfolio assets.

# Vite Readme

Welcome to the Vite project! This readme will guide you through the setup and usage of Vite, a fast and opinionated web development build tool.

## Table of Contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Project Setup](#project-setup)
- [Development](#development)
  - [Start Dev Server](#start-dev-server)
  - [Build for Production](#build-for-production)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Installation

To use Vite, you need to have Node.js (>=12.0.0) installed on your machine. If you haven't installed Node.js yet, you can download it from [nodejs.org](https://nodejs.org).

Once you have Node.js installed, you can install Vite globally using npm or Yarn:

```bash
# Using npm
npm install -g create-vite

# Using Yarn
yarn global add create-vite
```

### Project Setup

To create a new Vite project, run the following command:

```bash
# Using npm
npm init vite

# Using Yarn
yarn create vite
```

You will be prompted to choose a project template (e.g., Vanilla, React, Vue, etc.) and provide a project name. Vite will set up the project with the selected template and install the necessary dependencies.

After the setup is complete, navigate to the project directory:

```bash
cd your-project-name
```

## Development

### Start Dev Server

To start the development server, run the following command:

```bash
# Using npm
npm run dev

# Using Yarn
yarn dev
```

This will start the development server and provide you with a local development URL (e.g., `http://localhost:3000`). Open this URL in your browser, and you will see your application running.

Vite supports hot module replacement (HMR), so any changes you make to your code will be reflected immediately without a full page reload.

### Build for Production

To build your application for production, run the following command:

```bash
# Using npm
npm run build

# Using Yarn
yarn build
```

This will generate an optimized and minified version of your application in the `dist` directory. You can deploy the contents of this directory to a web server or a static file hosting service.

## Configuration

Vite uses a `vite.config.js` file at the root of your project for configuration. You can customize various aspects of the build process, such as server configuration, plugin options, and build optimization. Refer to the [Vite documentation](https://vitejs.dev/guide/#config-file) for more information on available configuration options.

## Contributing

Contributions to Vite are welcome! If you find a bug, have a feature request, or want to contribute code, please follow the guidelines outlined in the [contributing guide](https://github.com/vitejs/vite/blob/main/.github/CONTRIBUTING.md).

## License

Vite is licensed under the [MIT License](https://github.com/vitejs/vite/blob/main/LICENSE).
