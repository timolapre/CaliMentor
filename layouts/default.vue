<template>
  <v-app class="page-container">
    <Header />
    <Nuxt class="content-page" />
    <Footer />
  </v-app>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error', // you can set a custom layout for the error page
}
</script>

<style lang="scss">
html {
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  overflow-x: hidden;
}

*,
*::before,
*::after {
  color: $text-color-light;
  box-sizing: border-box;
  margin: 0;
}

.content-page {
  margin-bottom: 7rem;
}

.page {
  width: 100%;
  margin: 1rem 1rem 0;
  max-width: 768px;
}

.cursor {
  &-pointer {
    cursor: pointer;
  }
}

h1,
h2,
h3 {
  font-weight: 400;
}

h3 {
  font-size: 1.3em;
}

::-webkit-scrollbar-track {
  background: $background-color;
}
::-webkit-scrollbar {
  width: 7.5px;
  height: 7.5px;
}
::-webkit-scrollbar-thumb {
  background: $background-color-light;
  border-radius: 5px;
}
</style>
