<template>
  <v-card class="pa-5">
    <p class="text--disabled">Contact</p>
    <h3>
      Do you have a question, need help or have ideas to improve CaliMentor?
    </h3>
    <h3 class="mb-4">Please contact us!</h3>

    <v-row>
      <v-col cols="12" sm="6">
        <a class="d-flex mb-2" href="mailto:support@calimentor.com">
          <v-icon class="mr-2">fa-envelope</v-icon>
          <p class="ma-0">support@calimentor.com</p>
        </a>
      </v-col>
      <v-col cols="12" sm="6">
        <a
          target="_blank"
          href="https://www.instagram.com/cali.mentor/"
          class="d-flex"
        >
          <img
            class="ma-0 mr-2"
            :src="require(`~/assets/images/social/instagram.png`)"
            alt="instagram"
            width="25"
            height="auto"
          />
          <p class="ma-0">cali.mentor</p>
        </a>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
a {
  color: blue;
  text-decoration: none; /* no underline */
}
</style>
