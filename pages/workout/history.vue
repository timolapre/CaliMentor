<template>
  <div class="d-flex align-center justify-center">
    <div class="page">
      <v-btn @click="$router.go(-1)" block>Back</v-btn>
      <h1 class="text-center my-5">Workout history</h1>
      <v-date-picker
        full-width
        v-model="date"
        :events="dateEvents"
        color="primary"
        event-color="orange accent-4"
        @update:picker-date="getHistory"
      ></v-date-picker>
      <HistoryCard
        class="mt-3 pa-3"
        v-for="h in showHistory"
        :key="h.id"
        :history="h"
      >
      </HistoryCard>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      history: [],
      date: new Date().toISOString().substr(0, 10),
      dateEvents: null,
    }
  },
  methods: {
    async getHistory(date) {
      this.history = await this.$axios.$post('workout/history', {
        date,
      })

      this.dateEvents = []
      this.history.forEach((h) => {
        const date = new Date(h.createdAt)
        this.dateEvents.push(date.toISOString().substr(0, 10))
      })
    },
  },
  created() {
    this.getHistory()
  },
  computed: {
    showHistory() {
      return this.history.filter((x) => x.createdAt.split('T')[0] == this.date)
    },
  },
}
</script>
