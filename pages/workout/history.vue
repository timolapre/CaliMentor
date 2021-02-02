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
      <h3 class="mt-5 text-center" v-if="history.length == 0">Your workout history will be shown here</h3>
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
