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
- all you really need to do is to provide a config file with paths for all your sources

## Usage
### Install
`npm install --save-dev webpack-wizard`

### Create config
Create `webpack-wizard.config.js` in root of your project. This file will be transformed into webpack config on the fly. This file needs to export an object with the following properties:

#### Config
| Name      | Type                 | Default value | Required | Description                                                                                                      |
|-----------|----------------------|---------------|----------|------------------------------------------------------------------------------------------------------------------|
| `isDev`   | `Boolean`            | `false`       | yes      | development build flag                                                                                           |
| `isProd`  | `Boolean`            | `false`       | yes      | production build flag                                                                                            |
| `devHost` | `String`             | `'localhost'` | no       | development server host                                                                                          |
| `devPort` | `Number`             | `3000`        | no       | development server port                                                                                          |
| `env`     | `Object`             | `{}`          | no       | object that will effectively become available as `process.env` in your app - use it to handle your env variables |
| `input`   | `Object` (see below) | `{}`          | no       | object that holds paths for your sources                                                                         |
| `output`  | `Object` (see below) | `{}`          | no       | object that holds paths for what will be produced by webpack

##### input
`input` should be an `Object` with the following attributes

| Name            | Type     | Default value    | Required | Description                                                                                                                   |
|-----------------|----------|------------------|----------|-------------------------------------------------------------------------------------------------------------------------------|
| `favicon`       | `String` | `'favicon.ico'`      | no       | path to your favicon                                                                                                          |
| `html`          | `String` | `'index.html'`       | no       | path to your main HTML file                                                                                                   |
| `js`            | `String` | `'src/index.js'`     | no       | path to your entry production JS file                                                                                         |
| `jsDev`         | `String` | `'src/index-dev.js'` | no       | path to your entry development JS file                                                                                        |
| `modules`       | `Array`  | `['src']`            | no       | array of paths that will go to `resolve.modules` in webpack config                                                            |
| `styles`        | `String` | `'src/styles'`       | no       | path to directory with SCSS files, that are not referenced anywhere, but you still want included (use this to handle globals) |
| `stylesGlobals` | `String` | `'globals.scss'`     | no       | name of file in `styles` directory, that will be imported in every SCSS file in your project                                  |


##### output
`output` should be an `Object` with the following attributes

| Name        | Type                 | Default value | Required | Description                                                                                                      |
|-------------|----------------------|---------------|----------|------------------------------------------------------------------------------------------------------------------|
| `directory` | `String`             | `'dist'`      | yes      | output directory                                                                                                 |
| `css`       | `String`             | `'styles.css'`| yes      | name of CSS file which will be placed in `directory`                                                             |
| `html`      | `String`             | `'index.html'`| yes      | name of HTML file which will be placed in `directory`                                                            |
| `js`        | `String`             | `'bundle.js'` | yes      | name of JS file which will be placed in `directory`                                                              |


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

#### Example
```
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

###
Use `webpack-wizard`/`webpack-wizard-dev` in root directory of your project to run a production/development build.

#### Add npm scripts (optional)
It's recommended to use `webpack-wizard` & `webpack-wizard-dev` scripts in `package.json`, e.g.
```
...
"scripts": {
  "build": "webpack-wizard",
  "start": "webpack-wizard-dev"
},
...
```

