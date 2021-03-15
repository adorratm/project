import colors from "vuetify/es5/util/colors";

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  //mode: 'universal',
  env: {
    baseUrl: process.env.BASE_URL || "http://localhost:3000",
    apiBaseUrl: "https://localhost:8080/",
    apiPublicUrl: "https://localhost:8080/public"
  },
  server: {
    port: 3000, // default: 3000
    host: "0.0.0.0" // default: localhost
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - Digitus",
    title: process.env.npm_package_name || "Digitus",
    link: [ {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico"
    } ],
    meta: [ {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no, minimal-ui"
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    htmlAttrs: {
      lang: "tr"
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [ {
      src: "~/plugins/vee-validate"
    },
    {
      src: "~/plugins/vuetify"
    },
    {
      src: "~/plugins/axios"
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/axios",
    "@nuxtjs/auth-next"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
    "nuxt-izitoast",
    "dropzone-nuxt"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.apiBaseUrl,
    json: true,
    withCredentials: false,
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Credentials": true,
      "Content-type": "application/json"
    },
    credentials: "same-origin"
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "tr"
    },
    meta: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no, minimal-ui",
      nativeUI: true,
      lang: "tr",
      author: "EMRE KILIÇ",
      mobileAppIOS: true
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: [ "~/assets/variables.scss" ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  /**
   * Transpile validation and nuxt configuration param and compress window.Nuxt in html render
   */
  build: {
    extractCSS: true,
    transpile: [ "vee-validate/dist/rules", "vee-validate/dist/locale" ],
    splitChunks: {
      layouts: true
    },
    extend( config, ctx ) {
      config.resolve.symlinks = false;
    }
  },
  hooks: {
    "vue-renderer:ssr:context"( context ) {
      const routePath = JSON.stringify( context.nuxt.routePath );
      context.nuxt = {
        serverRendered: true,
        routePath
      };
    }
  },
  auth: {
    strategies: {
      user: {
        scheme: "refresh",
        token: {
          property: "token",
          required: true,
          type: "Bearer",
          maxAge: 1800
        },
        refreshToken: {
          property: "token",
          data: "token",
          type: "Bearer",
          maxAge: 1800
        },
        endpoints: {
          login: {
            url: "http://localhost:8080/api/auth/login",
            method: "post"
          },
          refresh: {
            url: "http://localhost:8080/api/auth/login",
            method: "post"
          },
          logout: {
            url: "http://localhost:8080/api/auth/logout",
            method: "post"
          },
          user: {
            url: "http://localhost:8080/api/auth/profile",
            method: "get",
            propertyName: false,
            property: false,
            autoFetch: false
          }
        },
        autoLogout: true
      },
    }
  }
};
