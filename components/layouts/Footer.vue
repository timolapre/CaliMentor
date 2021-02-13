<template>
  <div>
    <v-footer class="d-none d-md-block text-center" absolute
      >&copy; CaliMentor</v-footer
    >
    <v-footer
      class="d-md-none d-flex justify-center align-center text-center"
      height="60rem"
      fixed
    >
      <!-- LOGGEDIN -->
      <div class="row" v-if="$store.state.LOGGEDIN">
        <div
          @click="$router.push({ name: 'workouts', query: { favorited: 0 } })"
          class="col-2 pb-1 cursor-pointer d-flex flex-column align-center"
        >
          <v-icon>fa-dumbbell</v-icon>
          <p class="small-text">workouts</p>
        </div>
        <div
          @click="$router.push({ name: 'workouts', query: { favorited: 1 } })"
          class="col-3 pb-1 cursor-pointer d-flex flex-column align-center"
        >
          <v-icon>fa-heart</v-icon>
          <p class="small-text">favorite</p>
        </div>

        <div
          class="col-2 pb-1 cursor-pointer d-flex flex-column align-center"
        ></div>

        <div
          @click="$router.push({ name: 'dashboard' })"
          class="col-3 pb-1 cursor-pointer d-flex flex-column align-center"
        >
          <v-icon>fa-chart-bar</v-icon>
          <p class="small-text">dashboard</p>
        </div>
        <div
          @click="$router.push({ name: 'account' })"
          class="col-2 pb-1 cursor-pointer d-flex flex-column align-center"
        >
          <v-icon>fa-user</v-icon>
          <p class="small-text">account</p>
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

      <!-- NOT LOGGED IN-->
      <div class="row" v-if="!$store.state.LOGGEDIN">
        <div
          @click="$router.push({ name: 'workouts' })"
          class="col-4 pb-1 cursor-pointer d-flex flex-column align-center"
        >
          <v-icon>fa-dumbbell</v-icon>
          <p class="small-text">workouts</p>
        </div>
        <div
          @click="$router.push({ name: 'register' })"
          class="col-4 pb-1 cursor-pointer d-flex flex-column align-center"
        >
          <v-icon>fa-user</v-icon>
          <p class="small-text">register</p>
        </div>
        <div
          @click="$router.push({ name: 'login' })"
          class="col-4 pb-1 cursor-pointer d-flex flex-column align-center"
        >
          <v-icon>fa-user</v-icon>
          <p class="small-text">login</p>
        </div>
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
</style>
