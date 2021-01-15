<template>
  <div class="workout-container d-flex align-center justify-center">
    <div class="page">
      <Filters class="mb-4" @search-workouts="getWorkouts" />

      <div v-if="loading" class="d-flex justify-center">
        <Loading />
      </div>
      <div v-else>
        <WorkoutList
          v-for="workout in workouts"
          :key="workout.id"
          :workout="workout"
        />
        <v-btn @click="getWorkouts" block>Load more...</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'

export default {
  data() {
    return {
      workouts: [],
      loading: true,
      skip: 0,
    }
  },
  methods: {
    async getWorkouts() {
      const q = this.$route.query
      var filters = {
        type: q.type,
        difficulty: q.difficulty,
        duration: q.duration,
        date: q.date,
        creator: q.creator,
      }
      const data = await this.$axios.$post('workout/search', {
        filters,
        take: 2,
        skip: this.skip,
      })

      this.skip += data.length
      this.workouts = this.workouts.concat(data)
      this.loading = false
    },
  },
  created() {
    this.getWorkouts()
  },
  watch: {
    $route(to, from) {
      this.loading = true
      this.skip = 0
      this.workouts = []
      this.getWorkouts()
    },
  },
}
</script>

<style lang="scss" scoped></style>
