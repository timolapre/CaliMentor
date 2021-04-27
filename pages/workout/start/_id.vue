<template>
  <div class="d-flex justify-center">
    <LoggedInOnly />
    <div v-if="loading" class="text-center"><Loading /></div>
    <div v-else class="mx-4 page">
      <div v-if="!workoutStarted">
        <v-btn
          @click="
            NoSleepActive = false
            $router.go(-1)
          "
          block
          class="mb-10"
          >Back</v-btn
        >
        <h1 class="text-center">Ready to start your workout?</h1>
        <p class="mt-5">
          After pressing the "I'M READY" button you will first get a small
          overview of the next exercises. This can be a circuit, EMOM, TABATA or
          something else. You can press the litte 'i' button next to it for more
          information.
        </p>
        <p class="mt-5">
          When ready, press start and your exercise will begin. A timer starts
          or you see the amount of repetitions you have to do. In most cases
          there is a video of the exercise. Press 'NEXT' when you did the
          exercise on screen.
        </p>
        <p class="mt-5">Press the "I'M READY" button and enjoy your workout!</p>
        <v-btn
          block
          @click="workoutStarted = true"
          class="py-8 next-button mt-10"
          color="secondary"
          >I'm ready!</v-btn
        >
      </div>
      <div v-else>
        <!-- Information header -->
        <div class="d-flex justify-center">
          <div class="workout-start-container d-flex justify-center">
            <div class="content">
              <div
                class="progress-bar-container rounded-pill d-flex align-center justify-center"
              >
                <div
                  class="percentage rounded-pill"
                  :class="
                    (progressCurrentExercise / progressTotalExercises) * 100 >=
                    50
                      ? 'green-bg'
                      : 'gray-bg'
                  "
                >
                  {{
                    Math.round(
                      (progressCurrentExercise / progressTotalExercises) * 100
                    )
                  }}%
                </div>
                <div
                  class="progress-bar rounded-pill"
                  :style="
                    'width: ' +
                    (progressCurrentExercise / progressTotalExercises) * 100 +
                    '%'
                  "
                ></div>
              </div>
              <div class="d-flex align-center mt-4 mb-2">
                <div v-if="!newBlock" class="mr-3">
                  <div class="d-flex">
                    <h3 class="text--secondary">
                      {{ currentBlockType }}
                    </h3>
                    <v-tooltip right data-html="true">
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          class="ml-3"
                          dark
                          small
                          v-bind="attrs"
                          v-on="on"
                        >
                          fa-info-circle
                        </v-icon>
                      </template>
                      <span>
                        {{ WORKOUT_BLOCK_OPTIONS_INFO[currentBlockType] }}
                      </span>
                    </v-tooltip>
                  </div>
                  <h4
                    class="text--secondary"
                    v-if="
                      ['Circuit', 'EMOM', 'TABATA'].includes(currentBlockType)
                    "
                  >
                    {{ currentSet + 1 }} / {{ currentBlockSetTotal }}
                  </h4>
                </div>
                <v-btn @click="nextBlock(true)">Skip</v-btn>
                <v-btn @click="stopWorkoutDialog = true" class="ml-auto"
                  >Stop</v-btn
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Exercise -->
        <div class="d-flex justify-center">
          <div v-if="!this.newBlock">
            <div
              v-if="
                !['Text', 'Rest'].includes(
                  workout.blocks[this.currentBlock].type
                )
              "
            >
              <Exercise
                v-if="
                  currentExercise &&
                  currentExercise.approved &&
                  currentExercise.video
                "
                :exercise="currentExercise"
                :selected="
                  workout.blocks[this.currentBlock].exercises[
                    this.currentExerciseCount
                  ].name
                "
                :reset="resetVideo"
                class="exercise-container"
              />
              <h3 class="text-center" v-else>
                {{
                  workout.blocks[this.currentBlock].exercises[
                    this.currentExerciseCount
                  ].name
                }}
              </h3>
            </div>
            <h3
              class="mt-3 mb-15"
              v-if="workout.blocks[this.currentBlock].type == 'Text'"
            >
              {{ workout.blocks[this.currentBlock].values[0] }}
            </h3>

            <div
              v-if="
                !['Text', 'TABATA', 'AMRAP'].includes(
                  workout.blocks[currentBlock].type
                )
              "
            >
              <h1 class="text-center font-weight-bold mt-3">
                {{
                  workout.blocks[this.currentBlock].exercises[
                    this.currentExerciseCount
                  ].count
                }}
                {{
                  workout.blocks[this.currentBlock].exercises[
                    this.currentExerciseCount
                  ].append
                }}
              </h1>
              <h3 class="text-center text--secondary mb-3">
                {{
                  workout.blocks[this.currentBlock].exercises[
                    this.currentExerciseCount
                  ].info
                }}
              </h3>
            </div>
          </div>
          <div style="width: 100%" v-else>
            <h1 class="text-center">Next</h1>
            <WorkoutBlock :block="workout.blocks[currentBlock]" />
          </div>
        </div>

        <!-- Ad -->
        <Ad
          class="my-3"
          v-if="
            (progressCurrentExercise + 3) % 6 == 0 ||
            (progressCurrentExercise + 3) % 7 == 0
          "
        />

        <!-- Next exercise buttons -->
        <div class="d-flex justify-center mt-5">
          <div class="next-button-container">
            <div
              v-if="
                ['Circuit', 'Single', 'For time', 'Text'].includes(
                  workout.blocks[currentBlock].type
                )
              "
            >
              <v-btn
                v-if="newBlock"
                block
                @click="nextExercise"
                class="py-10 next-button"
                color="secondary"
                >Start</v-btn
              >
              <v-btn
                v-else
                block
                @click="nextExercise"
                class="py-10 next-button"
                color="secondary"
                >Next</v-btn
              >
            </div>

            <v-btn
              v-if="
                ['EMOM', 'TABATA', 'AMRAP', 'Rest'].includes(
                  workout.blocks[currentBlock].type
                ) && !timerStarted
              "
              block
              @click="startTimer"
              class="py-10 next-button"
              color="secondary"
              >Start timer</v-btn
            >
            <div v-if="timerStarted" class="mt-3">
              <h3
                class="text-center text--secondary"
                v-if="
                  workout.blocks[currentBlock].type == 'TABATA' &&
                  actualTimerStarted
                "
              >
                {{ workOrRest }}
              </h3>
              <h1 class="text-center mt-1">
                {{ timer }}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Workout finished dialog -->
    <v-dialog
      v-model="workoutFinishedDialog"
      persistent
      max-width="350"
      overlay-opacity="0.85"
      overlay-color="black"
    >
      <v-card>
        <v-card-title class="headline"> Well done! </v-card-title>
        <v-card-text>
          {{ compliments[randomComplimentNumber] }}
        </v-card-text>

        <div class="d-flex justify-end my-3 mx-5">
          <v-row>
            <v-col class="pa-2" cols="6">
              <v-btn
                block
                :color="likeOrDislike == 1 ? 'primary' : 'secondary'"
                @click="likeWorkout(true)"
              >
                <v-icon small>fa-thumbs-up</v-icon>
              </v-btn>
            </v-col>
            <v-col class="pa-2" cols="6">
              <v-btn
                block
                :color="likeOrDislike == -1 ? 'red' : 'secondary'"
                @click="likeWorkout(false)"
              >
                <v-icon small>fa-thumbs-down</v-icon>
              </v-btn>
            </v-col>
            <v-col class="pa-2" cols="12">
              <v-btn
                :color="favorited ? 'primary' : 'secondary'"
                block
                @click="favoriteWorkout"
              >
                <v-icon small class="mr-2">fa-heart</v-icon> Favorite
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="$router.push({ name: 'dashboard' })">
            See history
          </v-btn>
          <v-btn text @click="$router.push({ name: 'workouts' })">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Stop workout dialog -->
    <v-dialog
      v-model="stopWorkoutDialog"
      max-width="350"
      overlay-opacity="0.85"
      overlay-color="black"
    >
      <v-card>
        <v-card-title class="headline"> Stop workout </v-card-title>
        <v-card-text>
          Are you sure you want to stop the workout halfway?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" text @click="stopWorkoutDialog = false">
            Cancel
          </v-btn>
          <v-btn color="red" text @click="stopWorkout"> Stop </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Confetti -->
    <Confetti :confetti="confetti" @false="confetti = false" />
  </div>
</template>

<script>
import moment from 'moment'
import NoSleep from 'nosleep.js'
import confetti from 'canvas-confetti'
import { log } from 'util'
import { Workout } from '../../../types'
import { WORKOUT_BLOCK_OPTIONS_INFO } from '../../../constants'

export default {
  data() {
    return {
      compliments: [
        'You look stronger already!',
        'WOOH another great workout done!',
        'You... are a BEAST!',
        'Enjoy the well deserved rest!',
        'Very very impressive!',
        'Muscle soreness incoming!',
        'That... was amazing!',
      ],
      randomComplimentNumber: 0,
      WORKOUT_BLOCK_OPTIONS_INFO: WORKOUT_BLOCK_OPTIONS_INFO,
      loading: true,
      workout: {},
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
      newBlock: true,
      currentExercise: null,
      currentExerciseCount: 0,
      currentBlock: 0,
      currentBlockSetTotal: 0,
      currentSet: 0,
      currentBlockType: '',
      totalExerciseCount: 0,
      resetVideo: false,
      progressCurrentExercise: 0,
      progressTotalExercises: 0,
      progressTotalExercisesBlock: [],
      timerStarted: false,
      actualTimerStarted: false,
      finished: false,
      timer: '',
      workOrRest: 'Work',
      timerInterval: null,
      workoutFinished: false,
      workoutFinishedDialog: false,
      stopWorkoutDialog: false,
      workoutStarted: false,
    }
  },
  methods: {
    async getWorkout() {
      const id = this.$route.path.substring(
        this.$route.path.lastIndexOf('/') + 1
      )

      const data = await this.$axios.$post('workout/id', { id })

      this.creator = data.user?.username
      this.workout = data
      this.loading = false
      this.increaseView()
      this.getExercise()

      this.setCurrentBlockSettings()
      this.calculateProgressTotalExercises()
    },
    async getExercise() {
      this.resetVideo = false
      const name = this.workout.blocks[this.currentBlock].exercises[
        this.currentExerciseCount
      ]?.name
      if (!name) {
        return
      }

      const data = await this.$axios.$post('exercise/id', {
        name,
      })

      this.currentExercise = data
      this.resetVideo = true
    },
    nextExercise() {
      if (this.newBlock) {
        this.newBlock = false
        this.getExercise()
        return
      }
      this.progressCurrentExercise++
      this.currentExerciseCount++

      const block = this.workout.blocks[this.currentBlock]
      if (
        this.currentExerciseCount >=
        this.workout.blocks[this.currentBlock].exercises.length
      ) {
        this.currentExerciseCount = 0
        if (['Circuit', 'Single', 'For time'].includes(block.type)) {
          this.currentSet++
        }
      }
      if (!['Circuit', 'Single', 'For time'].includes(block.type)) {
        this.currentSet++
      }

      if (this.currentSet >= this.currentBlockSetTotal) {
        this.nextBlock()
      }

      this.getExercise()
    },
    nextBlock(skip = false) {
      clearInterval(this.timerInterval)
      this.timerStarted = false

      if (skip) {
        this.progressCurrentExercise = this.progressTotalExercisesBlock
          .slice(0, this.currentBlock + 1)
          .reduce((a, b) => a + b, 0)
      }

      if (this.currentBlock >= this.workout.blocks.length - 1) {
        this.workoutfinish()
        return
      }

      this.currentExerciseCount = 0
      this.currentSet = 0
      this.currentBlock++
      this.newBlock = true
      this.setCurrentBlockSettings()
    },
    calculateProgressTotalExercises() {
      this.workout.blocks.forEach((e, i) => {
        if (e.type == 'Circuit') {
          this.progressTotalExercisesBlock[i] =
            parseInt(e.values[0]) * e.exercises.length
        } else if (['Single', 'For time'].includes(e.type)) {
          this.progressTotalExercisesBlock[i] = parseInt(e.exercises.length)
        } else if (e.type == 'EMOM') {
          this.progressTotalExercisesBlock[i] = parseInt(e.values[1])
        } else if (['AMRAP', 'Text'].includes(e.type)) {
          this.progressTotalExercisesBlock[i] = 1
        } else if (['TABATA'].includes(e.type)) {
          this.progressTotalExercisesBlock[i] = parseInt(e.values[0])
        }
      })
      this.progressTotalExercises = this.progressTotalExercisesBlock.reduce(
        (a, b) => a + b,
        0
      )
    },
    setCurrentBlockSettings() {
      const block = this.workout.blocks[this.currentBlock]
      this.currentBlockType = block.type
      if (['Circuit', 'TABATA'].includes(block.type)) {
        this.currentBlockSetTotal = block.values[0]
      } else if (block.type == 'EMOM') {
        this.currentBlockSetTotal = block.values[1]
      } else if (['Single', 'For time', 'AMRAP', 'Text'].includes(block.type)) {
        this.currentBlockSetTotal = 1
      }
    },
    startTimer() {
      this.nextExercise()
      this.timerStarted = true
      const block = this.workout.blocks[this.currentBlock]
      if (block.type == 'Rest') {
        this.startRestTimer(block)
      } else if (block.type == 'EMOM') {
        this.startEMOMTimer(block)
      } else if (block.type == 'AMRAP') {
        this.startAMRAPTimer(block)
      } else if (block.type == 'TABATA') {
        this.startTABATATimer(block)
      }
    },
    startRestTimer(block) {
      this.startActualTimer(
        block.values[1] == 'Minutes' ? block.values[0] : 0,
        block.values[1] == 'Seconds' ? block.values[0] : 0
      )
    },
    async startEMOMTimer(block) {
      await this.timerStartCountdown()
      this.startActualTimer(0, block.values[0], block.values[1])
    },
    async startAMRAPTimer(block) {
      await this.timerStartCountdown()
      this.startActualTimer(block.values[0])
    },
    async startTABATATimer(block) {
      await this.timerStartCountdown()
      this.startActualTimer(
        0,
        block.values[1],
        block.values[0] * 2,
        block.values[2]
      )
    },
    startActualTimer(minutes = 0, seconds = 0, resets = 0, seconds2 = 0) {
      this.actualTimerStarted = true
      var audioBeep = new Audio(require('../../../assets/sounds/countdown.wav'))
      var audioWork = new Audio(require('../../../assets/sounds/Work.mp3'))
      var audioRest = new Audio(require('../../../assets/sounds/Rest.mp3'))
      var audioHalfway = new Audio(
        require('../../../assets/sounds/Halfway.mp3')
      )
      var audioLastRound = new Audio(
        require('../../../assets/sounds/LastRound.mp3')
      )

      var duration = moment.duration({
        minutes: minutes,
        seconds: seconds,
      })

      var min = duration.minutes()
      var sec = duration.seconds()
      if (min < 10) min = '0' + min
      if (sec < 10) sec = '0' + sec
      this.timer = min + ':' + sec

      setTimeout(() => {
        duration = moment.duration(duration.asSeconds() - 1, 'seconds')
      }, 1000)

      this.timerInterval = setInterval(() => {
        var min = duration.minutes()
        var sec = duration.seconds()

        if (min < 10) min = '0' + min
        if (sec < 10) sec = '0' + sec

        if (min == 0 && sec == 3) {
          audioBeep.play()
        }

        if (
          minutes * 60 + seconds >= 20 &&
          min * 60 + sec == Math.floor((minutes * 60 + seconds) / 2)
        ) {
          audioHalfway.play()
        }

        this.timer = min + ':' + sec
        if (min == 0 && sec == 0) {
          setTimeout(() => {
            clearInterval(this.timerInterval)
            if (!seconds2) {
              //EMOM or AMRAP
              this.nextExercise()
              if (resets == 2) {
                audioLastRound.play()
              }
              if (resets > 1) {
                this.startActualTimer(minutes, seconds, resets - 1)
              } else {
                this.timerStarted = false
                this.actualTimerStarted = false
              }
            } else {
              //TABATA
              if (resets == 3) {
                audioLastRound.play()
              }
              if (resets > 2) {
                this.startActualTimer(minutes, seconds2, resets - 1, seconds)
                this.workOrRest = resets % 2 ? 'Work' : 'Rest'
                if (this.workOrRest == 'Work') {
                  audioWork.play()
                } else {
                  audioRest.play()
                  this.nextExercise()
                }
                if (resets % 2) {
                  // this.nextExercise()
                }
              }
              if (resets == 2) {
                this.nextExercise()
                this.timerStarted = false
                this.actualTimerStarted = false
              }
            }
          }, 950)
        }
        duration = moment.duration(duration.asSeconds() - 1, 'seconds')
      }, 1000)
    },
    timerStartCountdown() {
      return new Promise((resolve) => {
        var audioBeep = new Audio(
          require('../../../assets/sounds/countdown.wav')
        )
        var duration = moment.duration({
          seconds: 10,
        })

        var sec = duration.seconds()
        this.timer = 'Start in ' + sec

        this.timerInterval = setInterval(() => {
          duration = moment.duration(duration.asSeconds() - 1, 'seconds')
          var sec = duration.seconds()
          this.timer = 'Start in ' + sec
          if (sec == 3) {
            audioBeep.play()
          }
          if (sec == 0) {
            clearInterval(this.timerInterval)
            this.timer = ''
            resolve()
          }
        }, 1000)
      })
    },
    stopWorkout() {
      clearInterval(this.timerInterval)
      this.NoSleepActive = false
      this.$router.push({ name: 'workouts' })
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
    async workoutfinish() {
      this.randomComplimentNumber = Math.floor(
        Math.random() * this.compliments.length
      )
      this.workoutFinishedDialog = true
      this.workoutFinished = true
      const data = await this.$axios.$post('workout/finish', {
        id: this.workout.id,
      })
      this.confetti = true
      this.$store.state.LOGGEDINUSER.monthlyFinishes++
    },
    async increaseView() {
      const data = await this.$axios.$post('workout/view', {
        id: this.workout.id,
      })
    },
  },
  async created() {
    await this.$store.dispatch('getLoggedinUser')

    if (
      !this.$store.state.PREMIUMUSER &&
      this.$store.state.LOGGEDINUSER.monthlyFinishes >= 5
    ) {
      this.$router.push({ name: 'workouts', query: { exceeded: '1' } })
    } else if (this.$store.state.LOGGEDIN) {
      this.getWorkout()
      this.getLike()
      this.getFavorite()
    }
  },
  mounted() {
    this.NoSleep = new NoSleep()
    this.NoSleepActive = true
  },
  computed: {
    LOGGEDIN() {
      return this.$store.state.LOGGEDIN
    },
  },
  watch: {
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
.progress-bar {
  &-container {
    height: 6px;
    background-color: rgb(66, 66, 66);
    position: relative;

    .percentage {
      padding: 0 10px;
      z-index: 1;
    }

    .green-bg {
      background-color: $green;
    }
    .gray-bg {
      background-color: rgb(66, 66, 66);
    }
  }
  position: absolute;
  left: 0;
  height: 6px;
  background-color: $green;
}

.workout-start-container {
  padding: 2rem 1rem 0;
  position: absolute;
  overflow: hidden;
  width: 100%;
  top: 0;
  background-color: $background-color;
  .content {
    width: 100%;
    max-width: 768px;
  }
}

.exercise-container {
  max-width: 420px;
  width: 100%;
}

.next-button-container {
  max-width: 768px;
  width: 100%;
}
</style>
