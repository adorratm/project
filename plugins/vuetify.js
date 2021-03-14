// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import tr from 'vuetify/es5/locale/tr'
import minifyTheme from 'minify-css-string'
Vue.use(Vuetify)

const opts = {
  lang: {
    locales: { tr },
    current: 'tr',
  },
  theme: {
    options: { minifyTheme },
  },
}

export default new Vuetify(opts)
