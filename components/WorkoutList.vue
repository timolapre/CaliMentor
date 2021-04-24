<template>
  <div>
    <div>
      <div class="workout-stats d-inline-block px-3 mr-1 py-1">
        <v-icon class="mr-1" x-small>fa-thumbs-up</v-icon>
        {{ workout.likes }}
      </div>
      <div class="workout-stats d-inline-block px-3 py-1">
        <v-icon class="mr-1" x-small>fa-flag-checkered</v-icon>
        {{ workout.finishes }}
      </div>
    </div>
    <NuxtLink :to="allowedOpenWorkout ? '/workout/start/' + workout.id : ''">
      <v-card
        @click="checkAllowedOpenWorkout"
        class="workoutlist difficultyborder"
        :elevation="elevation"
        hover
      >
        <v-container class="pb-0 text-center">
          <div class="d-flex align-center justify-center">
            <div>
              <h2 class="font-weight-medium">
                {{ workout.name }}
              </h2>
              <p class="text--disabled mb-0">By {{ workout.user.username }}</p>
            </div>
          </div>
          <v-divider class="my-2" />
          <v-row justify="center" align="center" class="ma-0">
            <v-col class="pa-1" cols="4">
              <v-icon class="mr-1" small>fa-dumbbell</v-icon><br />
              <p class="ma-0 pt-1">
                {{ workout.type.text }}
              </p>
            </v-col>
            <v-col class="pa-1" cols="4">
              <v-icon class="mr-1" small>fa-clock</v-icon><br />
              <p class="ma-0 pt-1">
                {{ workout.duration.text }}
              </p>
            </v-col>
            <v-col class="pa-1" cols="4">
              <v-icon class="mr-1" small>fa-calendar-day</v-icon><br />
              <p class="ma-0 pt-1">
                {{ date }}
              </p>
            </v-col>
          </v-row>
          <div class="d-flex justify-center">
            <div class="difficulty mt-3" :class="difficultyColor">
              {{ workout.difficulty.text }}
            </div>
          </div>
        </v-container>
      </v-card>
    </NuxtLink>

    <!-- Ads -->
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
  methods: {
    checkAllowedOpenWorkout() {
      if (!this.allowedOpenWorkout) {
        this.$emit('openExceededDialog')
      }
    },
  },
  computed: {
    date() {
      return moment(this.workout.createdAt).fromNow()
    },
    difficultyColor() {
      const difficulty = this.workout.difficulty.id
      switch (difficulty) {
        case 1:
          return 'greencolor'
          break
        case 2:
          return 'orangecolor'
          break
        case 3:
          return 'redcolor'
          break
      }
    },
    allowedOpenWorkout() {
      return !(
        !this.$store.state.PREMIUMUSER &&
        this.$store.state.LOGGEDINUSER.monthlyFinishes >= 5
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.workout-stats {
  background-color: $black-tertiary;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  max-width: 100px;
  margin-right: auto;
}

a {
  text-decoration: none; /* no underline */
}

.difficulty {
  border-radius: 10px;
  width: 150px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;

  &.greencolor {
    background-color: $green;
  }

  &.orangecolor {
    background-color: $orange;
  }

  &.redcolor {
    background-color: $red;
  }
}

.difficultyborder {
  border-top-left-radius: 0px !important;
}
</style>
