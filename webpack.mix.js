const mix = require('laravel-mix')

mix
  .setPublicPath('.')

  .js('./src/yotoo.js', './dist/yotoo.min.js')
  .js('./examples/js/main.js', './examples/js/build/build.js')
  .options({
    manifest: false,
  })
  .version()