import colors from 'vuetify/es5/util/colors'

export default {
  // ============================Global page headers: https://go.nuxtjs.dev/config-head==========================
  head: {
    titleTemplate: '%s - nuxt_app',
    title: 'nuxt_app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },


  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/mixin',
    { src: '~/plugins/vue-google-maps.js', ssr: false },
  ],


  // =======================Auto import components: https://go.nuxtjs.dev/config-components
  components: true,


  // =======================Auto import components with nested directory========
  // components: {
  //   dirs: [
  //     '~/components',
  //     '~/components/base/foo'
  //   ]
  // },


  // ===============================Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build', // https://go.nuxtjs.dev/typescript
    '@nuxtjs/vuetify',        // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/composition-api/module'
  ],


  // ================================Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',      // https://go.nuxtjs.dev/axios
    '@nuxtjs/auth-next',
    '@nuxtjs/dotenv',     // in order to use .env file
    '@nuxtjs/proxy',      // in order to advoid CORS in nuxt.js
    '@nuxtjs/pwa',        // https://go.nuxtjs.dev/pwa
    '@nuxtjs/toast',      // in order to use toast module
    '@nuxtjs/date-fns',   // to use date format $dateFns.format(new Date())
  ],


  // ============================Axios module configuration: https://go.nuxtjs.dev/config-axios=========================
  axios: {
    baseURL: process.env.BASE_URL,
    credentials: true, // true means needs to pass authentication headers to the backend.
    proxy: true,
  },


  // ============================configeration for laravel jwt auth provideing below===============================
  auth: {
    strategies: {
      'laravelJWT': {
        provider: 'laravel/jwt',
        url: process.env.BASE_URL,
        endpoints: {
          login:{
            url:'/api/login'
          },
          logout:{
            url: '/api/auth/logout',
            method: 'post'
          },
          user: {
            url: '/api/auth/get-user-logged-in',
            method: 'get',
            property: false,
          }
        },
        token: {
          property: 'access_token',
          maxAge: 60 * 60
        },
        refreshToken: {
          maxAge: 20160 * 60
        },
      },
    }
  },


  // ================================auth is guard route to project if not authenticated redirect to login page===================
  // ================================we can add middleware to project the component we prefer by add middleware : ['auth'] to export default
  // router:{
  // middleware : ['auth']
  // },


  // ================================ in order to advoid CORS in nuxt.js ================================
  proxy: {
    // '/api/': { target: process.env.BASE_URL, pathRewrite: {'^/api/': ''}, changeOrigin: true },
    '/weather/': { target: 'https://api.openweathermap.org', pathRewrite: {'^/weather/': ''}, changeOrigin: true }
  },


  // ================================PWA module configuration: https://go.nuxtjs.dev/pwa ==============
  pwa: {
    manifest: {
      lang: 'en',
    },
  },


  // =================================Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify==============
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },


  // ==================================Build Configuration: https://go.nuxtjs.dev/config-build=======================
  build: {},


  // ==================================customize progress bar color==================================================
  loading: {
    color :'#39b982',
    height: '5px'
  },


  // ==================================customize default port when running app========================================
  server: {
    port: 5555,
  },

  // ================================== customize for the use of toast =============================================
  toast: {
    position: 'top-center',
    duration: 4000,
    keepOnHover: false,
    theme:'toasted-primary',  // ['toasted-primary', 'outline', 'bubble']
    // className: 'test-toast',
    // containerClass: 'test-taost-c'
  },


  // to customize date fn
  dateFns: {
    format: 'dd, MM, yyyy hh:mm a'
  }
}
