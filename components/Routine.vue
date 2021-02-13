<template>
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
          :color="i == (new Date().getDay() + 6) % 7 ? 'primary' : 'secondary'"
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
      block
      class="mt-5"
      color="primary"
      @click="searchWOD"
      v-if="todayType !== '' && todayType !== 'Rest'"
      >Search workout for today</v-btn
    >
    <h3 v-else-if="todayType == 'Rest'" class="mt-4">Enjoy your rest day</h3>
  </v-card>
</template>

<script lang="ts">
export default {
  data() {
    return {
      days: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
    }
  },
  methods: {
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
