const fs = require('fs');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const postcssOptions = {
  config: {
    path: 'node_modules/webpack-wizard/postcss.config.js',
    ctx: {
      autoprefixer: {
        browsers: [
          '> 0.1%'
        ]
      }
    }
  }
};

module.exports = (wizardConfig) => {
  const extractSass = createExtractSass(wizardConfig);

  return {
    rules: [
      createImageRules(),
      createCssRules(wizardConfig, extractSass),
      createScssRules(wizardConfig, extractSass),
      createJsRules(wizardConfig)
    ]
  };
};

const createExtractSass = (wizardConfig) => (config) => {
  if (wizardConfig.isDev) {
    return [
      {
        loader: config.fallback
      },
      ...config.use
    ];
  }

  return ExtractTextPlugin.extract(config);
};

const createImageRules = () => ({
  test: /\.(gif|png|jpe?g|svg)$/i,
  use: [
    {
      loader: 'file-loader'
    },
    {
      loader: 'image-webpack-loader'
    }
  ]
});

const createCssRules = (wizardConfig, extractSass) => ({
  test: /\.css$/,
  use: extractSass({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          minimize: true
        }
      },
      {
        loader: 'postcss-loader',
        options: postcssOptions
      }
    ]
  })
});

const createScssRules = (wizardConfig, extractSass) => ({
  test: /\.scss$/,
  use: extractSass({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          camelCase: true,
          localIdentName: '[local]-[hash:base64:5]',
          minimize: wizardConfig.isProd,
          modules: true
        }
      },
      {
        loader: 'postcss-loader',
        options: postcssOptions
      },
      {
        loader: 'resolve-url-loader'
      },
      {
        loader: 'sass-loader',
        options: {
          data: createSassLoaderData(wizardConfig),
          includePaths: createIncludePaths(wizardConfig.input.styles),
          sourceMap: false
        }
      }
    ]
  })
});

const createSassLoaderData = (wizardConfig) => {
  const fileExists = createIncludePaths(wizardConfig.input.styles).some((directory) => {
    const stylesGlobalsPath = path.resolve(directory, wizardConfig.input.stylesGlobals);
    return fs.existsSync(stylesGlobalsPath);
  });
  return fileExists && `@import '${wizardConfig.input.stylesGlobals}';`;
};

const createJsRules = (wizardConfig) => ({
  test: /\.js$/,
  include: createIncludePaths(wizardConfig.input.modules),
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        [ require.resolve('babel-preset-es2015') ],
        [ require.resolve('babel-preset-react') ],
        [ require.resolve('babel-preset-stage-0') ]
      ],
      plugins: [
        require.resolve('babel-plugin-transform-decorators-legacy'),
        require.resolve('react-hot-loader/babel')
      ]
    }
  }
});

const createIncludePaths = (filepath) => {
  if (Array.isArray(filepath)) {
    return filepath;
  }
  if (typeof filepath === 'string') {
    return [ filepath ];
  }
  return undefined;
};