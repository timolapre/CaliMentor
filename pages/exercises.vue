<template>
  <div class="workout-container d-flex align-center justify-center">
    <div class="page">
      <v-btn
        v-for="(type, i) in types"
        :key="type"
        class="mx-2 my-1"
        @click="getExercises(i)"
        :color="selectedType == i ? 'primary' : ''"
      >
        {{ type }}
      </v-btn>
      <div v-if="loading" class="d-flex justify-center mt-5">
        <Loading />
      </div>
      <v-row v-if="!loading" class="mt-3">
        <v-col
          v-for="exercise in exercises"
          :key="exercise.name"
          cols="12"
          sm="6"
        >
          <Exercise :exercise="exercise" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      loading: true,
      selectedType: 0,
      types: [
        'All',
        'Back and Biceps',
        'Chest and Triceps',
        'Shoulders',
        'Legs',
        'Core',
        'Advanced',
        'Statics',
        'Freestyle',
      ],
      exercises: [],
    }
  },
  methods: {
    async getExercises(i) {
      this.loading = true
      this.selectedType = i

      const exercises = await this.$axios.$post('/exercise', {
        type: this.selectedType,
      })
      this.exercises = exercises
      this.loading = false
    },
    // async getAWSVideo() {
    //   AWS.config.setPromisesDependency()
    //   AWS.config.update({
    //     accessKeyId: process.env.AWS_S3_ACCESSKEY,
    //     secretAccessKey: process.env.AWS_S3_SECRETACCESSKEY,
    //     region: 'eu-west-2',
    //   })
    //   this.s3 = new AWS.S3()
    //   const response = await this.s3
    //     .getObject({ Bucket: 'calimentor', Key: 'exercises/Push ups.gif' })
    //     .promise()
    //   this.video = Buffer.from(response.Body).toString('base64')
    // },
  },
  async created() {
    this.getExercises(0)
  },
}
</script>
