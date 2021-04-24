<template>
  <div>
    <v-date-picker
      full-width
      v-model="date"
      :events="dateEvents"
      color="primary"
      event-color="orange accent-4"
      @update:picker-date="getHistory"
    ></v-date-picker>
    <div v-if="allowed">
      <HistoryCard
        class="mt-3 pa-3"
        v-for="h in showHistory"
        :key="h.id"
        :history="h"
      >
      </HistoryCard>
    </div>
    <v-card @click="$router.push({ name: 'upgrade' })" class="mt-2 pa-3" v-else>
      <h3>Upgrade to premium to see your full history</h3>
    </v-card>
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
    allowed() {
      if (this.$store.state.PREMIUMUSER) {
        return true
      }
      const date = new Date()
      const date2 = new Date(this.date)

      return date.getMonth() === date2.getMonth()
    },
  },
}
</script>
