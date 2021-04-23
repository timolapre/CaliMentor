<template>
  <div class="register-container d-flex align-center justify-center">
    <div v-if="loading" class="text-center"><Loading /></div>
    <div v-else class="mx-4 page">
      <div>
        <div class="workout-stats d-inline-block ml-4 px-1 py-1">
          <v-icon class="mr-1" x-small>fa-thumbs-up</v-icon>
          {{ workout.likes }}
        </div>
        <div class="workout-stats d-inline-block px-1 py-1">
          <v-icon class="mr-1" x-small>fa-flag-checkered</v-icon>
          {{ workout.finishes }}
        </div>
      </div>
      <div class="workoutlist difficultyborder">
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
      </div>

      <div class="d-flex justify-end mt-8" v-if="$store.state.LOGGEDIN">
        <v-row>
          <v-col cols="2" sm="1">
            <v-btn
              block
              :color="likeOrDislike == 1 ? 'primary' : ''"
              @click="likeWorkout(true)"
            >
              <v-icon small>fa-thumbs-up</v-icon>
            </v-btn>
            <!-- <div class="workout-stats">
            <v-icon class="mr-0 ml-3" x-small>fa-flag-checkered</v-icon>
            {{ workout.finishes }}
          </div> -->
          </v-col>
          <v-col cols="2" sm="1">
            <v-btn
              block
              :color="likeOrDislike == -1 ? 'red' : ''"
              @click="likeWorkout(false)"
            >
              <v-icon small>fa-thumbs-down</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="6" sm="3" class="ml-auto">
            <v-btn
              :color="favorited ? 'primary' : ''"
              block
              @click="favoriteWorkout"
            >
              <v-icon small class="mr-2">fa-heart</v-icon> Favorite
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <!-- <div class="d-flex justify-end">
        <v-switch
          v-model="NoSleepActive"
          label="Keep phone active"
          hide-details
        ></v-switch>
      </div> -->

      <div class="d-flex justify-center mt-4">
        <v-btn
          @click="
            $router.push({
              name: 'workout-start-id',
              params: { id: workout.id },
            })
          "
          block
          color="secondary"
          class="py-6"
          >Start workout</v-btn
        >
      </div>

      <!-- <div class="d-flex justify-center mt-4">
        <v-btn block>View full workout</v-btn>
      </div> -->

      <div
        class="d-flex justify-end mt-5"
        v-if="workout.user.id === $store.state.LOGGEDINUSER.id"
      >
        <v-row>
          <v-col cols="6">
            <v-dialog
              v-model="DeleteWorkoutDialog"
              persistent
              max-width="290"
              overlay-opacity="0.85"
              overlay-color="black"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn block v-bind="attrs" v-on="on">
                  <v-icon small>fa-trash</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline"> Delete workout </v-card-title>
                <v-card-text>
                  Are you sure you want to delete this workout permanently?
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="green"
                    text
                    @click="DeleteWorkoutDialog = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="red"
                    text
                    @click="
                      deleteWorkout()
                      DeleteWorkoutDialog = false
                    "
                  >
                    Delete
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col cols="6">
            <v-btn @click="editWorkout" block>
              <v-icon small>fa-pen</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <WorkoutBlock
        v-for="(block, i) in workout.blocks"
        :key="block.id"
        :block="block"
        @block-finish="blockFinishCount += 1"
        :index="i"
      />
      <Ad v-if="workout.blocks.length < 4" />

      <v-btn block @click="workoutFinished" v-if="!finished">Mark workout finished</v-btn>

      <Confetti :confetti="confetti" @false="confetti = false" />
    </div>
  </div>
</template>

<script lang="ts">
import moment from 'moment'
import NoSleep from 'nosleep.js'
import confetti from 'canvas-confetti'
import { log } from 'util'
import { Workout } from '../../types'

export default {
  data() {
    return {
      loading: true,
      workout: {} as Workout,
      creator: '',
      favorited: false,
      blockFinishCount: 0,
      likeOrDislike: 0,
      changedLike: 0,
      DeleteWorkoutDialog: false,
      NoSleep: null,
      NoSleepActive: false,
      error: null,
      confetti: false,
      finished: false,
    }
  },
  methods: {
    async getWorkout() {
      const id = this.$route.path.substring(
        this.$route.path.lastIndexOf('/') + 1
      )

      const data = await this.$axios.$post('workout/id', { id })

      if (data == 'unauthorized') {
        this.$router.push({ name: 'unauthorized' })
        return
      }

      this.creator = data.user?.username
      this.workout = data
      this.loading = false
      this.increaseView()
    },
    async getLike() {
      const id = this.$route.path.substring(
        this.$route.path.lastIndexOf('/') + 1
      )

      const data = await this.$axios.$post('workout/getlike', { id })
      this.likeOrDislike = data
    },
    async getFavorite() {
      const id = this.$route.path.substring(
        this.$route.path.lastIndexOf('/') + 1
      )

      const data = await this.$axios.$post('workout/getfavorite', { id })
      this.favorited = data
    },
    editWorkout() {
      this.$router.push({
        name: 'workout-edit-id',
        params: { id: this.workout.id },
      })
    },
    async deleteWorkout() {
      const data = await this.$axios.$post('workout/delete', {
        id: this.workout.id,
      })
      this.$router.push({
        name: 'workouts',
      })
    },
    async favoriteWorkout() {
      this.favorited = !this.favorited
      const data = await this.$axios.$post('workout/favorite', {
        id: this.workout.id,
      })
    },
    async likeWorkout(likeOrDislike) {
      this.likeOrDislike = likeOrDislike ? 1 : -1
      const data = await this.$axios.$post('workout/like', {
        id: this.workout.id,
        likeOrDislike,
      })

      this.workout.likes = data
    },
    async workoutFinished() {
      const data = await this.$axios.$post('workout/finish', {
        id: this.workout.id,
      })
      this.confetti = true
      this.finished = true
    },
    async increaseView() {
      const data = await this.$axios.$post('workout/view', {
        id: this.workout.id,
      })
    },
  },
  created() {
    this.getWorkout()
    if (this.$store.state.LOGGEDIN) {
      this.getLike()
      this.getFavorite()
    }
  },
  mounted() {
    this.NoSleep = new NoSleep()
  },
  computed: {
    date() {
      return moment(this.workout.createdAt).fromNow()
    },
    LOGGEDIN() {
      return this.$store.state.LOGGEDIN
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
  },
  watch: {
    blockFinishCount(x) {
      if (x == this.workout.blocks.length) {
        this.workoutFinished()
      }
    },
    LOGGEDIN(loggedin) {
      if (loggedin) {
        this.getLike()
        this.getFavorite()
      }
    },
    NoSleepActive(x) {
      if (x) {
        this.NoSleep.enable()
      } else {
        this.NoSleep.disable()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.workout-stats {
  border-radius: 4px;
  max-width: 100px;
  margin-right: auto;
}

.difficulty {
  border-radius: 10px;
  width: 150px;

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
</style>
