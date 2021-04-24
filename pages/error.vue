<template>
  <div class="register-container d-flex align-center justify-center">
    <div class="mx-4 page text-center">
      <div>
        <h1>You need to login to view this page</h1>
        <v-row class="mt-3">
          <v-col cols="6">
            <v-btn block @click="$router.push({ name: 'login' })">Login</v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block @click="$router.push({ name: 'register' })"
              >Register</v-btn
            >
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
