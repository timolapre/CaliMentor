<template>
  <div class="register-container d-flex align-center justify-center">
    <div class="page">
      <v-form id="register-form" @submit.prevent="register()">
        <v-text-field
          v-model="username"
          label="Username"
          :error="!!errors.username"
          :error-messages="errors.username"
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="E-mail"
          :error="!!errors.email"
          :error-messages="errors.email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          type="password"
          label="Password"
          :error="!!errors.password"
          :error-messages="errors.password"
        ></v-text-field>
        <v-text-field
          v-model="repeatPassword"
          type="password"
          label="Repeat password"
          :error="!!errors.repeatPassword"
          :error-messages="errors.repeatPassword"
        ></v-text-field>

        <v-autocomplete
          v-model="country"
          :items="countries"
          item-text="name"
          label="Country"
          :error="!!errors.country"
          :error-messages="errors.country"
        ></v-autocomplete>

        <v-btn
          type="submit"
          form="register-form"
          class="mt-2"
          color="primary"
          block
        >
          Register
        </v-btn>
      </v-form>
      <GoogleLoginButton />
      <div class="mt-4 d-flex float-right align-center">
        <p class="mb-0 mr-3">Already have an account?</p>
        <v-btn @click="$router.push({ name: 'login' })"> Login </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { ref } from '@vue/composition-api'
const CountryList = require('country-list')

export default {
  name: 'Register',
  data() {
    return {
      countries: CountryList.getData(),
      username: '',
      password: '',
      repeatPassword: '',
      email: '',
      country: '',
      errors: {},
    }
  },
  methods: {
    async register() {
      const data = await this.$axios.$post('/user/register', {
        username: this.username,
        password: this.password,
        repeatPassword: this.repeatPassword,
        email: this.email,
        country: this.country,
      })
      if (data.errors) {
        this.errors = data.errors
        return
      }
      await this.$store.dispatch('getLoggedinUser')
      this.$router.push({ name: 'dashboard' })
    },
  },
}
</script>

<style lang="scss" scoped></style>
