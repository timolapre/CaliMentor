import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

if (process.env.NODE_ENV === 'production') {
  process.env.VUE_APP_API_HOST = 'https://borderlessinc.science.uu.nl:8080/api'
} else {
  process.env.VUE_APP_API_HOST = 'http://localhost:8080/api'
}

export default new Vuetify({
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
    },
  },
})
