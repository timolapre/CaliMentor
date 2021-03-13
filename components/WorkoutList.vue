<template>
  <div>
    <NuxtLink :to="'/workout/' + workout.id">
      <v-card class="workoutlist my-4" :elevation="elevation" hover>
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
                <DifficultyBar
                  class="mb-1"
                  :difficulty="workout.difficulty.id"
                />
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
    </NuxtLink>
    <Ad v-if="index == 6" />
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'WorkoutList',
  props: {
    workout: { type: Object, default: () => {} },
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

a {
  text-decoration: none; /* no underline */
}
</style>
