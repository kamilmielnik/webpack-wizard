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
          data: `@import '${wizardConfig.input.stylesGlobals}';`,
          includePaths: [
            wizardConfig.input.styles
          ],
          sourceMap: false
        }
      }
    ]
  })
});

const createJsRules = (wizardConfig) => ({
  test: /\.js$/,
  include: wizardConfig.input.modules,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        [ 'es2015', { modules: false } ],
        [ 'react' ],
        [ 'stage-0' ]
      ],
      plugins: [
        'react-hot-loader/babel'
      ]
    }
  }
});
