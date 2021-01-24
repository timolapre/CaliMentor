<template>
  <div class="header-container">
    <div class="container d-flex align-center justify-center">
      <h1 class="cursor-pointer" @click="$router.push({ name: 'index' })">
        CaliMentor
      </h1>
      <div
        class="ml-auto d-none d-md-flex justify-center align-center"
        v-if="$store.state.LOGGEDIN"
      >
        <p class="d-inline ma-0">
          Welcome {{ $store.state.LOGGEDINUSER.username }}
        </p>
        <v-btn class="v-btn ml-6" @click="$router.push({ name: 'account' })"
          >Account</v-btn
        >
        <v-btn class="v-btn ml-2" @click="logout">Logout</v-btn>
      </div>
      <div class="ml-auto d-none d-md-flex" v-else>
        <v-btn class="v-btn" @click="$router.push({ name: 'login' })"
          >Login</v-btn
        >
        <v-btn class="v-btn ml-2" @click="$router.push({ name: 'register' })"
          >Register</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Header',
  data() {
    return {}
  },
  methods: {
    async logout() {
      const data = await this.$axios.$get('user/logout')

      if (data) {
        await this.$store.dispatch('logoutUser')
      }
    },
  },
  async created() {
    await this.$store.dispatch('getLoggedinUser')
    await this.$store.dispatch('setExerciseOptions')
  },
})
</script>

<style lang="scss" scoped>
.header-container {
  padding: 0.5rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px $white solid;
}
</style>
