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
      createFontRules(),
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
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
          progressive: true,
          quality: 100
        }
      }
    }
  ]
});

const createFontRules = () => ({
  test: /\.(woff|woff2|eot|ttf|otf)$/i,
  use: [
    {
      loader: 'file-loader'
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
      wizardConfig.isProd && {
        loader: 'postcss-loader',
        options: postcssOptions
      }
    ].filter(Boolean)
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
  const fileExists = (createIncludePaths(wizardConfig.input.styles) || []).some((directory) => {
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
        require.resolve('@babel/preset-env', { modules: false }),
        require.resolve('@babel/preset-react')
      ],
      plugins: [
        ...getBabelStage0Plugins(),
        ...getBabelStage1Plugins(),
        ...getBabelStage2Plugins(),
        ...getBabelStage3Plugins(),
        require.resolve('@babel/plugin-transform-regenerator'),
        require.resolve('@babel/plugin-syntax-async-generators'),
        require.resolve('react-hot-loader/babel')
      ]
    }
  }
});

const getBabelStage0Plugins = () => [
  require.resolve('@babel/plugin-proposal-function-bind')
];

const getBabelStage1Plugins = () => [
  require.resolve('@babel/plugin-proposal-export-default-from'),
  require.resolve('@babel/plugin-proposal-logical-assignment-operators'),
  [ require.resolve('@babel/plugin-proposal-optional-chaining'), { loose: false } ],
  [ require.resolve('@babel/plugin-proposal-pipeline-operator'), { proposal: 'minimal' } ],
  [ require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'), { loose: false } ],
  require.resolve('@babel/plugin-proposal-do-expressions')
];

const getBabelStage2Plugins = () => [
  [ require.resolve('@babel/plugin-proposal-decorators'), { legacy: true } ],
  require.resolve('@babel/plugin-proposal-function-sent'),
  require.resolve('@babel/plugin-proposal-export-namespace-from'),
  require.resolve('@babel/plugin-proposal-numeric-separator'),
  require.resolve('@babel/plugin-proposal-throw-expressions')
];

const getBabelStage3Plugins = () => [
  require.resolve('@babel/plugin-syntax-dynamic-import'),
  require.resolve('@babel/plugin-syntax-import-meta'),
  [ require.resolve('@babel/plugin-proposal-class-properties'), { loose: false } ],
  require.resolve('@babel/plugin-proposal-json-strings')
];

const createIncludePaths = (filepath) => {
  if (Array.isArray(filepath)) {
    return filepath;
  }
  if (typeof filepath === 'string') {
    return [ filepath ];
  }
  return undefined;
};
