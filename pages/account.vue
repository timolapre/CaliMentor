<template>
  <div class="register-container d-flex align-center justify-center">
    <div class="page">
      <h1 class="text-center">Welcome {{ user.username }}</h1>
      <v-btn @click="$router.push({ name: 'workout-create' })"
        >Create workout</v-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import { User } from '../types'

export default {
  data() {
    return {
      user: {} as User,
      myWorkouts: [],
    }
  },
  methods: {
    async me() {
      const data = await this.$axios.$get('user/me')

      if (data.id) {
        this.loggedin = true
        this.user = data
      }
    },
  },
  mounted() {
    this.me()
  },
}
</script>

<style lang="scss" scoped></style>
