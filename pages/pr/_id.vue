<template>
  <div class="d-flex align-center justify-center">
    <div class="page text-center">
      <v-btn @click="$router.go(-1)" block class="mb-10">Back</v-btn>

      <v-form id="pr-form" class="mb-5" @submit.prevent="addPersonalRecord()">
        <h1 color="secondary">{{ pr.exercise }}</h1>
        <div class="d-flex align-center mt-2">
          <v-text-field
            flat
            solo
            dense
            hide-details
            type="number"
            background-color="secondary"
            class="mr-4"
            v-model="pr.count"
          ></v-text-field>
          <h3 class="mr-4">{{ pr.append }}</h3>
        </div>
        <v-btn type="submit" form="pr-form" color="primary" class="mt-3" block
          >add</v-btn
        >
      </v-form>

      <PersonalRecordHistoryBlock
        v-for="h in pr.history"
        :key="h.id"
        :append="pr.append"
        :history="h"
      >
      </PersonalRecordHistoryBlock>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      pr: [],
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
        this.pr = data
      }
    },
    async addPersonalRecord() {
      const id = this.$route.path.substring(
        this.$route.path.lastIndexOf('/') + 1
      )

      const data = await this.$axios.$post('personalrecord/add', {
        id,
        count: this.pr.count,
      })
      this.getPersonalRecord()
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
