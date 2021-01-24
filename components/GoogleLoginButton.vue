<template>
  <a :href="googleAuthUrl">
    <img
      class="mt-2 cursor-pointer"
      :src="require(`~/assets/images/google/${googleLoginImage}.png`)"
      alt="Sign in with Google"
      height="40"
      width="auto"
      contain
      @mouseover="googleLoginImage = 'pressed'"
      @mouseleave="googleLoginImage = 'normal'"
      @click="googleLoginImage = 'focus'"
    />
  </a>
</template>

<script lang="ts">
export default {
  data() {
    return {
      googleAuthUrl: '',
      googleLoginImage: 'normal',
    }
  },
  async created() {
    this.googleAuthUrl = await this.$axios.$get('google/url')
  },
}
</script>
