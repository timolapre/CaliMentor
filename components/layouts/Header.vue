<template>
  <div class="header-container">
    <div class="container d-flex align-center justify-center">
      <h1 class="cursor-pointer" @click="$router.push({ name: 'index' })">
        CaliMentor
      </h1>
      <div
        class="ml-auto d-none d-md-block d-flex justify-center align-center"
        v-if="$store.state.LOGGEDIN"
      >
        <p class="d-inline mr-3">
          Welcome {{ $store.state.LOGGEDINUSER.username }}
        </p>
        <v-btn class="v-btn" @click="$router.push({ name: 'account' })"
          >Account</v-btn
        >
        <v-btn class="v-btn" @click="logout">Logout</v-btn>
      </div>
      <div class="ml-auto d-none d-md-block" v-else>
        <v-btn class="v-btn" @click="$router.push({ name: 'login' })"
          >Login</v-btn
        >
        <v-btn class="v-btn" @click="$router.push({ name: 'register' })"
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
  methods: {
    async logout() {
      const data = await this.$axios.$get('user/logout')
      console.log(data)

      if (data) {
        await this.$store.dispatch('logoutUser')
      }
    },
  },
  async created() {
    await this.$store.dispatch('getLoggedinUser')
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
