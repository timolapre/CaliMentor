<template>
  <div class="register-container d-flex align-center justify-center">
    <div class="page">
      <GoogleLoginButton class="mb-10" />
      <h4>Login with username</h4>
      <v-form id="login-form" @submit.prevent="login()">
        <v-text-field
          v-model="username"
          label="Username"
          :error="!!errors.username"
          :error-messages="errors.username"
        ></v-text-field>
        <v-text-field
          v-model="password"
          type="password"
          label="Password"
          :error="!!errors.password"
          :error-messages="errors.password"
        ></v-text-field>
        <div class="d-flex align-center justify-space-between">
          <h4 class="red--text mb-3">{{ errors.all }}</h4>
          <v-btn
            class="mt-2 float-right mb-5"
            small
            @click="$router.push({ name: 'forgotpassword' })"
            >Forgot password
          </v-btn>
        </div>

        <v-btn
          type="submit"
          form="login-form"
          class="mt-2"
          color="primary"
          block
          >Login
        </v-btn>
      </v-form>

      <div class="mt-4 d-flex float-right align-center">
        <p class="mb-0 mr-3">No account yet?</p>
        <v-btn @click="$router.push({ name: 'register' })"> Register </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { User } from '../types'

export default {
  data() {
    return {
      user: [] as Array<User>,
      username: '',
      password: '',
      errors: {},
    }
  },
  methods: {
    async login() {
      const data = await this.$axios.$post('user/login', {
        username: this.username,
        password: this.password,
      })
      this.user = data
      this.errors = data.errors ? data.errors : {}
      if (!data.errors) {
        await this.$store.dispatch('getLoggedinUser')
        this.$router.push({ name: 'workouts' })
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
