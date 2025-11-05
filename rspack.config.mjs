import { DefinePlugin, HtmlRspackPlugin, ProgressPlugin } from '@rspack/core';
import ReactRefreshPlugin from '@rspack/plugin-react-refresh';
import { join } from 'path';

const isDev = process.env.NODE_ENV === 'development';
const publicPath = isDev ? '/' : '/rspack/';

const config = {
  context: process.cwd(),
  devServer: {
    setupMiddlewares(middlewares) {
      return middlewares;
    },
  },
  experiments: {
    css: true,
  },
  entry: {
    main: './src/main/index.tsx',
    library: {
      import: './src/library/index.tsx',
      library: {
        type: 'var',
        name: 'MyLibrary',
      },
    },
  },
  output: {
    publicPath,
    // filename: 'bundle[contenthash].js',
    // chunkFilename: `[id].[contenthash].js`,
    pathinfo: false,
    // The output directory as an absolute path.
    path: join(process.cwd(), 'dist'),
    // The publicPath specifies the public URL address of the output files when referenced in a browser.
    // assetModuleFilename: '[name].[hash].[ext]',
    // uniqueName: Math.random().toString(36).slice(2),
  },
  devtool: false,
  optimization: {
    minimize: false,
  },

  resolve: {
    extensions: ['...', '.ts', '.tsx', '.css', '.less'],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset',
      },
      {
        test: /\.css$/,
        use: ['postcss-loader'],
        type: 'css',
      },
      {
        test: /\.tsx?$/,
        exclude: [/[\\/]node_modules[\\/]/],
        loader: 'builtin:swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
              decorators: true,
              jsx: true,
            },
            externalHelpers: true,
            transform: {
              decoratorMetadata: true,
              // useDefineForClassFields: true,
              react: {
                runtime: 'automatic',
                development: isDev,
                // https://www.rspack.dev/blog/announcing-0-4#deprecating-builtinreactrefresh
                refresh: isDev,
              },
            },
          },
        },
      },
    ],
  },
  plugins: [
    new ProgressPlugin({}),
    new HtmlRspackPlugin({
      template: './index.html',
    }),
    isDev && new ReactRefreshPlugin(),
  ],
};

export default config;
