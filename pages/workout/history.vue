<template>
  <div class="d-flex align-center justify-center">
    <div class="page">
      <v-btn @click="$router.go(-1)" block>Back</v-btn>
      <h1 class="text-center my-5">Workout history</h1>
      <HistoryCard
        class="mb-2 pa-3"
        v-for="h in history"
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
    }
  },
  methods: {
    async getHistory() {
      this.history = await this.$axios.$get('workout/history')
    },
  },
  created() {
    this.getHistory()
  },
}
</script>
