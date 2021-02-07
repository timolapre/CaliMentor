<template>
  <div>
    <!-- Achievements -->
    <v-card class="pa-4">
      <p class="text--disabled">Achievements</p>
      <v-row class="text-center">
        <v-col
          cols="3"
          sm="1"
          v-for="achievement in achievements"
          :key="achievement.id"
        >
          <Achievement v-bind:achievement="achievement" />
        </v-col>
      </v-row>
    </v-card>

    <!-- Routine -->
    <v-card class="mt-3 pa-4">
      <v-btn
        v-if="routine.difficulty"
        class="float-right"
        color="secondary"
        @click="$router.push({ name: 'routine' })"
      >
        <v-icon small>fa-pen</v-icon>
      </v-btn>
      <p class="text--disabled">Routine</p>
      <v-btn
        v-if="!routine.difficulty"
        class="float-right mb-2"
        color="primary"
        block
        @click="$router.push({ name: 'routine' })"
      >
        <v-icon small class="mr-2">fa-pen</v-icon>Configure routine
      </v-btn>
      <div v-if="routine.difficulty">
        <DifficultyBar class="mb-1" :difficulty="routine.difficulty" />
        {{ difficultyText }}
      </div>
      <v-row class="mt-1 px-2">
        <v-col v-for="(day, i) in days" :key="day" class="pa-1">
          <v-card
            flat
            :color="
              i == (new Date().getDay() + 6) % 7 ? 'primary' : 'secondary'
            "
            class="pa-1 text-center"
          >
            <p class="mb-0 day-text">{{ day }}</p>
            <!-- <v-icon class="my-1"
              >fa-{{ typeToIcon[routineType[day.toLowerCase()]] }}</v-icon
            > -->
            <p class="mb-0">
              {{ routineType[day.toLowerCase()] }}
            </p>
          </v-card>
        </v-col>
      </v-row>
      <v-btn
        class="mt-5"
        color="primary"
        @click="searchWOD"
        v-if="todayType !== '' && todayType !== 'Rest'"
        >Search workout for today</v-btn
      >
      <h3 v-else-if="todayType == 'Rest'" class="mt-4">Enjoy your rest day</h3>
    </v-card>

    <!-- Goals -->
    <v-card class="mt-3 pa-4">
      <p class="text--disabled">Goals</p>
      <v-row>
        <v-col v-for="pr in PRs" :key="pr.id" cols="12" sm="6" class="pa-1">
          <v-card
            flat
            color="secondary"
            block
            class="py-1 text-center"
            @click="$router.push({ name: 'pr-id', params: { id: pr.id } })"
          >
            <h2>{{ pr.exercise }} {{ pr.count }}{{ pr.append }}</h2>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" class="pa-1 d-flex align-center">
          <v-btn
            color="primary"
            @click="$router.push({ name: 'pr-add' })"
            outlined
            block
          >
            <h2>Add exercise</h2>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- Personal Records and progress -->
    <v-card class="mt-3 pa-4">
      <p class="text--disabled">Personal records</p>
      <v-row>
        <v-col v-for="pr in PRs" :key="pr.id" cols="12" sm="6" class="pa-1">
          <v-card
            flat
            color="secondary"
            block
            class="py-1 text-center"
            @click="$router.push({ name: 'pr-id', params: { id: pr.id } })"
          >
            <h2>{{ pr.exercise }} {{ pr.count }}{{ pr.append }}</h2>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" class="pa-1 d-flex align-center">
          <v-btn
            color="primary"
            @click="$router.push({ name: 'pr-add' })"
            outlined
            block
          >
            <h2>Add exercise</h2>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      PRs: [],
      achievements: [
        { id: 1, tooltip: 'Buy premium', icon: 'hand-holding-usd', size: '' },
        {
          id: 2,
          tooltip: 'Finish your first workout',
          icon: 'dumbbell',
          size: 'x-small',
        },
        {
          id: 3,
          tooltip: 'Finish 10 workouts',
          icon: 'dumbbell',
          size: 'small',
        },
        {
          id: 4,
          tooltip: 'Finish 25 workouts',
          icon: 'dumbbell',
          size: 'medium',
        },
        {
          id: 5,
          tooltip: 'Finish 100 workouts',
          icon: 'dumbbell',
          size: 'large',
        },
        {
          id: 6,
          tooltip: 'Create your first workout',
          icon: 'pen',
          size: 'x-small',
        },
        {
          id: 7,
          tooltip: 'Create 10 workouts',
          icon: 'pen',
          size: 'small',
        },
        {
          id: 8,
          tooltip: 'Create 25 workouts',
          icon: 'pen',
          size: 'medium',
        },
        {
          id: 9,
          tooltip: 'Create 100 workouts',
          icon: 'pen',
          size: 'large',
        },
      ],
      days: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      typeToIcon: {
        Rest: 'bed',
      },
    }
  },
  methods: {
    async getPersonalRecords() {
      const data = await this.$axios.$get('personalrecord/all')
      this.PRs = data || []
    },
    searchWOD() {
      this.$router.push({
        name: 'workouts',
        query: {
          difficulty: this.routine.difficulty,
          type: this.$store.state.WORKOUT_TYPE_OPTIONS.filter(
            (x) => x.text == this.todayType
          )[0].id,
        },
      })
    },
  },
  async beforeCreate() {
    await this.$store.dispatch('setWorkoutDifficultyOptions')
    await this.$store.dispatch('setWorkoutTypeOptions')
  },
  async created() {
    this.getPersonalRecords()
  },
  computed: {
    todayType() {
      const dayOfWeek = (new Date().getDay() + 6) % 7
      return this.routineType[Object.keys(this.routineType)[dayOfWeek]]
    },
    routine() {
      if (!this.$store.state.LOGGEDINUSER.routine) {
        return { days: {} }
      }
      try {
        return JSON.parse(this.$store.state.LOGGEDINUSER.routine)
      } catch (e) {
        return { days: {} }
      }
    },
    routineType() {
      if (!this.$store.state.WORKOUT_TYPE_OPTIONS) {
        return {}
      }
      const routine = {
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: '',
      }
      Object.keys(this.routine.days).forEach((day) => {
        const x = this.$store.state.WORKOUT_TYPE_OPTIONS.filter(
          (x) => x.id == this.routine.days[day]
        )[0]
        routine[day] = x ? x.text : 'Rest'
      })

      return routine
    },
    difficultyText() {
      if (!this.$store.state.WORKOUT_DIFFICULTY_OPTIONS) {
        return ''
      }
      const x = this.$store.state.WORKOUT_DIFFICULTY_OPTIONS.filter(
        (x) => x.id == this.routine.difficulty
      )
      if (x.length) {
        return x[0].text
      } else return ''
    },
  },
}
</script>

<style lang="scss" scoped>
.day-text {
  min-width: 90px;
}

.routine-text {
  font-size: small;
}
</style>
