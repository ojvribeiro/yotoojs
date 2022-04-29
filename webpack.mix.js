const mix = require('laravel-mix')

mix
  .setPublicPath('.')

  .js('./src/yotoo.js', './dist/yotoo.min.js')
  .babel('./src/yotoo.esm.js', './dist/yotoo.esm.js')

  .js('./examples/js/main.js', './examples/js/build/build.js')

  .options({
    manifest: false,
    terser: {
      extractComments: false,

      terserOptions: {
        mangle: false,
        compress: {
          drop_console: true
        },
      },
    },
  })

  .version()

  // if not in production, disable source maps
  .webpackConfig({
    devtool: mix.inProduction() ? false : 'source-map',
  })

