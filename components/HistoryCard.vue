<template>
  <v-card
    @click="
      $router.push({ name: 'workout-id', params: { id: history.workout.id } })
    "
  >
    <div class="d-flex px-1">
      <h3>{{ history.workout.name }}</h3>
      <h3 class="ml-auto">{{ date }}</h3>
    </div>
  </v-card>
</template>

<script lang="ts">
import moment from 'moment'

export default {
  props: { history: { default: {}, type: Object } },
  computed: {
    date() {
      return moment(this.history.createdAt).format('HH:mm')
    },
  },
}
</script>
