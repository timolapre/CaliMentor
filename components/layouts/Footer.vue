<template>
  <div>
    <v-footer class="d-none d-md-block text-center" absolute>
      <div class="d-flex flex-row align-center justify-center">
        <div class="mr-5">&copy; CaliMentor</div>
        <a href="mailto:support@calimentor.com">
          <v-icon small>fa-envelope</v-icon>
        </a>
        <a
          target="_blank"
          rel="noopener"
          href="https://www.instagram.com/cali.mentor/"
          class="ml-4 d-flex align-center"
        >
          <img
            class="ma-0"
            :src="require(`~/assets/images/social/instagram.webp`)"
            alt="instagram"
            width="17"
            height="17"
          />
        </a>
      </div>
    </v-footer>
    <v-footer
      v-if="$store.state.LOGGEDIN && $route.name != 'workout-start-id'"
      class="d-md-none d-flex justify-center align-center text-center"
      height="60rem"
      fixed
    >
      <!-- LOGGEDIN -->
      <div class="row">
        <div
          @click="
            $router.push({ name: 'workouts', query: { favorited: undefined } })
          "
          class="col-3 pb-1 cursor-pointer d-flex flex-column align-center"
        >
          <v-icon>fa-dumbbell</v-icon>
          <p class="small-text">workouts</p>
        </div>

        <div
          @click="$router.push({ name: 'workouts', query: { favorited: 1 } })"
          class="col-2 pb-1 cursor-pointer d-flex flex-column align-center"
        >
          <v-icon>fa-heart</v-icon>
          <p class="small-text">favorite</p>
        </div>

        <div
          class="col-2 pb-1 cursor-pointer d-flex flex-column align-center"
        ></div>

        <div
          @click="$router.push({ name: 'exercises' })"
          class="col-2 pb-1 cursor-pointer d-flex flex-column align-center"
        >
          <v-icon>fa-running</v-icon>
          <p class="small-text">exercises</p>
        </div>

        <div
          @click="$router.push({ name: 'dashboard' })"
          class="col-3 pb-1 cursor-pointer d-flex flex-column align-center"
        >
          <v-icon>fa-chart-bar</v-icon>
          <p class="small-text">dashboard</p>
        </div>
      </div>
      <div class="add-button cursor-pointer" v-if="$store.state.LOGGEDIN">
        <v-btn
          fab
          max-width="50"
          max-height="50"
          @click="$router.push({ name: 'workout-create' })"
        >
          <v-icon>fa-plus</v-icon>
        </v-btn>
      </div>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'MenuFooter',
  data() {
    return {}
  },
  async created() {
    await this.$store.dispatch('getLoggedinUser')
  },
}
</script>

<style lang="scss" scoped>
.add-button {
  position: fixed;
  bottom: 25px;
}
.position-relative {
  position: relative;
}
.small-text {
  font-size: x-small;
  margin: 0;
  padding-top: 5px;
}

a {
  text-decoration: none; /* no underline */
}
</style>
