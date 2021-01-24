<template>
  <div class="d-flex align-center justify-center">
    <div class="page text-center">
      <v-btn @click="$router.go(-1)" block class="mb-10">Back</v-btn>

      <v-form id="pr-form" @submit.prevent="editPersonalRecord()">
        <v-row class="mx-2 mb-3">
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
      exercise: '',
      count: 1,
      append: 'x',
    }
  },
  methods: {
    async getPersonalRecord() {
      const id = this.$route.path.substring(
        this.$route.path.lastIndexOf('/') + 1
      )
      const data = await this.$axios.$post('personalrecord/one', {
        id,
      })
      if (data) {
        this.exercise = data.exercise
        this.count = data.count
        this.append = data.append
      }
    },
    async editPersonalRecord() {
      const id = this.$route.path.substring(
        this.$route.path.lastIndexOf('/') + 1
      )

      const data = await this.$axios.$post('personalrecord/edit', {
        id,
        exercise: this.exercise,
        count: this.count,
        append: this.append,
      })

      this.$router.push({ name: 'account' })
    },
  },
  async created() {
    await this.$store.dispatch('setWorkoutDurationOptions')
    this.getPersonalRecord()
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
