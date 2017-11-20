# Webpack Wizard
## Description
Webpack Wizard is an opinionated build process tool, that is meant to:
- be a facade for your build process dependencies
  - you can get rid of most of your `devDependencies`, because `webpack-wizard` handles these things for you
- be a facade for webpack config by providing the defaults for:
  - HMR
  - Babel (with JSX)
  - SCSS
  - CSS modules
  - EJS templates

All you have to do after installing is one of the following:
- set `NODE_ENV` env variable to `production` or `development`
- create `webpack-wizard.config.js` file with `isDev` && `isProd` options (see "Config" section below)

It can also be used as an alternative to a boilerplate, but without polluting your codebase. Bring your own libraries.

## What's inside
- webpack
- babel
  - babel-core
  - babel-plugin-transform-decorators-legacy
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
- dist/ /* generated when running `webpack-wizard build` */
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
```

### Add npm scripts
It's recommended to use `webpack-wizard build` & `webpack-wizard start` scripts in `package.json` with [better-npm-run](https://github.com/benoror/better-npm-run) (`npm install better-npm-run --save-dev`), so that you can easily (and cross-platform) provide appropriate `NODE_ENV` env variable.
```javascript
...
"scripts": {
  "build": "better-npm-run build",
  "start": "better-npm-run start"
},
"betterScripts": {
  "build": {
    "command": "webpack-wizard build",
    "env": {
      "NODE_ENV": "production"
    }
  },
  "start": {
    "command": "webpack-wizard start",
    "env": {
      "NODE_ENV": "development"
    }
  }
},
...
```

### Development server
Run `webpack-wizard start` in root directory of your project to start a development server.

### Production build
Run `webpack-wizard build` in root directory of your project to start production build.

## Config
`webpack.wizard.config.js` should be a JavaScript module that exports an `Object` with attributes described below.

All paths you provide should be absolute, except for `stylesGlobals` option.

All default paths will be relative to your project root directory (assuming this will be your current working directory when running `webpack-wizard build` or `webpack-wizard start`).

| Name      | Type                 | Default value                            | Description                                                                                                      |
|-----------|----------------------|------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `isDev`   | `Boolean`            | `process.env.NODE_ENV === 'development'` | development build flag                                                                                           |
| `isProd`  | `Boolean`            | `process.env.NODE_ENV === 'production'`  | production build flag                                                                                            |
| `devHost` | `String`             | `'localhost'`                            | development server host                                                                                          |
| `devPort` | `Number`             | `3000`                                   | development server port                                                                                          |
| `env`     | `Object`             | `{}`                                     | object that will effectively become available as `process.env` in your app - use it to handle your env variables |
| `input`   | `Object` (see below) | `{}`                                     | object that holds absolute paths for your sources                                                                |
| `output`  | `Object` (see below) | `{}`                                     | object that holds absolute paths for what will be produced by webpack                                            |

### input
`input` should be an `Object` with the following attributes:

| Name            | Type     | Default value        | Description                                                                                                                            |
|-----------------|----------|----------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `favicon`       | `String` | `'favicon.ico'`      | absolute path to your favicon                                                                                                          |
| `html`          | `String` | `'index.html'`       | absolute path to your main HTML file                                                                                                   |
| `js`            | `String` | `'src/index.js'`     | absolute path to your entry production JS file                                                                                         |
| `jsDev`         | `String` | `'src/index-dev.js'` | absolute path to your entry development JS file                                                                                        |
| `modules`       | `Array`  | `[ 'src' ]`          | array of absolute paths that will go to `resolve.modules` in webpack config                                                            |
| `styles`        | `String` | `'src/styles'`       | absolute path to directory with SCSS files, that are not referenced anywhere, but you still want included (use this to handle globals) |
| `stylesGlobals` | `String` | `undefined`          | name of file in `styles` directory, that will be imported in every SCSS file in your project                                           |

### output
`output` should be an `Object` with the following attributes:

| Name        | Type                 | Default value  | Description                                                                                                      |
|-------------|----------------------|----------------|------------------------------------------------------------------------------------------------------------------|
| `directory` | `String`             | `'dist'`       | absolute path to output directory                                                                                |
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

### Real-world examples
  - my CV
    - [www](http://kamilmielnik.com/)
    - [github](https://github.com/kamilmielnik/cv/)
    - [webpack-wizard.config.js](https://github.com/kamilmielnik/cv/blob/master/webpack-wizard.config.js)
  - Scrabble Solver
    - [www](http://scrabble-solver.kamilmielnik.com/)
    - [github](https://github.com/kamilmielnik/scrabble-solver/blob/master/scrabble-solver-frontend)
    - [webpack-wizard.config.js](https://github.com/kamilmielnik/scrabble-solver/blob/master/scrabble-solver-frontend/webpack-wizard.config.js)
  - Sprouts
    - [www](http://sprouts.kamilmielnik.com/)
    - [github](https://github.com/kamilmielnik/sprouts/)
    - [webpack-wizard.config.js](https://github.com/kamilmielnik/sprouts/blob/master/webpack-wizard.config.js)

### Customization
If you need to access/modify webpack config generated from your `webpack-wizard.config.js` you can modify `webpack-wizard.config.js` in the following way:
```javascript
const webpackWizard = require('webpack-wizard');

const webpackWizardConfig = {
  /* ... */
};

const webpackConfig = webpackWizard(webpackWizardConfig);

/* do stuff to webpackConfig */

module.exports = webpackConfig;
```

## Boilerplates
Webpack Wizard has one experimental built-in boilerplate: `react-redux`. You can use it in the following way:
```
npm install -g webpack-wizard               # installs webpack-wizard command globally (you only need to do this once)
cd /my-projects                             # go to a directory, which you want to become a parent directory for your new project
webpack-wizard boil react-redux my-project  # run webpack-wizard boilerplate generator (WARNING: this will take a while, be patient)
                                            #   - specify `react-redux` boilerplate
                                            #   - specify name for your project (here: `my-project`)
cd my-project                               # open freshly created directory
npm start                                   # you're good to go, you can run your development server
npm run build                               # or production build
npm run start:prod                          # and then serve it with simple http server
```
