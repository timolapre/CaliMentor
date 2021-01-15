<template>
  <div class="register-container d-flex align-center justify-center">
    <div class="mx-4 page">
      <h1 class="text-center">Create Workout</h1>
      <v-row class="mt-3">
        <!-- Name -->
        <v-col cols="12" sm="3">
          <v-text-field
            class="pt-0"
            label="Name"
            v-model="workout.name"
          ></v-text-field>
        </v-col>
        <!-- Type -->
        <v-col cols="12" sm="3">
          <v-select
            v-model="workout.type"
            class="pa-1 ma-0"
            item-value="id"
            :items="typeOptions"
            label="Type"
          ></v-select>
        </v-col>
        <!-- Difficulty -->
        <v-col cols="12" sm="3">
          <v-select
            v-model="workout.difficulty"
            class="pa-1 ma-0"
            item-value="id"
            :items="difficultyOptions"
            label="Difficulty"
          ></v-select>
        </v-col>
        <!-- Duration -->
        <v-col cols="12" sm="3">
          <v-select
            v-model="workout.duration"
            class="pa-1 ma-0"
            item-value="id"
            :items="durationOptions"
            label="Duration"
          ></v-select>
        </v-col>
      </v-row>
      <!-- Name -->
      <v-text-field
        label="Description"
        v-model="workout.description"
      ></v-text-field>

      <WorkoutEditBlock
        v-for="block in workout.blocks"
        @delete-block="deleteBlock"
        :key="block.id"
        :block="block"
      />

      <v-card class="my-4">
        <v-container class="text-center">
          <v-select
            v-model="selectedBlock"
            class="pa-1 ma-0"
            :items="blockOptions"
          ></v-select>
          <v-btn color="secondary" block @click="addBlock">
            <v-icon small>fa-plus</v-icon>
          </v-btn>
        </v-container>
      </v-card>
      <v-btn color="primary" block @click="saveNewOrEditWorkout">
        <v-icon class="mr-1" small>fa-save</v-icon> Save
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { v4 as uuid } from 'uuid'
import { Workout, Block, Exercise } from '../../types'
import { WORKOUT_BLOCK_OPTIONS } from '../../constants'
import { log } from 'util'

export default {
  data() {
    return {
      edit: false,
      workoutId: null,
      difficultyOptions: [],
      durationOptions: [],
      typeOptions: [],
      blockOptions: WORKOUT_BLOCK_OPTIONS,
      selectedBlock: 'Circuit',
      workout: {
        name: '',
        description: '',
        type: undefined,
        difficulty: undefined,
        duration: undefined,
        blocks: [],
      } as Workout,
      emptyBlock: {
        type: this.selectedBlock,
        exercises: [{ id: uuid(), count: 1, append: 'x' }] as Exercise[],
        values: [],
      } as Block,
    }
  },
  methods: {
    addBlock() {
      const newBlock = JSON.parse(JSON.stringify(this.emptyBlock)) as Block
      newBlock.id = uuid()
      newBlock.type = this.selectedBlock
      let values = []
      if (this.selectedBlock == 'Circuit') {
        values = [1]
      } else if (this.selectedBlock == 'EMOM') {
        values = [60, 10]
      } else if (this.selectedBlock == 'AMRAP') {
        values = [10]
      } else if (this.selectedBlock == 'TABATA') {
        values = [10, 25, 10]
      } else if (this.selectedBlock == 'Rest') {
        values = [60, 'Seconds']
      }
      newBlock.values = values
      this.workout.blocks.push(newBlock)
    },
    deleteBlock(id) {
      this.workout.blocks = this.workout.blocks.filter((x) => x.id !== id)
    },
    saveNewOrEditWorkout() {
      if (this.edit) {
        this.saveEditWorkout()
      } else {
        this.saveNewWorkout()
      }
    },
    async saveNewWorkout() {
      if (
        !this.workout.name.length ||
        !this.workout.type ||
        !this.workout.difficulty ||
        !this.workout.duration ||
        this.workout.blocks.length == 0
      ) {
        return
      }
      const data = await this.$axios.$post('workout/create', {
        workout: this.workout,
      })
      this.$router.push({ name: 'workout-id', params: { id: data } })
      console.log(data)
    },
    async saveEditWorkout() {
      await this.$axios.$post('workout/edit', {
        id: this.workoutId,
        workout: this.workout,
      })
      this.$router.push({ name: 'workout-id', params: { id: this.workoutId } })
    },
    async getWorkout(id) {
      const data = await this.$axios.$post('workout/id', { id })
      this.workout = data
      this.loading = false

      if (
        !this.edit ||
        !this.$store.state.LOGGEDIN ||
        !this.$store.state.LOGGEDINUSER.id === this.workout.user.id
      ) {
        this.$router.push({
          name: 'workout-id',
          params: { id: this.workoutId },
        })
      }
    },
  },
  async created() {
    await this.$store.dispatch('setWorkoutTypeOptions')
    await this.$store.dispatch('setWorkoutDifficultyOptions')
    await this.$store.dispatch('setWorkoutDurationOptions')

    this.typeOptions = this.$store.state.WORKOUT_TYPE_OPTIONS
    this.difficultyOptions = this.$store.state.WORKOUT_DIFFICULTY_OPTIONS
    this.durationOptions = this.$store.state.WORKOUT_DURATION_OPTIONS

    this.workoutId = this.$route.path.includes('edit')
      ? this.$route.path.substring(this.$route.path.lastIndexOf('/') + 1)
      : undefined
    if (this.workoutId) {
      this.edit = true
      this.getWorkout(this.workoutId)
    }
  },
}
</script>

<style lang="scss" scoped></style>
