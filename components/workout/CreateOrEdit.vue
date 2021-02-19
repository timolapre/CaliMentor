<template>
  <div class="register-container d-flex align-center justify-center">
    <div class="mx-4 page">
      <v-btn @click="$router.go(-1)" block class="mb-5">Back without saving</v-btn>
      <h1 class="text-center">Create Workout</h1>
      <v-row class="mt-3">
        <!-- Name -->
        <v-col cols="12" sm="3">
          <v-text-field
            class="pt-0"
            label="Name workout"
            v-model="workout.name"
            :error="!!errors.name"
            :error-messages="errors.name"
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
            :error="!!errors.type"
            :error-messages="errors.type"
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
            :error="!!errors.difficulty"
            :error-messages="errors.difficulty"
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
            :error="!!errors.duration"
            :error-messages="errors.duration"
          ></v-select>
        </v-col>
      </v-row>
      <!-- Name -->
      <v-text-field
        label="Description"
        v-model="workout.description"
      ></v-text-field>

      <p
        v-if="errors.block && workout.blocks.length == 0"
        class="error--text text-center"
      >
        {{ errors.block }}
      </p>

      <ul id="items" style="list-style: none" class="pl-0">
        <WorkoutEditBlock
          v-for="block in workout.blocks"
          @delete-block="deleteBlock"
          @copy-block="copyBlock"
          :key="block.id"
          :block="block"
        />
      </ul>

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
import Sortable from 'sortablejs'

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
      errors: {},
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
    copyBlock(id) {
      let block = this.workout.blocks.filter((x) => x.id === id)[0]
      block = JSON.parse(JSON.stringify(block))
      block.id = uuid()
      this.workout.blocks.push(block)
    },
    saveNewOrEditWorkout() {
      if (this.edit) {
        this.saveEditWorkout()
      } else {
        this.saveNewWorkout()
      }
    },
    async saveNewWorkout() {
      const errors = {
        name: !this.workout.name.length ? 'Name is required' : undefined,
        type: !this.workout.type ? 'Type is required' : undefined,
        difficulty: !this.workout.difficulty
          ? 'Difficulty is required'
          : undefined,
        duration: !this.workout.duration ? 'Duraton is required' : undefined,
        block:
          this.workout.blocks.length == 0
            ? 'At least one exercise block is required'
            : undefined,
      }

      for (const error in errors) {
        if (errors[error]) {
          this.errors = errors
          return
        }
      }

      const data = await this.$axios.$post('workout/create', {
        workout: this.workout,
      })
      this.$router.push({ name: 'workout-id', params: { id: data } })
    },
    async saveEditWorkout() {
      const errors = {
        name: !this.workout.name.length ? 'Name is required' : undefined,
        type: !this.workout.type ? 'Type is required' : undefined,
        difficulty: !this.workout.difficulty
          ? 'Difficulty is required'
          : undefined,
        duration: !this.workout.duration ? 'Duraton is required' : undefined,
        block:
          this.workout.blocks.length == 0
            ? 'At least one exercise block is required'
            : undefined,
      }

      for (const error in errors) {
        if (errors[error]) {
          this.errors = errors
          return
        }
      }

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

    var el = document.getElementById('items')
    var me = this
    var sortable = Sortable.create(el, {
      animation: 400,
      handle: '.handle',
      onEnd(evt) {
        const block = JSON.parse(
          JSON.stringify(me.workout.blocks[evt.oldIndex])
        )
        const id = block.id
        block.id = uuid()
        const newIndex =
          evt.oldIndex < evt.newIndex ? evt.newIndex + 1 : evt.newIndex

        me.workout.blocks.splice(newIndex, 0, block)
        me.workout.blocks = me.workout.blocks.filter((x) => x.id !== id)
      },
    })
  },
}
</script>

<style lang="scss" scoped></style>
