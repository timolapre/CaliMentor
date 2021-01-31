<template>
  <div class="workout-container d-flex align-center justify-center">
    <div class="page">
      <Filters
        class="mb-4"
        @search-workouts="getWorkouts"
        @reset-page="pageSelected = 1"
      />

      <div v-if="loading" class="d-flex justify-center">
        <Loading />
      </div>
      <div v-else class="mt-7">
        <div v-if="workouts.length == 0">
          <h2 class="text-center my-15">
            No workouts found with these filters
          </h2>
        </div>
        <WorkoutList
          v-for="(workout, i) in workouts"
          :key="workout.id"
          :workout="workout"
          :index="i"
        />
        <v-btn
          class="py-10 no-text-transform"
          color="primary"
          v-if="!$store.state.LOGGEDIN && workouts.length >= 1"
          block
          @click="$router.push({ name: 'register' })"
        >
          Please create an account <br />
          to see more workouts
        </v-btn>
        <!-- <v-btn
          class="py-10 px-1"
          color="primary"
          v-if="$store.state.LOGGEDIN && !$store.state.PREMIUMUSER"
          @click="$router.push({ name: 'account' })"
          block
          >Upgrade to a premium account <br />
          to see more workouts</v-btn
        > -->
        <!-- <v-btn
          v-if="
            moreWorkouts &&
            $store.state.LOGGEDIN &&
            ($store.state.PREMIUMUSER || workouts.length < 20)
          "
          @click="getWorkouts"
          block
          >Load more...</v-btn
        > -->
        <v-pagination
          v-if="$store.state.LOGGEDIN"
          :length="pagesCount"
          @input="changePage"
          :total-visible="7"
          :value="pageSelected"
        ></v-pagination>
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
      pageSelected: 1,
      pagesCount: null,
      showWorkoutCount: 15,
    }
  },
  methods: {
    async getWorkouts() {
      this.workouts = []
      const q = this.$route.query
      var filters = {
        type: q.type,
        difficulty: q.difficulty,
        duration: q.duration,
        date: q.date,
        creator: q.creator,
        date: q.date,
        name: q.name,
        top: q.top,
        favorited: q.favorited,
        me: q.me,
      }
      const data = await this.$axios.$post('workout/search', {
        filters,
        take: this.showWorkoutCount,
        skip: (q.page - 1) * this.showWorkoutCount || 0,
      })

      const workoutsCount = data[1]
      this.pagesCount = Math.ceil(workoutsCount / this.showWorkoutCount)

      this.workouts = this.workouts.concat(data[0])
      this.loading = false
    },
    changePage(page) {
      this.pageSelected = page
      this.$router.push({
        name: 'workouts',
        query: { ...this.$route.query, page },
      })
    },
  },
  async created() {
    this.pageSelected = parseInt(this.$route.query.page) || 1
    this.getWorkouts()
  },
  watch: {
    $route(to, from) {
      this.loading = true
      this.workouts = []
      this.getWorkouts()
    },
  },
}
</script>

<style lang="scss" scoped></style>
