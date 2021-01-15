<template>
  <div>
    <v-card
      class="my-4"
      :elevation="elevation"
      hover
      @click="$router.push({ name: 'workout-id', params: { id: workout.id } })"
    >
      <v-container class="text-center">
        <h2 class="mb-3">
          {{ workout.name }} <v-icon class="ml-10">fa-dumbbell</v-icon>
        </h2>
        <v-row>
          <v-col cols="6" sm="3" class="d-flex align-center justify-center">
            <div class="text-left">
              <DifficultyBar class="mb-1" :difficulty="workout.difficulty.id" />
              {{ workout.difficulty.text }}
            </div>
          </v-col>
          <v-col cols="6" sm="3">
            <v-icon class="mr-1" small>fa-clock</v-icon>
            {{ workout.duration.text }}
          </v-col>
          <v-col cols="6" sm="3">
            <v-icon class="mr-1" small>fa-user</v-icon>
            {{ workout.user.username }}
          </v-col>
          <v-col cols="6" sm="3">
            <v-icon class="mr-1" small>fa-calendar-day</v-icon>
            {{ date }}
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { Workout } from '~/types'

var moment = require('moment')
export default {
  name: 'WorkoutList',
  props: { workout: { type: Workout, default: () => {} } },
  data() {
    return {
      elevation: 3,
    }
  },
  computed: {
    date() {
      return moment(this.workout.createdAt).fromNow()
    },
  },
}
</script>

<style lang="scss" scoped></style>
