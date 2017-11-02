# Webpack Wizard
## Description
Webpack Wizard is an opinionated build process tool, that is meant to:
- be a facade for your build process dependencies
  - you can get rid of most of your `devDependencies`, because `webpack-wizard` handles these things for you
- be a facade for webpack config by providing the defaults for:
  - HMR
  - Babel
  - SCSS
  - CSS modules
  - EJS templates

All you have to do after installing is one of the following:
- set `NODE_ENV` env variable to `production` or `development`
- create `webpack-wizard.config.js` file with `isDev` && `isProd` options (see "Config" section below)

## What's inside
- webpack
- babel
  - babel-core
  - babel-preset-es2015
  - babel-preset-react
  - babel-preset-stage-0
- webpack plugins
  - copy-webpack-plugin
  - extract-text-webpack-plugin
  - html-webpack-plugin
  - style-ext-html-webpack-plugin
- webpack loaders
  - babel-loader
  - css-loader
  - file-loader
  - image-webpack-loader
  - postcss-loader
  - resolve-url-loader
  - sass-loader
  - style-loader
- dev server
  - express
  - react-hot-loader
  - webpack-dev-middleware
  - webpack-hot-middleware
- node-sass

## Usage
### Install
`npm install webpack-wizard --save-dev`

### Configure it or... not
Webpack Wizard comes with defaults. You do not need a config. But you can create `webpack-wizard.config.js` in root directory of your project. This file will be transformed into webpack config on the fly. This file needs to export an `Object` with properties described in a "Config" section below.

#### Project structure for the default config
```
- dist/ /* generated when running `webpack-wizard` */
  - bundle.js
  - index.html
  - styles.css
- node_modules/
- src/
  - styles/
    - globals.scss
  - index.js
  - index-dev.js
- favicon.ico
- index.html
- webpack-wizard.config.js
```

### Add npm scripts
It's recommended to use `webpack-wizard` & `webpack-wizard-dev` scripts in `package.json` with [better-npm-run](https://github.com/benoror/better-npm-run) (`npm install better-npm-run --save-dev`), so that you can easily (and cross-platform) provide appropriate `NODE_ENV` env variable.
```javascript
...
"scripts": {
  "build": "better-npm-run build",
  "start": "better-npm-run start"
},
"betterScripts": {
  "build": {
    "command": "webpack-wizard",
    "env": {
      "NODE_ENV": "production"
    }
  },
  "start": {
    "command": "webpack-wizard-dev",
    "env": {
      "NODE_ENV": "development"
    }
  }
},
...
```

### Development server
Run `webpack-wizard-dev` in root directory of your project to start a development server.

### Production build
Run `webpack-wizard` in root directory of your project to start production build.

## Config
`webpack.wizard.config.js` should be a JavaScript module that exports an `Object` with the following attributes:

| Name      | Type                 | Default value                            | Description                                                                                                      |
|-----------|----------------------|------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `isDev`   | `Boolean`            | `process.env.NODE_ENV === 'development'` | development build flag                                                                                           |
| `isProd`  | `Boolean`            | `process.env.NODE_ENV === 'production'`  | production build flag                                                                                            |
| `devHost` | `String`             | `'localhost'`                            | development server host                                                                                          |
| `devPort` | `Number`             | `3000`                                   | development server port                                                                                          |
| `env`     | `Object`             | `{}`                                     | object that will effectively become available as `process.env` in your app - use it to handle your env variables |
| `input`   | `Object` (see below) | `{}`                                     | object that holds paths for your sources                                                                         |
| `output`  | `Object` (see below) | `{}`                                     | object that holds paths for what will be produced by webpack                                                     |

### input
`input` should be an `Object` with the following attributes:

| Name            | Type     | Default value        | Description                                                                                                                   |
|-----------------|----------|----------------------|-------------------------------------------------------------------------------------------------------------------------------|
| `favicon`       | `String` | `'favicon.ico'`      | path to your favicon                                                                                                          |
| `html`          | `String` | `'index.html'`       | path to your main HTML file                                                                                                   |
| `js`            | `String` | `'src/index.js'`     | path to your entry production JS file                                                                                         |
| `jsDev`         | `String` | `'src/index-dev.js'` | path to your entry development JS file                                                                                        |
| `modules`       | `Array`  | `[ 'src' ]`          | array of paths that will go to `resolve.modules` in webpack config                                                            |
| `styles`        | `String` | `'src/styles'`       | path to directory with SCSS files, that are not referenced anywhere, but you still want included (use this to handle globals) |
| `stylesGlobals` | `String` | `'globals.scss'`     | name of file in `styles` directory, that will be imported in every SCSS file in your project                                  |


### output
`output` should be an `Object` with the following attributes:

| Name        | Type                 | Default value  | Description                                                                                                      |
|-------------|----------------------|----------------|------------------------------------------------------------------------------------------------------------------|
| `directory` | `String`             | `'dist'`       | output directory                                                                                                 |
| `css`       | `String`             | `'styles.css'` | name of CSS file which will be placed in `directory`                                                             |
| `html`      | `String`             | `'index.html'` | name of HTML file which will be placed in `directory`                                                            |
| `js`        | `String`             | `'bundle.js'`  | name of JS file which will be placed in `directory`                                                              |

### Complete example
```javascript
const path = require('path');

module.exports = {
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  devHost: 'localhost',
  devPort: 8080,
  env: {
    API_HOST: JSON.stringify(process.env.API_HOST),
    API_PORT: JSON.stringify(process.env.API_PORT),
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  },
  input: {
    favicon: path.resolve(__dirname, 'html', 'favicon.ico'),
    html: path.resolve(__dirname, 'html', 'index.html'),
    js: path.resolve(__dirname, 'src', 'index.js'),
    jsDev: path.resolve(__dirname, 'src', 'index-dev.js'),
    modules: [
      path.resolve(__dirname, 'src')
    ],
    styles: path.resolve(__dirname, 'src', 'styles'),
    stylesGlobals: 'globals.scss',
  },
  output: {
    directory: path.resolve(__dirname, 'dist'),
    css: 'styles.css',
    html: 'index.html',
    js: 'bundle.js'
  }
};

```
