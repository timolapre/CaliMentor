import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

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
