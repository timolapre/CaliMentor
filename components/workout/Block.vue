<template>
  <div>
    <v-card class="my-4 workout">
      <v-container class="px-0">
        <div class="d-flex align-center">
          <h3 class="ml-5">
            {{ block.type }}
          </h3>
          <v-tooltip right data-html="true">
            <template v-slot:activator="{ on, attrs }">
              <v-icon class="ml-3" dark small v-bind="attrs" v-on="on">
                fa-info-circle
              </v-icon>
            </template>
            <span> {{ WORKOUT_BLOCK_OPTIONS_INFO[block.type] }} </span>
          </v-tooltip>

          <div v-if="!finished" class="ml-auto mr-3">
            <!-- Rest -->
            <div v-if="block.type === 'Rest'" class="d-flex align-center">
              <h3 class="mr-3">{{ timer }}</h3>
              <v-btn v-if="!timer" color="secondary" @click="startRestTimer">
                <v-icon dark x-small> fa-play </v-icon>
              </v-btn>
            </div>

            <!-- EMOM -->
            <div v-if="block.type === 'EMOM'" class="d-flex align-center">
              <h3 class="mr-4">{{ timer }}</h3>
              <h3 v-if="timer" class="mr-3">
                {{ setCount }} / {{ block.values[1] }}
              </h3>
              <v-btn v-if="!timer" color="secondary" @click="startEMOMTimer">
                <v-icon dark x-small> fa-play </v-icon>
              </v-btn>
            </div>

            <!-- AMRAP -->
            <div v-if="block.type === 'AMRAP'" class="d-flex align-center">
              <h3 class="mr-3">{{ timer }}</h3>
              <v-btn v-if="!timer" color="secondary" @click="startAMRAPTimer">
                <v-icon dark x-small> fa-play </v-icon>
              </v-btn>
            </div>

            <!-- TABATA -->
            <div v-if="block.type === 'TABATA'" class="d-flex align-center">
              <div class="d-flex flex-column mr-4 text-center">
                <p class="ma-0" v-if="timer">{{ workOrRest }}</p>
                <h3>{{ timer }}</h3>
              </div>
              <h3 v-if="timer" class="mr-3">
                {{ setCount }} / {{ block.values[0] }}
              </h3>
              <v-btn v-if="!timer" color="secondary" @click="startTABATATimer">
                <v-icon dark x-small> fa-play </v-icon>
              </v-btn>
            </div>

            <!-- Circuit -->
            <div
              class="d-flex align-center"
              v-if="['Circuit'].includes(block.type)"
            >
              <h3 class="mr-3">{{ setCount }} / {{ block.values[0] }}</h3>
              <v-btn color="secondary" @click="increaseCount">
                <v-icon dark x-small> fa-plus </v-icon>
              </v-btn>
            </div>

            <!-- Single, Text -->
            <div
              class="d-flex align-center"
              v-if="['Single', 'Text', 'For time'].includes(block.type)"
            >
              <v-btn
                color="secondary"
                @click="
                  finished = true
                  $emit('block-finish')
                "
                class="px-3 py-2"
              >
                Mark done
              </v-btn>
            </div>
          </div>
          <div v-else class="ml-auto mr-3">
            <v-card color="secondary" class="px-3 py-2" flat>
              Done
              <v-icon dark x-small> fa-check </v-icon>
            </v-card>
          </div>
        </div>
        <v-divider class="my-2"></v-divider>
        <div v-if="!['Rest', 'Text'].includes(block.type)">
          <WorkoutBlockExercise
            v-for="exercise in block.exercises"
            :key="exercise.id"
            class="mx-2"
            :exercise="exercise"
          >
          </WorkoutBlockExercise>
        </div>
        <div v-else-if="block.type === 'Rest'" class="text-center">
          <h3 class="ma-0">{{ block.values[0] }} {{ block.values[1] }}</h3>
        </div>
        <div v-else-if="block.type === 'Text'" class="text-center">
          <h3 class="mx-5">{{ block.values[0] }}</h3>
        </div>
        <v-divider
          v-if="!['Single', 'For time', 'Rest'].includes(block.type)"
          class="my-2"
        ></v-divider>

        <!-- Circuit -->
        <h3 v-if="block.type == 'Circuit'" class="text-center">
          {{ block.values[0] }} x
        </h3>

        <!-- EMOM -->
        <div v-if="block.type == 'EMOM'">
          <h3 class="text-center">Every {{ block.values[0] }} seconds</h3>
          <h3 class="text-center">for {{ block.values[1] }} minutes</h3>
        </div>

        <!-- AMRAP -->
        <h3 v-if="block.type == 'AMRAP'" class="text-center">
          {{ block.values[0] }} minutes
        </h3>

        <!-- TABATA -->
        <div v-if="block.type == 'TABATA'">
          <h3 class="text-center">{{ block.values[0] }} rounds</h3>
          <h3 class="text-center">{{ block.values[1] }} seconds work</h3>
          <h3 class="text-center">{{ block.values[2] }} seconds rest</h3>
        </div>
      </v-container>
    </v-card>
    <Ad v-if="index == 2 || (index > 5 && index % 5 == 0)" />
  </div>
</template>

<script>
import moment from 'moment'
import { Block } from '../../types'
import { WORKOUT_BLOCK_OPTIONS_INFO } from '../../constants'

export default {
  props: {
    block: { type: Block, default: () => {} },
    index: { type: Number, default: 0 },
  },
  data() {
    return {
      WORKOUT_BLOCK_OPTIONS_INFO: WORKOUT_BLOCK_OPTIONS_INFO,
      setCount: 1,
      finished: false,
      timer: '',
      workOrRest: 'Work',
    }
  },
  methods: {
    increaseCount() {
      this.setCount++
      if (this.setCount > this.block.values[0]) {
        this.$emit('block-finish')
        this.finished = true
      }
    },
    startRestTimer() {
      this.startTimer(0, this.block.values[0])
    },
    startEMOMTimer() {
      this.startTimer(0, this.block.values[0], this.block.values[1])
    },
    startAMRAPTimer() {
      this.startTimer(this.block.values[0])
    },
    startTABATATimer() {
      this.startTimer(
        0,
        this.block.values[1],
        this.block.values[0] * 2,
        this.block.values[2]
      )
    },
    startTimer(minutes = 0, seconds = 0, resets = 0, seconds2 = 0) {
      var duration = moment.duration({
        minutes: minutes,
        seconds: seconds,
      })
      this.totalSets = resets

      var min = duration.minutes()
      var sec = duration.seconds()
      if (min < 10 && min.length != 2) min = '0' + min
      if (sec < 10 && length.sec != 2) sec = '0' + sec
      this.timer = min + ':' + sec

      setTimeout(() => {
        duration = moment.duration(duration.asSeconds() - 1, 'seconds')
      }, 1000)

      var timer = setInterval(() => {
        var min = duration.minutes()
        var sec = duration.seconds()

        if (min < 10 && min.length != 2) min = '0' + min
        if (sec < 10 && length.sec != 2) sec = '0' + sec

        this.timer = min + ':' + sec
        if (min == 0 && sec == 0) {
          setTimeout(() => {
            if (resets > 1) {
              if (!seconds2) {
                this.startTimer(minutes, seconds, resets - 1)
                this.setCount++
              } else {
                this.startTimer(minutes, seconds2, resets - 1, seconds)
                this.workOrRest = resets % 2 ? 'Work' : 'Rest'
                if (resets % 2) {
                  this.setCount++
                }
              }
            } else {
              this.$emit('block-finish')
              this.finished = true
            }
            clearInterval(timer)
          }, 950)
        }
        duration = moment.duration(duration.asSeconds() - 1, 'seconds')
      }, 1000)
    },
  },
}
</script>

<style lang="scss" scoped></style>