import axios from 'axios'
import { User } from '../types'

export const strict = false

export const state = () => ({
  LOGGEDIN: false,
  LOGGEDINUSER: {} as User,
  PREMIUMUSER: false,
  WORKOUT_TYPE_OPTIONS: null,
  WORKOUT_DIFFICULTY_OPTIONS: null,
  WORKOUT_DURATION_OPTIONS: null,
  EXERCISES: null,
})

export const mutations = {}

export const actions = {
  async setWorkoutTypeOptions({ state }: any) {
    if (!state.WORKOUT_TYPE_OPTIONS) {
      const data = await this.$axios.$get('workout/types')
      state.WORKOUT_TYPE_OPTIONS = data
    }
  },
  async setWorkoutDifficultyOptions({ state }: any) {
    if (!state.WORKOUT_DIFFICULTY_OPTIONS) {
      const data = await this.$axios.$get('workout/difficulties')
      state.WORKOUT_DIFFICULTY_OPTIONS = data
    }
  },
  async setWorkoutDurationOptions({ state }: any) {
    if (!state.WORKOUT_DURATION_OPTIONS) {
      const data = await this.$axios.$get('workout/durations')
      state.WORKOUT_DURATION_OPTIONS = data
    }
  },
  async setExerciseOptions({ state }: any) {
    if (!state.EXERCISES) {
      const data = await this.$axios.$get('exercise')
      // const exercises = []
      // data.forEach((exercise) => {
      //   exercises.push(exercise.name)
      // })
      state.EXERCISES = data
    }
  },
  async getLoggedinUser({ state }: any, force = false) {
    if (!state.LOGGEDINUSER.id || force) {
      const data = (await this.$axios.$get('user/me')) as User
      state.LOGGEDIN = data.id ? true : false
      state.PREMIUMUSER =
        data.type == 'premium' ||
        data.type == 'gifted_premium' ||
        data.type == 'canceled'
          ? true
          : false
      state.LOGGEDINUSER = data
    }
  },
  async logoutUser({ state }: any) {
    state.LOGGEDIN = false
    state.PREMIUMUSER = false
    state.LOGGEDINUSER = {}
  },
}
