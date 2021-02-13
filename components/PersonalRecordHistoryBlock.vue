<template>
  <v-card
    style="width: 100%"
    flat
    color="secondary"
    block
    class="py-1 px-2 my-1"
  >
    <div class="d-flex">
      <h2>{{ history.count }}{{ append }}</h2>
      <h2 class="mr-2 ml-auto">{{ createdAt }}</h2>
    </div>
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
