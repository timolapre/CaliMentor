<template>
  <div class="d-flex justify-center">
    <div v-if="loading" class="text-center"><Loading /></div>
    <div v-else class="mx-4 page">
      <div class="d-flex justify-center">
        <div class="workout-start-container d-flex justify-center">
          <div class="content">
            <div
              class="progress-bar-container rounded-pill d-flex align-center justify-center"
            >
              <div
                class="percentage rounded-pill"
                :class="
                  (progressCurrentExercise / progressTotalExercises) * 100 > 50
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
            <div class="d-flex align-center my-2">
              <div>
                <div class="d-flex">
                  <h3 class="text--secondary">
                    {{ currentBlockType }}
                  </h3>
                  <v-tooltip right data-html="true">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon class="ml-3" dark small v-bind="attrs" v-on="on">
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
              <v-btn @click="$router.go(-1)" class="ml-auto">Stop</v-btn>
            </div>
          </div>
        </div>
        <h3 v-if="!currentExercise">
          {{
            workout.blocks[this.currentBlock].exercises[
              this.currentExerciseCount
            ].name
          }}
        </h3>
        <Exercise
          v-if="
            currentExercise &&
            !['Text', 'Rest'].includes(workout.blocks[this.currentBlock].type)
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
        <h3
          class="mt-3 mb-15"
          v-if="workout.blocks[this.currentBlock].type == 'Text'"
        >
          {{ workout.blocks[this.currentBlock].values[0] }}
        </h3>
      </div>
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
      <div class="d-flex justify-center mt-5">
        <div class="next-button-container">
          <v-btn
            v-if="
              ['Circuit', 'Single', 'For time', 'Text'].includes(
                workout.blocks[currentBlock].type
              )
            "
            block
            @click="nextExercise"
            class="py-10 next-button"
            color="secondary"
            >Next</v-btn
          >
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
    <v-dialog
      v-model="workoutFinishedDialog"
      persistent
      max-width="290"
      overlay-opacity="0.9"
      overlay-color="black"
      style="z-index: 100"
    >
      <v-card>
        <v-card-title class="headline"> Well done! </v-card-title>
        <v-card-text> You have finished the workout. </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" text @click="workoutFinishedDialog = false">
            Cancel
          </v-btn>
          <v-btn color="red" text @click="workoutFinishedDialog = false">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Confetti
      :confetti="confetti"
      @false="confetti = false"
      style="z-index: 101"
    />
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
      timerStarted: false,
      actualTimerStarted: false,
      finished: false,
      timer: '',
      workOrRest: 'Work',
      timerInterval: null,
      workoutFinished: false,
      workoutFinishedDialog: false,
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
        if (this.currentBlock >= this.workout.blocks.length - 1) {
          this.workoutfinish()
          return
        }

        this.currentExerciseCount = 0
        this.currentSet = 0
        this.currentBlock++

        this.setCurrentBlockSettings()
      }

      this.getExercise()
    },
    calculateProgressTotalExercises() {
      this.workout.blocks.forEach((e) => {
        if (e.type == 'Circuit') {
          this.progressTotalExercises +=
            parseInt(e.values[0]) * e.exercises.length
        } else if (['Single', 'For time'].includes(e.type)) {
          this.progressTotalExercises += parseInt(e.exercises.length)
        } else if (e.type == 'EMOM') {
          this.progressTotalExercises += parseInt(e.values[1])
        } else if (['AMRAP', 'Text'].includes(e.type)) {
          this.progressTotalExercises += 1
        } else if (['TABATA'].includes(e.type)) {
          this.progressTotalExercises += parseInt(e.values[0])
        }
      })
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
      this.workoutFinished = true
      const data = await this.$axios.$post('workout/finish', {
        id: this.workout.id,
      })
      this.confetti = true
      this.workoutFinishedDialog = true
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
}

.next-button-container {
  max-width: 768px;
  width: 100%;
}
</style>
