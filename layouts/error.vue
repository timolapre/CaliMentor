<template>
  <div class="nuxt-error error-404 text-center mt-5">
    <h1>{{ errorInfo.errorHeader }}</h1>
    <p>{{ errorInfo.errorText }}</p>
  </div>
</template>
<script>
export default {
  name: 'NuxtError',
  layout: 'default', // optional
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    errorPage() {
      if (this.error.statusCode === 404) {
        //return error404
      }
      // catch everything else
      return error
    },
    errorInfo() {
      let errorHeader = 'Something went wrong'
      let errorText

      if (this.error.statusCode === 404) {
        errorHeader = 'Page not found'
      }
      if (this.error.statusCode === 401) {
        errorHeader = 'Unautherized'
      }
      if (this.error.statusCode === 403) {
        errorHeader = 'Forbidden'
      }

      return { errorHeader, errorText }
    },
  },
}
</script>
