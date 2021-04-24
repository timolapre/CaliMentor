<template>
  <div class="workout-container d-flex align-center justify-center">
    <LoggedInOnly />
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
        <v-row>
          <v-col
            v-for="(workout, i) in workouts"
            :key="workout.id"
            cols="12"
            md="6"
          >
            <WorkoutList
              :workout="workout"
              :index="i"
              @openExceededDialog="exceededWorkoutsLimitDialog = true"
            />
          </v-col>
        </v-row>
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
        <div class="pagination mt-7">
          <v-pagination
            :length="pagesCount"
            @input="changePage"
            :value="pageSelected"
          ></v-pagination>
        </div>
      </div>
    </div>

    <!-- Exceeded workout limit dialog -->
    <v-dialog
      v-model="exceededWorkoutsLimitDialog"
      max-width="500"
      overlay-opacity="0.85"
      overlay-color="black"
    >
      <v-card>
        <v-card-title class="headline">
          Monthly workout limit exceeded
        </v-card-title>
        <v-card-text>
          Well done working out this much! <br />
          Upgrade to a premium account to make use of endless workouts
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="text--secondary"
            text
            @click="exceededWorkoutsLimitDialog = false"
          >
            Later
          </v-btn>
          <v-btn color="green" text @click="$router.push({ name: 'upgrade' })">
            Upgrade
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      showWorkoutCount: 14,
      exceededWorkoutsLimitDialog: false,
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
    if (this.$route.query.exceeded) {
      this.exceededWorkoutsLimitDialog = true
    }
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

<style lang="scss" scoped>
.pagination {
  max-width: 90vw;
}
</style>
