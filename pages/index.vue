<template>
  <div class="homepage-container d-flex align-center justify-center">
    <div class="page">
      <Filters />

      <div class="w-100 mt-2">
        <v-btn block elevation="5" color="primary" to="/workouts" class="py-7"
          >All workouts</v-btn
        >
      </div>

      <!-- Statistics -->
      <div class="mt-8 text-center">
        <v-row class="d-flex align-center">
          <v-col cols="12" sm="4">
            <v-card class="pa-7">
              <v-icon class="mb-5" large>fa-dumbbell</v-icon>
              <h2>{{ workoutCount }} Workouts</h2>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card class="pa-7">
              <v-icon class="mb-5" large>fa-users</v-icon>
              <h2>{{ userCount }} Users</h2>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card class="pa-7">
              <v-icon class="mb-5" large>fa-fist-raised</v-icon>
              <h2>A lot of gains</h2>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <div v-if="!$store.state.LOGGEDIN">
        <!-- Sporter and Creators -->
        <div class="mt-5 text-center">
          <v-row class="d-flex align-center">
            <v-col cols="12" sm="6" align-self="start">
              <v-card class="pa-7">
                <h1>Sporter</h1>
                <v-divider class="my-3"></v-divider>
                <div class="d-flex justify-center">
                  <div class="text-left">
                    <p class="mb-1">🏋️‍♀️ Get stronger</p>
                    <p class="mb-1">🏃‍♀️ Lose fat</p>
                    <p class="mb-1">💪 Build muscle</p>
                    <p class="mb-1">🤸‍♀️ Improve flexibility</p>
                    <p class="mb-1">🧘‍♂️ Reduce stress</p>
                  </div>
                </div>
                <v-divider class="my-3"></v-divider>
                <div class="d-flex justify-center">
                  <div class="text-left">
                    <p class="mb-1">Free account registration</p>
                    <p class="mb-1">Many workouts</p>
                    <p class="mb-1">Track your progress and personal records</p>
                    <p class="mb-1">Premium for way more features</p>
                    <p class="mb-1">Much more!</p>
                  </div>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" align-self="start">
              <v-card class="pa-7">
                <h1>Creator</h1>
                <v-divider class="my-3"></v-divider>
                <div class="d-flex justify-center">
                  <div class="text-left">
                    <p class="mb-1">💪 Save your workouts</p>
                    <p class="mb-1">🤝 Help people</p>
                    <p class="mb-1">👥 Get followers</p>
                    <p class="mb-1">🤑 Earn money</p>
                    <p class="mb-1">📅 Plan your own workout scheme</p>
                  </div>
                </div>
                <v-divider class="my-3"></v-divider>
                <div class="d-flex justify-center">
                  <div class="text-left">
                    <p class="mb-1">Free account registration</p>
                    <p class="mb-1">Easily create new workouts</p>
                    <p class="mb-1">Beautiful simple UI</p>
                    <p class="mb-1">Get paid monthly</p>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>
        <v-btn
          block
          class="mt-3"
          color="primary"
          @click="$router.push({ name: 'register' })"
        >
          Create account
        </v-btn>

        <!-- Free vs premium -->
        <div class="mt-10 text-center">
          <v-row class="d-flex align-center">
            <v-col cols="12" sm="6" align-self="start">
              <v-card class="pa-7">
                <h1>Free</h1>
                <v-divider class="my-3"></v-divider>
                <div class="d-flex justify-center">
                  <div class="text-left">
                    <p class="mb-1">✅ Access to all workouts</p>
                    <p class="mb-1">✅ Create your own workouts</p>
                    <p class="mb-1">✅ Favorite workouts</p>
                    <p class="mb-1">🟠 View workout history</p>
                    <p class="mb-1">🟠 Track progress and personal records</p>
                    <p class="mb-1">❌ Earn achievements</p>
                    <p class="mb-1">❌ Ads removed</p>
                  </div>
                </div>
                <v-btn
                  block
                  class="mt-3"
                  color="primary"
                  @click="$router.push({ name: 'register' })"
                >
                  Create account
                </v-btn>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" align-self="start">
              <v-card class="pa-7">
                <h1>Premium</h1>
                <p class="mb-0">&euro; 1,99 / month</p>
                <v-divider class="my-3"></v-divider>
                <div class="d-flex justify-center">
                  <div class="text-left">
                    <p class="mb-1">✅ Access to all workouts</p>
                    <p class="mb-1">✅ Create your own workouts</p>
                    <p class="mb-1">✅ Favorite workouts</p>
                    <p class="mb-1">✅ View workouts history</p>
                    <p class="mb-1">✅ Track progress and personal records</p>
                    <p class="mb-1">✅ Earn achievements</p>
                    <p class="mb-1">✅ Ads removed</p>
                  </div>
                </div>
                <v-btn
                  block
                  class="mt-3"
                  color="primary"
                  @click="$router.push({ name: 'register' })"
                >
                  Create account
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </div>

      <div v-else class="mt-5">
        <Routine />
        <v-row>
          <v-col cols="6">
            <v-card
              class="mt-5 pa-4 d-flex align-center justify-center flex-column text-center"
              @click="$router.push({ name: 'workout-create' })"
            >
              <v-icon class="mb-2">fa-plus</v-icon>
              <h3>Create workout</h3>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card
              class="mt-5 pa-4 d-flex align-center justify-center flex-column text-center"
              @click="
                $router.push({ name: 'workouts', query: { favorited: 1 } })
              "
            >
              <v-icon class="mb-2">fa-heart</v-icon>
              <h3>Favorited workouts</h3>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- <div class="mt-5">
        <div class="row">
          <div class="col-6">
            <v-btn block to="login">Login</v-btn>
          </div>
          <div class="col-6">
            <v-btn block to="register">Register</v-btn>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Index',
  data() {
    return {
      workoutCount: 0,
      userCount: 0,
    }
  },
  methods: {
    async getWorkoutCount() {
      const data = await this.$axios.$get('workout/count')
      this.workoutCount = data
    },
    async getUserCount() {
      const data = await this.$axios.$get('user/count')
      this.userCount = data
    },
  },
  mounted() {
    this.getWorkoutCount()
    this.getUserCount()
  },
  head() {
      return {
        title: "CaliMentor - The only calisthenics workouts you need",
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          {
            hid: 'description1',
            name: 'description2',
            content: 'My custom description'
          }
        ]
      }
}
</script>

<style lang="scss"></style>
