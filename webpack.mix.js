const mix = require('laravel-mix')

mix
  .setPublicPath('.')

  .js('./src/yotoo.js', './dist/yotoo.js')
  .babel('./src/yotoo.esm.js', './dist/yotoo.esm.js')

  .options({
    manifest: false,
    terser: {
      extractComments: false,

      terserOptions: {
        mangle: false,
      },
    },
  })

  .version()
