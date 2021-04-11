<template>
  <div>
    <div class="d-flex">
      <v-card width="100%" class="py-2 px-5 rounded-r-0">
        <div class="d-flex">
          <h2>{{ goal.exercise }}</h2>
          <h2 class="ml-auto">{{ goal.count }}{{ goal.append }}</h2>
        </div>
        <p
          class="mb-0 text-left"
          :class="
            goal.deadline && new Date(goal.deadline) < new Date()
              ? 'red--text'
              : 'grey--text text-darken-4'
          "
        >
          {{ deadline }}
        </p>
      </v-card>
      <v-btn
        color="secondary"
        class="ml-auto rounded-l-0"
        height="auto"
        min-width="auto"
        small
        @click="goalDone"
      >
        <v-icon small>fa-check</v-icon>
      </v-btn>
    </div>
    <Confetti :confetti="confetti" @false="confetti = false" />
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      confetti: false,
    }
  },
  props: { goal: { type: Object, default: {} } },
  methods: {
    async goalDone() {
      this.confetti = true
      await this.$axios.$post('goal/done', { id: this.goal.id })
      setTimeout(() => {
        this.$emit('remove-goal', this.goal)
      }, 1)
    },
  },
  computed: {
    deadline() {
      if (this.goal.deadline) {
        return moment(this.goal.deadline).fromNow()
      } else {
        return 'No deadline'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.check-button {
  height: 100% !important;
}
</style>
