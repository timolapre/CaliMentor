<template>
  <div class="register-container d-flex align-center justify-center">
    <div class="page text-center">
      <div v-if="!message">
        <h1>Forgot password</h1>
        <v-form id="login-form" @submit.prevent="sendForgotPasswordEmail()">
          <v-text-field v-model="email" label="E-mail"></v-text-field>
          <v-btn
            type="submit"
            form="login-form"
            class="mt-2"
            color="primary"
            block
          >
            Send
          </v-btn>
        </v-form>
      </div>
      <div v-else>
        <h3 class="mt-4">{{ message }}</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      email: '',
      message: null,
    }
  },
  methods: {
    async sendForgotPasswordEmail() {
      const data = await this.$axios.$post('user/forgotpassword', {
        email: this.email,
      })
      this.message =
        'Email to reset password send (if your email address was found)'
    },
  },
}
</script>

<style lang="scss" scoped></style>
