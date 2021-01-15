import axios from 'axios'
import { User } from '~/types'

export const strict = false

export const state = () => ({
  LOGGEDIN: false,
  LOGGEDINUSER: {} as User,
  WORKOUT_TYPE_OPTIONS: null,
  WORKOUT_DIFFICULTY_OPTIONS: null,
  WORKOUT_DURATION_OPTIONS: null,
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
  async getLoggedinUser({ state }: any) {
    if (!state.LOGGEDINUSER.id) {
      const data = (await this.$axios.$get('user/me')) as User
      state.LOGGEDIN = data.id ? true : false
      state.LOGGEDINUSER = data
    }
  },
  async logoutUser({ state }: any) {
    state.LOGGEDIN = false
    state.LOGGEDINUSER = {}
  },
}
