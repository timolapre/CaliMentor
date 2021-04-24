<template>
  <div class="register-container d-flex align-center justify-center">
    <div class="page text-center">
      <div v-if="!errors.invalid && !success">
        <h1>Reset password</h1>
        <v-form id="login-form" @submit.prevent="resetPassword()">
          <v-text-field
            type="password"
            v-model="password"
            label="Password"
            :error="!!errors.password"
            :error-messages="errors.password"
          ></v-text-field>
          <v-text-field
            type="password"
            v-model="repeatPassword"
            label="Repeat password"
            :error="!!errors.repeatPassword"
            :error-messages="errors.repeatPassword"
          ></v-text-field>
          <v-btn
            type="submit"
            form="login-form"
            class="mt-2"
            color="primary"
            block
          >
            Change password
          </v-btn>
        </v-form>
      </div>
      <div v-if="errors.invalid">
        <h2>Token not valid</h2>
      </div>
      <div v-if="success">
        <h2>Password successfully changed</h2>
        <v-btn
          block
          color="primary"
          class="mt-3"
          @click="$router.push({ name: 'login' })"
        >
          Login
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      password: '',
      repeatPassword: '',
      errors: {},
      success: false,
    }
  },
  methods: {
    async resetPassword() {
      const data = await this.$axios.$post('user/resetpassword', {
        password: this.password,
        repeatPassword: this.repeatPassword,
        token: this.$route.path.substring(
          this.$route.path.lastIndexOf('/') + 1
        ),
      })

      this.errors = data.errors ? data.errors : {}
      this.success = data.user ? true : false
    },
  },
}
</script>

<style lang="scss" scoped></style>
