---
title: 'React Project Setup with Vite, ESLint, and Prettier'
description: 'Learn how to efficiently set up a React project using Vite, while incorporating ESLint and Prettier for code consistency and quality.'
coverPath: '/react-project-setup-with-vite-eslint-and-prettier/cover.png'
readTimeInMinutes: '5'
date: '2023-07-09'
---

Welcome to my tutorial on setting up React projects! With a plethora of resources available, I wanted to share my personal approach. Since I primarily build internal web applications, I lean towards utilizing Vite instead of frameworks like Next.js.

Let's dive right into the tutorial! 💻🚀

## Prerequisites

Before we dive in, make sure you have the following software installed on your machine:

- Node.js
- npm (Node Package Manager)

## Step 1: Initializing a New React Project

To create a new React project with Vite and TypeScript, open your command line interface and navigate to your desired directory. Execute the following command:

```bash
npm create vite@latest my-react-app -- --template react-ts
```

This command generates a new directory called `my-react-app` with a basic React project structure and TypeScript configurations.

## Step 2: Installing Project Dependencies

Navigate to the project directory:

```bash
cd my-react-app
```

Next, install the project dependencies using npm:

```bash
npm install
```

This command installs the necessary dependencies specified in the project's `package.json` file.

## Step 3: Starting the Development Server

Once the dependencies are installed, start the development server with the following command:

```bash
npm run dev
```

This command launches the Vite development server, and you can access your project at `http://localhost:5173`. Any modifications you make to your React components or other project files will trigger hot module replacement (HMR), allowing for efficient development.

## Step 4: Configuring ESLint

To set up ESLint with the Airbnb configuration, execute the following command:

```bash
npx install-peerdeps --dev eslint-config-airbnb
```

Next, install the Airbnb configuration for TypeScript:

```bash
npm install --save-dev eslint-config-airbnb-typescript
```

Copy and paste the code below into your `.eslintrc.cjs` file:

```js
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react-refresh', 'react', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': 'warn',
  },
};
```

Copy and paste the code below into your `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["./.eslintrc.cjs", "src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

Make sure to restart your editor (e.g., VSCode) to resolve any errors in the `.eslintrc.cjs` file.

Great! ESLint is now configured, and we'll add some additional options in the upcoming steps.

## Step 5: Setting up Prettier

To install Prettier along with the necessary ESLint plugins and configurations, use the following command:

```bash
npm i --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

Create a new file named `.prettierrc` in the project's root directory and paste the following code into it:

```json
{
  "semi": true,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "es5"
}
```

Next, update the `.eslintrc.cjs` file by adding Prettier to it:

```js
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react-refresh', 'react', '@typescript-eslint', 'prettier'],
  rules: {
    'react-refresh/only-export-components': 'warn',
  },
};
```

## Step 6: Adding Additional ESLint Settings

Copy and paste the code below into your `.eslintrc.cjs` file:

```js
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react-refresh', 'react', '@typescript-eslint', 'prettier'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'react/require-default-props': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
      },
    ],
  },
};
```

Each rule serves a specific purpose:

- `'react-refresh/only-export-components': 'warn'`: Issues a warning if React components are exported in a suboptimal manner for Fast Refresh.
- `'prettier/prettier': ['error', { endOfLine: 'auto' }]`: Enforces consistent code formatting using Prettier. It generates an error if the code formatting doesn't match the Prettier configuration.
- `'@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }]`: Warns about unused variables in TypeScript but allows names starting with an underscore (\_) to be ignored.
- `'react/react-in-jsx-scope': 'off'`: Disables the requirement to import React in every file that uses JSX since it's automatically imported with the JSX transform.
- `'react/jsx-props-no-spreading': 'off'`: Disables the warning for spreading props ({...props}) in JSX components, allowing this practice.
- `'import/prefer-default-export': 'off'`: Disables the preference for default exports when only one export is present, allowing named exports.
- `'import/extensions': 'off'`: Disables the requirement to include file extensions in import statements.
- `'react/require-default-props': 'off'`: Disables the requirement for default values in prop types, allowing optional props.
- `'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }]`: Enforces the use of arrow function syntax for defining function components in React.

These rules help maintain code consistency, catch potential issues, and configure ESLint to work well with React, TypeScript, and Prettier.

## Step 7: Adding VSCode Settings

Create a new folder named `.vscode` in the project's root directory. Inside this folder, create a new file named `settings.json` and paste the following code:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "prettier.singleQuote": true,
  "files.eol": "\n"
}
```

These settings configure your Visual Studio Code editor to use the Prettier extension as the default formatter, enable formatting on save, set the tab size to 2 spaces, enforce single quotes, and use Unix-style line endings.

## Step 8: Adding Support for Absolute Paths

Install the dev dependency `vite-tsconfig-paths` using the following command:

```bash
npm i --save-dev vite-tsconfig-paths
```

Open the `vite.config.ts file` and copy-paste the code below (ignore any TypeScript errors you may encounter):

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths()],
});
```

Open the `tsconfig.json` file and copy-paste the code below:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["./.eslintrc.cjs", "src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

Congratulations! You can now use absolute imports throughout your app. Instead of using relative paths like `import Button from '../../../../components/Button'`, you can use concise absolute paths like `import Button from '@/components/Button'` if your `Button` component is located in the `src/components` directory.

## Step 9 (optional): Adding a `.gitignore` File

If necessary, create a `.gitignore` file in the project's root directory and add the following code:

```bash
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
node_modules
.pnp
.pnp.js

# testing
coverage

# production
.next/
out/
dist/
build

# misc
.DS_Store
# *.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# local env files
.env*.local
.env

# typescript
*.tsbuildinfo
next-env.d.ts
```

## Step 10: Congratulations! 🎉

You have successfully set up your project with React, Vite, TypeScript, ESLint, and Prettier! 🥳
