<template>
  <div class="d-flex my-1">
    <v-card
      style="width: 100%"
      flat
      :color="
        goal.deadline && new Date(goal.deadline) < new Date()
          ? 'red'
          : 'secondary'
      "
      block
      class="py-1 px-2 mr-1"
      @click="$router.push({ name: 'goal-id', params: { id: goal.id } })"
    >
      <div class="d-flex flex-sm-row flex-column">
        <h2>{{ goal.exercise }} {{ goal.count }}{{ goal.append }}</h2>
        <h2 class="mr-2 ml-auto">{{ deadline }}</h2>
      </div>
    </v-card>
    <v-btn
      height="44px"
      color="primary"
      class="align-self-center"
      x-small
      @click="goalDone"
    >
      <v-icon>fa-check</v-icon>
    </v-btn>
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
        return moment(this.goal.deadline).format('DD-MM-YYYY')
      } else {
        return ''
      }
    },
  },
}
</script>
