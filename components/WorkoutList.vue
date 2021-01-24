<template>
  <div>
    <v-card
      class="my-4"
      :elevation="elevation"
      hover
      @click="$router.push({ name: 'workout-id', params: { id: workout.id } })"
    >
      <v-container class="text-center">
        <div class="workout-stats">
          <v-icon class="mr-0" x-small>fa-thumbs-up</v-icon>
          {{ workout.likes }}
          <v-icon class="mr-0 ml-3" x-small>fa-flag-checkered</v-icon>
          {{ workout.finishes }}
        </div>
        <h2 class="mb-sm-5 mb-6 mt-8 mt-sm-0">
          {{ workout.name }}
        </h2>
        <v-row justify="center" align="center" class="mb-sm-0 mb-2">
          <v-col class="py-1" cols="6" sm="2">
            <v-icon class="mr-1" small>fa-dumbbell</v-icon>
            {{ workout.type.text }}
          </v-col>
          <v-col cols="6" sm="2" class="d-flex justify-center py-1">
            <div class="text-left">
              <DifficultyBar class="mb-1" :difficulty="workout.difficulty.id" />
              {{ workout.difficulty.text }}
            </div>
          </v-col>
          <v-col class="py-1" cols="6" sm="2">
            <v-icon class="mr-1" small>fa-clock</v-icon>
            {{ workout.duration.text }}
          </v-col>
          <v-col class="py-1" cols="6" sm="2">
            <v-icon class="mr-1" small>fa-user</v-icon>
            {{ workout.user.username }}
          </v-col>
          <v-col class="py-1" cols="6" sm="2">
            <v-icon class="mr-1" small>fa-calendar-day</v-icon>
            {{ date }}
          </v-col>
          <v-col class="py-1" cols="6" sm="0"> </v-col>
        </v-row>
      </v-container>
    </v-card>
    <Ad v-if="index == 3 || (index > 3 && index % 10 == 0)" />
  </div>
</template>

<script>
import { Workout } from '~/types'

var moment = require('moment')
export default {
  name: 'WorkoutList',
  props: {
    workout: { type: Workout, default: () => {} },
    index: { type: Number, default: 0 },
  },
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
  methods: {},
}
</script>

<style lang="scss" scoped>
.workout-stats {
  position: absolute;
  margin: 0.3rem 0 0 0.5rem;
}
</style>
