<template>
  <div class="mt-3">
    <!-- <a :href="googleAuthUrl">
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
  </a> -->
    <v-btn :href="googleAuthUrl" class="mt-2 mt-sm-0">
      <v-img
        max-width="20"
        contain
        class="mr-3"
        :src="require(`~/assets/images/google/google.webp`)"
      >
      </v-img>
      Sign in with Google</v-btn
    >
  </div>

  <!-- 
  <v-btn class="mt-2" height="40" width="auto" contain color="primary">
    <v-icon class="mr-2">fa-google</v-icon>
    Sign in with Google
  </v-btn>
   -->
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
