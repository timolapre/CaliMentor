<template>
  <div class="register-container d-flex align-center justify-center">
    <div class="page">
      <v-btn block @click="$router.push({ name: 'account' })"> Back </v-btn>
      <h1 class="text-center mt-3">Edit account</h1>

      <div class="mt-5">
        <v-form id="update-account-form" @submit.prevent="saveAccount()">
          <v-text-field
            label="Username"
            v-model="user.username"
            :error="!!errors.username"
            :error-messages="errors.username"
          ></v-text-field>
          <v-text-field
            label="E-mail"
            v-model="user.email"
            :error="!!errors.email"
            :error-messages="errors.email"
          ></v-text-field>
          <v-btn
            type="submit"
            form="update-account-form"
            block
            color="primary"
            class="mt-3"
          >
            Save
          </v-btn>
        </v-form>
        <h3 class="mt-2" v-if="savedUser">Successfully updated account info</h3>
      </div>

      <div class="mt-15">
        <v-form id="change-password-form" @submit.prevent="changePassword()">
          <v-text-field
            type="password"
            label="Password"
            v-model="password"
            :error="!!errors.password"
            :error-messages="errors.password"
          ></v-text-field>
          <v-text-field
            type="password"
            label="Repeat password"
            v-model="repeatPassword"
            :error="!!errors.repeatPassword"
            :error-messages="errors.repeatPassword"
          ></v-text-field>
          <v-btn
            type="submit"
            form="change-password-form"
            block
            color="primary"
            class="mt-3"
            >Change password</v-btn
          >
          <h3 class="mt-2" v-if="savedPassword">
            Successfully updated password
          </h3>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { User } from '../../types'

export default {
  data() {
    return {
      user: {} as User,
      password: '',
      repeatPassword: '',
      savedUser: false,
      savedPassword: false,
      errors: [],
    }
  },
  methods: {
    async me() {
      const data = await this.$axios.$get('user/me')

      if (data.id) {
        this.user = data
      }
    },
    async saveAccount() {
      const data = await this.$axios.$post('user/me/update', {
        user: this.user,
      })

      await this.$store.dispatch('getLoggedinUser', true)

      this.errors = data.errors ? data.errors : {}
      if (data.user?.id) {
        this.savedUser = true
        setTimeout(() => {
          this.savedUser = false
        }, 3000)
      }
    },
    async changePassword() {
      const data = await this.$axios.$post('user/me/changepassword', {
        password: this.password,
        repeatPassword: this.repeatPassword,
      })

      this.errors = data.errors ? data.errors : {}
      if (data.user?.id) {
        this.savedPassword = true
        setTimeout(() => {
          this.savedPassword = false
        }, 3000)
      }
    },
  },
  created() {
    this.me()
  },
}
</script>

<style lang="scss" scoped></style>
