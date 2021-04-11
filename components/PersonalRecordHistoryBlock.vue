<template>
  <v-card
    style="width: 100%"
    flat
    color="secondary"
    block
    class="py-1 px-2 my-1"
  >
    <h2>{{ history.count }}{{ append }}</h2>
    <p class="mb-0 text--disabled">{{ createdAt }}</p>
  </v-card>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    append: { type: String, default: 'x' },
    history: { type: Object, default: {} },
  },
  computed: {
    createdAt() {
      return moment(history.createdAt).format('DD-MM-YYYY')
    },
  },
}
</script>
