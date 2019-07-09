/* eslint-disable */
const path = require('path')
const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')
const withTypescript = require('@zeit/next-typescript')
const optimizedImages = require('next-optimized-images')
const withTM = require('@weco/next-plugin-transpile-modules')
const withFonts = require('next-fonts')
const withOffline = require('next-offline')

if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {}
}

module.exports = withOffline(
  withTypescript(
    withFonts(
      optimizedImages(
        withCss(
          withSass(
            withTM({
              transpileModules: [
                'react-native-paper',
                'react-native-safe-area-view',
                'react-native-vector-icons'
              ],
              workboxOpts: {
                globPatterns: ['static/**/*'],
                globDirectory: '.',
                runtimeCaching: [
                  {
                    urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
                    handler: 'CacheFirst',
                    options: {
                      cacheName: 'images',
                      expiration: {
                        maxEntries: 10
                      }
                    }
                  },
                  {
                    urlPattern: /^https?.*/,
                    handler: 'NetworkFirst',
                    options: {
                      cacheName: 'offlineCache',
                      expiration: {
                        maxEntries: 200
                      }
                    }
                  }
                ]
              },
              webpack: config => {
                // Fixes npm packages that depend on `fs` module
                config.node = {
                  fs: 'empty'
                }
                config.resolve.alias = Object.assign({}, config.resolve.alias, {
                  'react-native': 'react-native-web'
                })
                config.module.rules.push({
                  test: /\.js$/,
                  exclude: /node_modules[/\\](?!react-native-paper|react-native-vector-icons|react-native-safe-area-view)/,
                  use: {
                    loader: 'babel-loader',
                    options: {
                      // The configration for compilation
                      presets: [
                        ['@babel/preset-env', { useBuiltIns: 'usage' }],
                        '@babel/preset-react',
                        '@babel/preset-flow'
                      ],
                      plugins: [
                        '@babel/plugin-proposal-class-properties',
                        '@babel/plugin-proposal-object-rest-spread'
                      ]
                    }
                  }
                })

                return config
              }
            })
          )
        )
      )
    )
  )
)
