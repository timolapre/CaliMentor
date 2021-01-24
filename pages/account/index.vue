<template>
  <div class="register-container d-flex align-center justify-center">
    <div class="page">
      <!-- <h1 class="text-center">Welcome {{ user.username }}</h1> -->
      <v-row class="mb-5">
        <v-col class="px-1">
          <v-btn block color="primary" @click="buyPremium">
            Upgrade to premium
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" class="px-1 py-1">
          <v-btn block @click="logout"
            ><v-icon class="mr-3" x-small>fa-sign-out-alt</v-icon> logout
          </v-btn>
        </v-col>
        <v-col cols="12" sm="6" class="px-1 py-1">
          <v-btn @click="$router.push({ name: 'account-edit' })" block>
            <v-icon class="mr-3" x-small>fa-user</v-icon> Edit account
          </v-btn>
        </v-col>
      </v-row>

      <v-row class="mt-7">
        <v-col cols="12" sm="6" class="px-1 py-1">
          <v-btn
            block
            @click="$router.push({ name: 'workouts', query: { me: true } })"
          >
            <v-icon class="mr-3" x-small>fa-dumbbell</v-icon> My workouts
          </v-btn>
        </v-col>
        <v-col cols="12" sm="6" class="px-1 py-1">
          <v-btn
            color="primary"
            block
            @click="$router.push({ name: 'workout-create' })"
          >
            <v-icon class="mr-3" x-small>fa-dumbbell</v-icon> Create workout
          </v-btn>
        </v-col>
      </v-row>

      <!-- Achievements -->
      <div class="mt-15 text-center">
        <h1>Achievements</h1>
        <v-row class="mt-3">
          <v-col
            cols="4"
            sm="2"
            v-for="achievement in achievements"
            :key="achievement.id"
          >
            <Achievement v-bind:achievement="achievement" />
          </v-col>
        </v-row>
      </div>

      <!-- Personal Records and progress -->
      <div class="mt-15 text-center">
        <h1>Personal records and progress</h1>
        <p>click on an exercise to see the history or edit</p>
        <v-row class="mt-1">
          <v-col cols="12" sm="6" class="py-1">
            <v-btn block class="py-1">
              <h2>Push Ups: 10</h2>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" class="py-1">
            <v-btn block class="py-1">
              <h2>Push Ups: 10</h2>
            </v-btn>
          </v-col>
        </v-row>
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
      myWorkouts: [],
      achievements: [
        { id: 1, tooltip: 'Buy premium', icon: 'hand-holding-usd', size: '' },
        {
          id: 2,
          tooltip: 'Finish your first workout',
          icon: 'dumbbell',
          size: 'x-small',
        },
        {
          id: 3,
          tooltip: 'Finish 10 workouts',
          icon: 'dumbbell',
          size: 'small',
        },
        {
          id: 4,
          tooltip: 'Finish 25 workouts',
          icon: 'dumbbell',
          size: 'medium',
        },
        {
          id: 5,
          tooltip: 'Finish 100 workouts',
          icon: 'dumbbell',
          size: 'large',
        },
        {
          id: 6,
          tooltip: 'Create your first workout',
          icon: 'pen',
          size: 'x-small',
        },
        {
          id: 7,
          tooltip: 'Create 10 workouts',
          icon: 'pen',
          size: 'small',
        },
        {
          id: 8,
          tooltip: 'Create 25 workouts',
          icon: 'pen',
          size: 'medium',
        },
        {
          id: 9,
          tooltip: 'Create 100 workouts',
          icon: 'pen',
          size: 'large',
        },
      ],
    }
  },
  methods: {
    async logout() {
      const data = await this.$axios.$get('user/logout')

      if (data) {
        await this.$store.dispatch('logoutUser')
        this.$router.push({ name: 'login' })
      }
    },
    async buyPremium() {
      const data = await this.$axios.$post('payment/create-checkout-session')
      this.$stripe
        .redirectToCheckout({
          sessionId: data.sessionId,
        })
        .then(() => {
          console.log('did it wkr?')
        })
      console.log('charge premium', data)
    },
  },
}
</script>

<style lang="scss" scoped></style>
