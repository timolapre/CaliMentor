<template>
  <div class="register-container d-flex align-center justify-center">
    <div class="page">
      <v-btn @click="$router.go(-1)" block class="mb-10">Back</v-btn>
      <h1 class="my-5 text-center">Routine</h1>

      <v-form id="routine-form" @submit.prevent="saveRoutine()">
        <v-select
          hide-details
          v-model="routine.difficulty"
          class="pa-1 ma-0 mb-10"
          item-value="id"
          :items="$store.state.WORKOUT_DIFFICULTY_OPTIONS"
          label="Difficulty"
        ></v-select>

        <v-row class="px-2 mb-5">
          <v-col v-for="day in days" :key="day" class="pa-1" cols="6" sm="3">
            <v-card flat class="pa-1 text-center" color="secondary">
              <p class="mb-0 day-text">{{ day }}</p>
              <v-select
                hide-details
                v-model="routine.days[day.toLowerCase()]"
                class="pa-1 ma-0 mb-1"
                item-value="id"
                :items="typeOptions"
              ></v-select>
            </v-card>
          </v-col>
        </v-row>

        <v-btn type="submit" form="routine-form" color="primary" block>
          <v-icon small class="mr-2">fa-save</v-icon> Save</v-btn
        >
      </v-form>
    </div>
  </div>
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
      routine: {
        difficulty: 1,
        days: {
          monday: 4,
          tuesday: -1,
          wednesday: 5,
          thursday: -1,
          friday: 6,
          saturday: 3,
          sunday: -1,
        },
      },
    }
  },
  methods: {
    async saveRoutine() {
      await this.$axios.$post('user/routine', { routine: this.routine })
      await this.$store.dispatch('getLoggedinUser', true)
      this.$router.push({ name: 'dashboard' })
    },
  },
  created() {
    this.routine = this.$store.state.LOGGEDINUSER.routine
      ? JSON.parse(this.$store.state.LOGGEDINUSER.routine)
      : this.routine
  },
  computed: {
    typeOptions() {
      return [
        { id: -1, text: 'Rest' },
        ...this.$store.state.WORKOUT_TYPE_OPTIONS,
      ]
    },
  },
}
</script>

<style lang="scss" scoped></style>
