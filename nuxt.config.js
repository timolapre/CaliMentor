
const webpack = require("webpack");

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'CaliMentor',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      {
        hid: 'description1',
        name: 'description2',
        content: 'my website description'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
        'data-ad-client': 'ca-pub-8433512426340061',
        'data-adtest': "on",
        async: true
      },
      { src: "https://js.stripe.com/v3/" },
      {
        type: "text/javascript",
        innerHTML: "window._mNHandle = window._mNHandle || {}; window._mNHandle.queue = window._mNHandle.queue || []; medianet_versionId = '3121199'",
      },
      {
        src: "https://contextual.media.net/dmedianet.js?cid=8CUU44VP0",
        async: true,
      },
      // { src: "https://code.jquery.com/jquery-3.5.1.min.js" },
      // { src: "https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" }
    ]
  },

  env: {
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~assets/scss/variables.scss'],

  styleResources: {
    scss: ['./assets/scss/*.scss'],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~plugins/vuetify.js', '~plugins/GoogleAnalytics.js'],

  vuetify: {
    icons: {
      iconfont: 'fa',
    },
    theme: {
      // default theme is light mode
      dark: true,
      themes: {
        dark: {
          primary: '#19d24b',
        },
        light: {
          primary: '#19d24b',
        },
      },
    },
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: {
    dirs: [
      '~/components',
      {
        path: '~/components/workout/',
        prefix: 'Workout'
      }
    ]
  },

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    // 'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    credentials: true,
    baseURL: process.env.API_BASE_URL
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    loaders: {
      vue: {
        prettify: false
      }
    },
    loaders: {
      vue: {
        transformAssetUrls: {
          audio: 'src'
        }
      }
    },
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }

  },
}
