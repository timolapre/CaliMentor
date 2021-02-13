<template>
  <div class="d-flex align-center justify-center">
    <div class="page text-center">
      <v-btn @click="$router.go(-1)" block class="mb-10">Back</v-btn>

      <v-form id="pr-form" @submit.prevent="editGoal()">
        <v-date-picker
          full-width
          v-model="date"
          color="primary"
          event-color="orange accent-4"
          :disabled="noDate"
        ></v-date-picker>
        <v-checkbox
          v-model="noDate"
          hide-details
          label="No deadline date"
        ></v-checkbox>
        <v-row class="mx-0 mb-3 my-1">
          <v-col class="px-0 pb-0">
            <v-combobox
              flat
              solo
              dense
              hide-details
              background-color="secondary"
              :items="exercises"
              placeholder="Exercise"
              class="block-input"
              v-model="exercise"
            ></v-combobox>
          </v-col>
          <v-col
            cols="3"
            sm="2"
            class="d-flex align-center justify-end px-1 pb-0"
          >
            <v-text-field
              flat
              solo
              dense
              hide-details
              type="number"
              background-color="secondary"
              v-model="count"
            ></v-text-field>
          </v-col>
          <v-col
            cols="3"
            sm="2"
            class="d-flex align-center justify-end px-0 pb-0"
          >
            <v-select
              flat
              solo
              dense
              hide-details
              background-color="secondary"
              :items="['x', 's', 'm']"
              v-model="append"
            ></v-select>
          </v-col>
          <v-btn type="submit" form="pr-form" color="primary" class="mt-3" block
            >save</v-btn
          >
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      exercise: '',
      count: 1,
      append: 'x',
      noDate: false,
    }
  },
  methods: {
    async getGoal() {
      const id = this.$route.path.substring(
        this.$route.path.lastIndexOf('/') + 1
      )
      const data = await this.$axios.$post('goal/one', {
        id,
      })
      if (data) {
        this.exercise = data.exercise
        this.count = data.count
        this.append = data.append
        if (data.deadline) {
          this.date = data.deadline.substr(0, 10)
        } else {
          this.noDate = true
        }
      }
    },
    async editGoal() {
      const id = this.$route.path.substring(
        this.$route.path.lastIndexOf('/') + 1
      )

      const data = await this.$axios.$post('goal/edit', {
        id,
        exercise: this.exercise,
        count: this.count,
        append: this.append,
        deadline: this.noDate ? null : this.date,
      })

      this.$router.push({ name: 'dashboard' })
    },
  },
  async created() {
    await this.$store.dispatch('setWorkoutDurationOptions')
    this.getGoal()
  },
  computed: {
    exercises() {
      const exercises = []
      this.$store.state.EXERCISES?.forEach((exercise) => {
        exercises.push(exercise.name)
      })
      return exercises
    },
  },
}
</script>
