<template>
  <div>
    <v-select
      v-model="exercise.type"
      solo
      dense
      hide-details
      class="pt-0 pb-5 ma-0"
      item-value="id"
      item-text="name"
      :items="exerciseTypes"
      label="Type"
      single-line
      background-color="secondary"
      prepend-icon="fa-dumbbell"
    ></v-select>
    <div
      v-for="level in exercise.levels.filter((x) => x.order < 0)"
      :key="level.id"
    >
      <div class="d-flex my-1 d-flex align-center">
        <v-text-field
          flat
          solo
          dense
          hide-details
          background-color="secondary"
          v-model="level.name"
          class="mr-1"
        ></v-text-field>
        <v-text-field
          flat
          solo
          dense
          hide-details
          type="number"
          background-color="secondary"
          class="mr-1"
          v-model="level.order"
        ></v-text-field>
        <v-btn color="red" @click="deleteExerciseLevel(level.id)"
          ><v-icon small>fa-trash</v-icon></v-btn
        >
      </div>
    </div>
    <div class="d-flex align-center">
      <v-text-field
        flat
        solo
        dense
        hide-details
        background-color="secondary"
        v-model="exercise.name"
        class="mr-1"
      ></v-text-field>
      <v-btn color="red" @click="DeleteExerciseModal = true"
        ><v-icon small>fa-trash</v-icon></v-btn
      >
    </div>
    <div
      v-for="level in exercise.levels.filter((x) => x.order >= 0)"
      :key="level.id"
    >
      <div class="d-flex my-1 d-flex align-center">
        <v-text-field
          flat
          solo
          dense
          hide-details
          background-color="secondary"
          v-model="level.name"
          class="mr-1"
        ></v-text-field>
        <v-text-field
          flat
          solo
          dense
          hide-details
          type="number"
          background-color="secondary"
          v-model="level.order"
          class="mr-1"
        ></v-text-field>
        <v-btn color="red" @click="deleteExerciseLevel(level.id)"
          ><v-icon small>fa-trash</v-icon></v-btn
        >
      </div>
    </div>
    <v-btn color="primary" class="mt-2" @click="saveExerciseLevels"
      >Save</v-btn
    >

    <div class="d-flex mt-2 d-flex align-center">
      <v-text-field
        flat
        solo
        dense
        hide-details
        background-color="secondary"
        class="mr-1"
        v-model="newExerciseName"
      ></v-text-field>
      <v-text-field
        flat
        solo
        dense
        hide-details
        background-color="secondary"
        class="mr-1"
        v-model="newExerciseOrder"
      ></v-text-field>
      <v-btn color="primary" @click="addExerciseLevel"
        ><v-icon small>fa-plus</v-icon></v-btn
      >
    </div>

    <v-dialog v-model="DeleteExerciseModal" persistent max-width="290" overlay-opacity="0.9" overlay-color="black">
      <v-card>
        <v-card-title class="headline"> Delete exercise </v-card-title>
        <v-card-text>
          Are you sure you want to delete this exercise permanently?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" text @click="DeleteExerciseModal = false">
            Cancel
          </v-btn>
          <v-btn
            color="red"
            text
            @click="
              deleteExercise()
              DeleteExerciseModal = false
            "
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-divider class="my-4" color="white"></v-divider>
  </div>
</template>

<script>
export default {
  props: { exercise: {} },
  data() {
    return {
      newExerciseName: '',
      newExerciseOrder: 1,
      DeleteExerciseModal: false,
      exerciseTypes: [
        { id: 0, name: 'None' },
        { id: 1, name: 'Back and biceps' },
        { id: 2, name: 'Chest and triceps' },
        { id: 3, name: 'Shoulders' },
        { id: 4, name: 'Legs' },
        { id: 5, name: 'Core' },
        { id: 6, name: 'Advanced' },
        { id: 7, name: 'Statics' },
        { id: 8, name: 'Freestyle' },
      ],
    }
  },
  methods: {
    async saveExerciseLevels() {
      await this.$axios.$post('admin/exercises/update', {
        exercise: this.exercise,
      })
    },
    async addExerciseLevel() {
      const data = await this.$axios.$post('admin/exercises/level/add', {
        id: this.exercise.id,
        exercise: this.newExerciseName,
        order: this.newExerciseOrder,
      })
      console.log(data)
      this.exercise.levels.push(data)
    },
    async deleteExerciseLevel(id) {
      this.exercise.levels = this.exercise.levels.filter((x) => x.id != id)
      await this.$axios.$post('admin/exercises/level/delete', {
        id,
      })
    },
    async deleteExercise() {
      await this.$axios.$post('admin/exercises/delete/id', {
        id: this.exercise.id,
      })
      this.exercise.name = 'DELETED'
      this.exercise.levels = []
    },
  },
}
</script>
