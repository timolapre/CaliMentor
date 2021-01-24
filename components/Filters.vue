<template>
  <div class="filter-container mb-3">
    <div class="filters">
      <!-- Type -->
      <v-select
        v-model="typeFilterSelect"
        class="pa-1 pt-4 ma-0"
        item-value="id"
        :items="typeFilter"
        label="Type"
      ></v-select>

      <!-- Difficulty -->
      <v-select
        v-model="difficultyFilterSelect"
        class="pa-1 ma-0"
        item-value="id"
        :items="difficultyFilter"
        label="Difficulty"
      ></v-select>

      <!-- Duration -->
      <v-select
        v-model="durationFilterSelect"
        class="pa-1 ma-0"
        item-value="id"
        :items="durationFilter"
        label="Duration"
      ></v-select>

      <!-- Creator -->
      <v-text-field
        class="pa-1 ma-0"
        label="Creator name"
        v-model="creatorSelect"
      ></v-text-field>

      <!-- Date -->
      <v-select
        v-model="dateFilterSelect"
        class="pa-1 ma-0"
        item-value="id"
        :items="dateFilter"
        label="Date"
      ></v-select>
    </div>
    <v-btn class="mb-2" block fluid @click="toggleFilters">
      <v-icon v-if="filtersOpen" class="mr-2" size="medium">fa-caret-up</v-icon>
      <v-icon v-else class="mr-2" size="medium">fa-caret-down</v-icon>
      Filters
    </v-btn>

    <div class="d-flex">
      <v-text-field
        v-model="searchName"
        filled
        class="pa-0 ma-0 rounded-tr-0 rounded-br-0"
        placeholder="Search..."
        dense
      ></v-text-field>
      <v-btn
        color="primary"
        class="rounded-tl-0 rounded-bl-0"
        height="2.6rem"
        @click="searchWorkouts"
        >Search
        <v-icon class="ml-2" size="medium">fa-search</v-icon>
      </v-btn>
    </div>

    <v-row v-if="$route.name == 'workouts'" class="mt-2 pb-1">
      <v-col cols="12" sm="4" class="py-1 pr-sm-1">
        <div>
          <v-btn
            :color="filterTop == 'likes' ? 'primary' : ''"
            @click="
              filterTop = 'likes'
              searchWorkouts()
            "
            block
          >
            <v-icon class="mr-2" x-small>fa-thumbs-up</v-icon>Most likes<v-icon
              class="ml-2"
              x-small
              >fa-long-arrow-alt-up</v-icon
            ></v-btn
          >
        </div>
      </v-col>
      <v-col cols="12" sm="4" class="py-1 px-sm-1">
        <div>
          <v-btn
            :color="filterTop == 'finishes' ? 'primary' : ''"
            @click="
              filterTop = 'finishes'
              searchWorkouts()
            "
            block
            :disabled="!$store.state.LOGGEDIN"
            :outlined="!$store.state.LOGGEDIN"
          >
            <v-icon class="mr-2" x-small>fa-flag-checkered</v-icon>
            Most finishes
            <v-icon class="ml-2" x-small>fa-long-arrow-alt-up</v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" sm="4" class="py-1 pl-sm-1">
        <div>
          <v-btn
            :color="filterTop == 'new' ? 'primary' : ''"
            @click="
              filterTop = 'new'
              searchWorkouts()
            "
            block
            :disabled="!$store.state.LOGGEDIN"
            :outlined="!$store.state.LOGGEDIN"
          >
            <v-icon class="mr-2" x-small>fa-calendar-week</v-icon>Newest<v-icon
              class="ml-2"
              x-small
            >
              fa-long-arrow-alt-up
            </v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row class="mt-5 mt-sm-2">
      <v-col cols="12" sm="4" class="py-1 pr-sm-1">
        <div>
          <v-btn block @click="RandomWorkout">
            <v-icon class="mr-2" small>fa-random</v-icon>Random workout</v-btn
          >
        </div>
      </v-col>
      <v-col cols="12" sm="4" class="py-1 px-sm-1">
        <div>
          <v-btn
            :color="meFilter ? 'primary' : ''"
            block
            @click="
              if ($store.state.LOGGEDIN) {
                meFilter = !meFilter
                searchWorkouts()
              } else {
                $router.push({ name: 'login' })
              }
            "
          >
            <v-icon class="mr-2" small>fa-user</v-icon>My workouts</v-btn
          >
        </div>
      </v-col>
      <v-col cols="12" sm="4" class="py-1 pl-sm-1">
        <div>
          <v-btn
            :color="favoritedFilter ? 'primary' : ''"
            block
            @click="
              if ($store.state.LOGGEDIN) {
                favoritedFilter = !favoritedFilter
                searchWorkouts()
              } else {
                $router.push({ name: 'login' })
              }
            "
          >
            <v-icon class="mr-2" small>fa-heart</v-icon>Favorited
            workouts</v-btn
          >
        </div>
      </v-col>
    </v-row>

    <div v-if="$route.name == 'workouts' && $store.state.LOGGEDIN" class="mt-4">
      <v-btn @click="$router.push({ name: 'workout-create' })" block>
        <v-icon class="mr-2" small>fa-dumbbell</v-icon>Create workout</v-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import { WORKOUT_DATE_OPTIONS } from '../constants'
export default {
  data() {
    return {
      searchName: '',
      typeFilterSelect: null,
      typeFilter: [],
      difficultyFilterSelect: null,
      difficultyFilter: [],
      durationFilterSelect: null,
      durationFilter: [],
      dateFilterSelect: null,
      dateFilter: [],
      creatorSelect: '',
      filtersOpen: false,
      favoritedFilter: false,
      filterTop: 'likes',
      meFilter: false,
    }
  },
  methods: {
    toggleFilters() {
      const filters = document.getElementsByClassName('filters')[0] as any

      if (this.filtersOpen) {
        filters.style.maxHeight = 0 + 'px'
        this.filtersOpen = false
      } else {
        filters.style.maxHeight = filters.scrollHeight + 'px'
        this.filtersOpen = true
      }
    },
    async searchWorkouts() {
      const query = {
        type: this.typeFilterSelect ? this.typeFilterSelect : undefined,
        difficulty: this.difficultyFilterSelect
          ? this.difficultyFilterSelect
          : undefined,
        duration: this.durationFilterSelect
          ? this.durationFilterSelect
          : undefined,
        date: this.dateFilterSelect ? this.dateFilterSelect : undefined,
        creator: this.creatorSelect !== '' ? this.creatorSelect : undefined,
        name: this.searchName !== '' ? this.searchName : undefined,
        favorited: this.favoritedFilter ? 1 : undefined,
        me: this.meFilter ? true : undefined,
        top: this.filterTop,
      }

      this.$router.push({ name: 'workouts', query })
    },
    setFilters() {
      const q = this.$route.query
      this.typeFilterSelect = this.typeFilter.filter(
        (x) => x.id == parseInt(q.type)
      )[0]?.id
      this.difficultyFilterSelect = this.difficultyFilter.filter(
        (x) => x.id == parseInt(q.difficulty)
      )[0]?.id
      this.durationFilterSelect = this.durationFilter.filter(
        (x) => x.id == parseInt(q.duration)
      )[0]?.id
      this.dateFilterSelect = this.dateFilter.filter(
        (x) => x.id == parseInt(q.date)
      )[0]?.id
      this.creatorSelect = q.creator
      this.searchName = q.name
      this.favoritedFilter = q.favorited
      this.filterTop = q.top ? q.top : 'likes'
      this.meFilter = q.me
    },
    async RandomWorkout() {
      const data = await this.$axios.$get('workout/random')
      this.$router.push({ name: 'workout-id', params: { id: data } })
    },
  },
  async created() {
    await this.$store.dispatch('setWorkoutTypeOptions')
    await this.$store.dispatch('setWorkoutDifficultyOptions')
    await this.$store.dispatch('setWorkoutDurationOptions')

    this.typeFilter = [{ id: 0, text: 'All' }].concat(
      this.$store.state.WORKOUT_TYPE_OPTIONS
    )
    this.difficultyFilter = [{ id: 0, text: 'All' }].concat(
      this.$store.state.WORKOUT_DIFFICULTY_OPTIONS
    )
    this.durationFilter = [{ id: 0, text: 'All' }].concat(
      this.$store.state.WORKOUT_DURATION_OPTIONS
    )
    this.dateFilter = [{ id: 0, text: 'All' }].concat(WORKOUT_DATE_OPTIONS)
    this.setFilters()
  },
}
</script>

<style lang="scss" scoped>
.center-container {
  width: 100%;
  margin: 0 2rem;
  max-width: 768px;
  margin-top: 5rem;
}

.filters {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}

.filter {
  width: 100%;
  margin-bottom: 0.5rem;
  background-color: $background-color-light;
  color: $white;
  border: none;

  option {
    outline: none;
  }

  &:focus {
    outline: none;
  }
}

.search-text {
  background-color: $background-color-light;
  color: $white;
  border: none;
}
</style>
