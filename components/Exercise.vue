<template>
  <div>
    <v-card class="pa-3">
      <img
        loading="lazy"
        v-if="selectedExercise.video"
        class="ma-0"
        :src="`${bucket}/exercises/${selectedExercise.name}.${selectedExercise.fileType}`"
        :alt="'Video of ' + selectedExercise.name"
        width="100%"
        height="auto"
      />
      <img
        loading="lazy"
        v-else
        :src="require('~/assets/images/exercises/novideo.png')"
        alt="No Video"
        width="100%"
        height="auto"
      />
      <div>
        <div class="d-flex mt-2 align-center" v-if="exercises.length > 1">
          <v-btn
            height="38px"
            color="secondary"
            small
            :disabled="this.currentIndex == 0"
            @click="changeLevel(-1)"
          >
            <v-icon x-small>fa-minus</v-icon>
          </v-btn>
          <v-select
            background-color="secondary"
            v-model="selectedExerciseName"
            hide-details
            solo
            dense
            class="py-0 px-1"
            :items="exercises"
            item-text="name"
            item-value="name"
          ></v-select>
          <v-btn
            height="38px"
            color="secondary"
            small
            :disabled="this.currentIndex == this.exercises.length - 1"
            @click="changeLevel(1)"
          >
            <v-icon x-small>fa-plus</v-icon>
          </v-btn>
        </div>
        <h3 class="text-center" v-else>{{ selectedExerciseName }}</h3>
      </div>
    </v-card>
    <Ad v-if="(index - 2) % 18 == 0" />
  </div>
</template>

<script>
export default {
  props: { selected: {}, reset: {}, exercise: {}, index: {} },
  data() {
    return {
      bucket: process.env.AWS_S3_BUCKET,
      exercises: [
        ...this.exercise.levels.filter((x) => x.order < 0),
        this.exercise,
        ...this.exercise.levels.filter((x) => x.order >= 0),
      ],
      name: 'Test',
      selectedExerciseName: null,
    }
  },
  created() {
    this.selectedExerciseName = this.selected || this.exercise.name
  },
  methods: {
    changeLevel(i) {
      const newSelectedExercise = this.exercises[this.currentIndex + i]

      if (newSelectedExercise) {
        this.selectedExerciseName = newSelectedExercise.name
      }
    },
  },
  computed: {
    selectedExercise() {
      const exercise = this.exercises.filter(
        (x) => x.name == this.selectedExerciseName
      )[0]

      return exercise
    },
    currentIndex() {
      return this.exercises.indexOf(this.selectedExercise)
    },
  },
  watch: {
    reset(x) {
      if (x) {
        this.selectedExerciseName = this.selected || this.exercise.name
      }
    },
  },
}
</script>
