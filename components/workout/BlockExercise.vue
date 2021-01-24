<template>
  <v-row>
    <v-col>
      <div class="d-flex align-center">
        <h3>{{ exercise.name }}</h3>
        <v-tooltip v-if="hasVideo" top data-html="true" class="pa-0">
          <template v-slot:activator="{ on, attrs }">
            <v-icon class="ml-3" dark small v-bind="attrs" v-on="on">
              fa-video
            </v-icon>
          </template>
          <span>
            <img
              class="ma-0"
              :src="require(`~/assets/images/exercises/${exercise.name}.gif`)"
              :alt="'Video of ' + exercise.name"
              width="200"
              height="auto"
            />
          </span>
        </v-tooltip>
      </div>
      <p v-if="exercise.info" class="ma-0">{{ exercise.info }}</p>
    </v-col>
    <v-col cols="3" class="d-flex align-center justify-end">
      <h3 class="ma-0">{{ exercise.count }} {{ exercise.append }}</h3>
    </v-col>
  </v-row>
</template>

<script lang="ts">
export default {
  props: { exercise: { type: Object, default: {} } },
  computed: {
    hasVideo() {
      const exercise = this.$store.state.EXERCISES?.filter(
        (x) => x.name == this.exercise.name
      )
      if (exercise?.length > 0) {
        return exercise[0].video || false
      }
      return false
    },
  },
}
</script>
