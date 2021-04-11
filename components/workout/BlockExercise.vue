<template>
  <v-row>
    <v-col>
      <div class="d-flex align-center">
        <h3>{{ exercise.name }}</h3>
        <div v-if="hasVideo">
          <v-icon @click="showVideo = !showVideo" class="ml-3" dark small>
            fa-video
          </v-icon>
          <!-- <v-tooltip
            open-on-click
            top
            data-html="true"
            class="pa-0"
            v-model="showVideo"
          >
            <span>
              <Exercise v-if="exerciseData" :exercise="exerciseData" />
              <Loading v-else />
              <img
              class="ma-0"
              :src="require(`~/assets/images/exercises/${exercise.name}.gif`)"
              :alt="'Video of ' + exercise.name"
              width="200"
              height="auto"
            />
            </span>
          </v-tooltip> -->
          <v-dialog
            v-model="showVideo"
            max-width="500"
            overlay-opacity="0.9"
            overlay-color="black"
          >
            <v-card>
              <div v-if="exerciseData">
                <v-btn
                  small
                  @click="showVideo = false"
                  color="secondary"
                  class="close-icon"
                  min-width="0"
                >
                  <v-icon x-small>fa-times</v-icon>
                </v-btn>
                <Exercise
                  :exercise="exerciseData"
                  :selected="exercise.name"
                  :reset="showVideo"
                />
              </div>
              <Loading v-else />
            </v-card>
          </v-dialog>
        </div>
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
  data() {
    return {
      exerciseData: null,
      showVideo: false,
    }
  },
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
  watch: {
    async showVideo(x) {
      if (x && !this.exerciseData) {
        this.exerciseData = await this.$axios.$post('exercise/id', {
          name: this.exercise.name,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.close-icon {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
}
</style>
