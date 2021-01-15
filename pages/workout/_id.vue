<template>
  <div class="register-container d-flex align-center justify-center">
    <div v-if="loading" class="text-center"><Loading /></div>
    <div v-else class="mx-4 page">
      <v-btn @click="$router.go(-1)" block>Back</v-btn>
      <v-container class="text-center mb-5">
        <h1 class="mb-3">
          {{ workout.name }} <v-icon class="ml-10">fa-dumbbell</v-icon>
        </h1>
        <v-row>
          <v-col
            cols="6"
            sm="3"
            class="pb-1 d-flex align-center justify-center"
          >
            <div class="text-left">
              <DifficultyBar class="mb-1" :difficulty="workout.difficulty.id" />
              {{ workout.difficulty.text }}
            </div>
          </v-col>
          <v-col cols="6" sm="3" class="pb-1">
            <v-icon class="mr-1" small>fa-clock</v-icon>
            {{ workout.duration.text }}
          </v-col>
          <v-col cols="6" sm="3" class="pb-1">
            <v-icon class="mr-1" small>fa-user</v-icon>
            {{ creator }}
          </v-col>
          <v-col cols="6" sm="3" class="pb-1">
            <v-icon class="mr-1" small>fa-calendar-day</v-icon>
            {{ date }}
          </v-col>
        </v-row>
        <h3 class="mb-3 mt-4" v-if="workout.description !== ''">
          {{ workout.description }}
        </h3>
      </v-container>
      <div class="d-flex justify-end mt-5">
        <v-row>
          <v-col cols="4">
            <v-btn block>
              <v-icon small>fa-thumbs-up</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn block>
              <v-icon small>fa-thumbs-down</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn block>
              <v-icon small>fa-heart</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>
      <div
        class="d-flex justify-end mt-5"
        v-if="workout.user.id === $store.state.LOGGEDINUSER.id"
      >
        <v-row>
          <v-col cols="6">
            <v-btn @click="deleteWorkout" block>
              <v-icon small>fa-trash</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn @click="editWorkout" block>
              <v-icon small>fa-pen</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <WorkoutBlock
        v-for="block in workout.blocks"
        :key="block.id"
        :block="block"
      />
    </div>
  </div>
</template>

<script lang="ts">
import moment from 'moment'
import { log } from 'util'
import { Workout } from '../../types'

export default {
  data() {
    return {
      loading: true,
      workout: {} as Workout,
      creator: '',
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
  },
  created() {
    this.getWorkout()
  },
  computed: {
    date() {
      return moment(this.workout.createdAt).fromNow()
    },
  },
}
</script>

<style lang="scss" scoped></style>
