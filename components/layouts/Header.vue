<template>
  <div class="header-container">
    <div class="container d-flex align-center justify-center px-md-0 px-12">
      <h1 class="cursor-pointer pr-3" @click="$router.push({ name: 'index' })">
        CaliMentor
      </h1>
      <div
        class="ml-auto d-none d-md-flex justify-center align-center"
        v-if="$store.state.LOGGEDIN"
      >
        <v-btn @click="$router.push({ name: 'dashboard' })">
          <v-icon class="mr-2" small>fa-chart-bar</v-icon>Dashboard</v-btn
        >

        <v-btn
          class="ml-2 px-4"
          @click="
            $router.push({
              name: 'exercises',
            })
          "
        >
          <v-icon class="mr-2" small>fa-running</v-icon> Exercises
        </v-btn>

        <v-btn
          class="ml-2 px-4"
          @click="
            $router.push({
              name: 'workouts',
            })
          "
        >
          <v-icon class="mr-2" small>fa-dumbbell</v-icon> Workouts
        </v-btn>
        <!-- <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" class="ml-2 px-4">
              <v-icon class="mr-2" small>fa-dumbbell</v-icon> Workouts
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              link
              @click="
                $router.push({
                  name: 'workouts',
                  query: { favorited: 0, me: 0 },
                })
              "
            >
              <v-list-item-title v-text="'All workouts'"></v-list-item-title>
            </v-list-item>
            <v-list-item
              link
              @click="
                $router.push({
                  name: 'workouts',
                  query: { favorited: 0, me: 1 },
                })
              "
            >
              <v-list-item-title v-text="'My workouts'"></v-list-item-title>
            </v-list-item>
            <v-list-item
              link
              @click="
                $router.push({
                  name: 'workouts',
                  query: { favorited: 1, me: 0 },
                })
              "
            >
              <v-list-item-title
                v-text="'Favorited workouts'"
              ></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu> -->

        <v-btn class="ml-2" @click="$router.push({ name: 'workout-create' })">
          <v-icon class="mr-2" small>fa-plus</v-icon>Create workout</v-btn
        >

        <v-btn class="ml-2 px-1" @click="$router.push({ name: 'account' })">
          <v-icon small>fa-user</v-icon>
        </v-btn>

        <v-btn
          color="primary"
          class="ml-2"
          v-if="!$store.state.PREMIUMUSER"
          @click="$router.push({ name: 'upgrade' })"
        >
          Upgrade
        </v-btn>

        <!-- <v-btn class="v-btn ml-2" @click="logout">Logout</v-btn> -->
      </div>
      <div class="ml-auto d-none d-md-flex" v-else>
        <v-btn class="v-btn" @click="$router.push({ name: 'login' })"
          >Login</v-btn
        >
        <v-btn class="v-btn ml-2" @click="$router.push({ name: 'register' })"
          >Register</v-btn
        >
      </div>
      <div
        class="ml-auto d-flex d-md-none justify-self-end align-center"
        v-if="$store.state.LOGGEDIN"
      >
        <v-btn class="ml-2 px-1" @click="$router.push({ name: 'account' })">
          <v-icon small>fa-user</v-icon>
        </v-btn>
        <v-btn
          small
          color="primary"
          class="ml-2"
          v-if="!$store.state.PREMIUMUSER"
          @click="$router.push({ name: 'upgrade' })"
        >
          Upgrade
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Header',
  data() {
    return {}
  },
  methods: {
    async logout() {
      const data = await this.$axios.$get('user/logout')

      if (data) {
        await this.$store.dispatch('logoutUser')
      }
    },
  },
  async created() {
    await this.$store.dispatch('getLoggedinUser')
    await this.$store.dispatch('setExerciseOptions')
  },
})
</script>

<style lang="scss" scoped>
.header-container {
  padding: 0.5rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px $white solid;
}
</style>
