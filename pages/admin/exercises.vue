<template>
  <div class="d-flex align-center justify-center">
    <div class="page">
      <v-card class="pa-3 mt-5">
        <h1 class="text-center">Exercises</h1>
        <v-form id="add-exercise-form" @submit.prevent="addExercise()">
          <v-text-field
            label="Exercise name"
            v-model="exerciseName"
          ></v-text-field>
          <p v-if="exerciseMessage">{{ exerciseMessage }}</p>
          <v-btn
            type="submit"
            form="add-exercise-form"
            class="mt-1"
            color="primary"
            block
          >
            Add exercise
          </v-btn>
        </v-form>

        <div class="mt-5">
          <div v-for="exercise in notApprovedExercises" :key="exercise.id">
            <div class="d-flex align-center">
              <h2>{{ exercise.name }}</h2>
              <v-btn
                small
                color="primary"
                class="ml-3 ml-auto"
                @click="
                  exercise.approved = true
                  approveExercise(exercise.name)
                "
                >Approve</v-btn
              >
              <v-btn
                small
                color="red"
                class="ml-3"
                @click="deleteExercise(exercise.name)"
                >X</v-btn
              >
            </div>
            <v-divider color="gray"></v-divider>
          </div>
          <div class="mt-8">
            <div class="d-flex">
              <h2 class="mr-2">Search</h2>
              <v-text-field flat dense v-model="searchExercise"></v-text-field>
            </div>
            <div v-for="exercise in approvedExercisesSearch" :key="exercise.id">
              <AdminExercise :exercise="exercise" />
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      searchExercise: '',
      exerciseName: '',
      exerciseMessage: null,
      exercisesInfo: null,
    }
  },
  methods: {
    async addExercise() {
      const data = await this.$axios.$post('admin/exercises/add', {
        name: this.exerciseName,
      })

      this.exerciseName = ''
      this.exerciseMessage = data?.message
      setTimeout(() => {
        this.exerciseMessage = null
      }, 2000)
    },
    async approveExercise(name) {
      const data = await this.$axios.$post('admin/exercises/approve', {
        name,
      })
    },
    async deleteExercise(name) {
      const data = await this.$axios.$post('admin/exercises/delete', {
        name,
      })
      this.exercisesInfo = this.exercisesInfo.filter((x) => x.name != name)
    },
  },
  async created() {
    await this.$store.dispatch('getLoggedinUser')
    if (this.$store.state.LOGGEDINUSER?.username?.toLowerCase() !== 'timo') {
      this.$router.push({ name: 'index' })
      return
    }

    const exercisesData = await this.$axios.$get('admin/exercises/info')
    this.exercisesInfo = exercisesData
  },
  computed: {
    approvedExercises() {
      return this.exercisesInfo?.filter((x) => x.approved == true)
    },
    notApprovedExercises() {
      return this.exercisesInfo?.filter((x) => x.approved == false)
    },
    approvedExercisesSearch() {
      if (!this.approvedExercises) {
        return null
      }
      return this.approvedExercises.filter((x) =>
        x.name.toLowerCase().includes(this.searchExercise.toLowerCase())
      )
    },
  },
}
</script>
