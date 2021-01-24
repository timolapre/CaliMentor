<template>
  <div>
    <v-card class="my-4">
      <v-container class="px-0">
        <div class="d-flex justify-content">
          <h3 class="ml-3">{{ block.type }}</h3>
          <!-- <v-icon @click="deleteBlock" class="mr-6 ml-auto" small
            >fa-arrow-up</v-icon
          >
          <v-icon @click="deleteBlock" class="mr-6" small>fa-arrow-down</v-icon> -->
          <v-icon @click="deleteBlock" class="mr-6 ml-auto" small
            >fa-trash</v-icon
          >
        </div>
        <v-divider class="my-2"></v-divider>
        <div v-if="!['Rest', 'Text'].includes(block.type)">
          <v-row
            v-for="exercise in block.exercises"
            :key="exercise.id"
            class="mx-2 mb-3"
          >
            <v-col class="px-0 pb-0">
              <v-combobox
                flat
                solo
                dense
                hide-details
                background-color="secondary"
                :items="exercises"
                placeholder="Exercise"
                class="block-input"
                v-model="exercise.name"
              ></v-combobox>
            </v-col>
            <v-col
              cols="3"
              sm="2"
              class="d-flex align-center justify-end px-1 pb-0"
            >
              <v-text-field
                flat
                solo
                dense
                hide-details
                type="number"
                background-color="secondary"
                v-model="exercise.count"
              ></v-text-field>
            </v-col>
            <v-col
              cols="3"
              sm="2"
              class="d-flex align-center justify-end px-0 pb-0"
            >
              <v-select
                flat
                solo
                dense
                hide-details
                background-color="secondary"
                :items="['x', 's', 'm']"
                v-model="exercise.append"
              ></v-select>
            </v-col>
            <v-col cols="12" class="px-0 pb-0 pt-1">
              <v-text-field
                flat
                solo
                dense
                hide-details
                background-color="secondary"
                placeholder="Extra information"
                class="block-input"
                v-model="exercise.info"
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row class="mx-2">
            <v-col cols="6" class="px-0 pr-1">
              <v-btn block @click="addExercise">
                <v-icon class="mr-1" small>fa-plus</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="6" class="px-0 pl-1">
              <v-btn block @click="deleteExercise">
                <v-icon class="mr-1" small>fa-minus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <div v-else-if="block.type === 'Rest'">
          <v-row
            v-for="exercise in block.exercises"
            :key="exercise.id"
            class="mx-2 mb-0"
          >
            <v-col class="px-0 pb-0">
              <v-text-field
                flat
                solo
                dense
                hide-details
                background-color="secondary"
                class="block-input"
                type="number"
                v-model="block.values[0]"
              ></v-text-field>
            </v-col>
            <v-col
              cols="6"
              sm="4"
              lg="2"
              class="d-flex align-center justify-end pl-1 px-0 pb-0"
            >
              <v-select
                flat
                solo
                dense
                hide-details
                background-color="secondary"
                :items="['Seconds', 'Minutes']"
                v-model="block.values[1]"
              ></v-select>
            </v-col>
          </v-row>
        </div>
        <div v-else-if="block.type === 'Text'">
          <v-textarea
            flat
            solo
            dense
            hide-details
            auto-grow
            placeholder="Describe your workout"
            rows="3"
            class="mx-2 mb-0"
            v-model="block.values[0]"
          ></v-textarea>
        </div>
        <v-divider
          v-if="!['Single', 'For time', 'Rest'].includes(block.type)"
          class="my-2"
        ></v-divider>

        <!-- Circuit -->
        <v-text-field
          v-if="block.type === 'Circuit'"
          flat
          solo
          dense
          hide-details
          suffix="x"
          background-color="secondary"
          type="number"
          class="block-input px-2"
          v-model="block.values[0]"
        ></v-text-field>

        <!-- EMOM -->
        <div v-if="block.type === 'EMOM'">
          <v-text-field
            flat
            solo
            dense
            hide-details
            prefix="Every"
            suffix="seconds"
            background-color="secondary"
            type="number"
            class="block-input px-2 mb-1"
            v-model="block.values[0]"
          ></v-text-field>
          <v-text-field
            flat
            solo
            dense
            hide-details
            prefix="for"
            suffix="minutes"
            background-color="secondary"
            type="number"
            class="block-input px-2"
            v-model="block.values[1]"
          ></v-text-field>
        </div>

        <!-- AMRAP -->
        <v-text-field
          v-if="block.type === 'AMRAP'"
          flat
          solo
          dense
          hide-details
          suffix="minutes"
          background-color="secondary"
          type="number"
          class="block-input px-2"
          v-model="block.values[0]"
        ></v-text-field>

        <!-- TABATA -->
        <div v-if="block.type === 'TABATA'">
          <v-text-field
            flat
            solo
            dense
            hide-details
            suffix="rounds"
            background-color="secondary"
            type="number"
            class="block-input px-2 mb-1"
            v-model="block.values[0]"
          ></v-text-field>
          <v-text-field
            flat
            solo
            dense
            hide-details
            suffix="seconds work"
            background-color="secondary"
            type="number"
            class="block-input px-2 mb-1"
            v-model="block.values[1]"
          ></v-text-field>
          <v-text-field
            flat
            solo
            dense
            hide-details
            suffix="seconds rest"
            background-color="secondary"
            type="number"
            class="block-input px-2"
            v-model="block.values[2]"
          ></v-text-field>
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts">
import { v4 as uuid } from 'uuid'
import { Block, Exercise } from '../../types'

export default {
  data() {
    return {
      emptyExercise: { count: 1, append: 'x' } as Exercise,
    }
  },
  props: { block: { type: Object as () => Block, default: () => {} } },
  methods: {
    addExercise() {
      const newExercise = JSON.parse(
        JSON.stringify(this.emptyExercise)
      ) as Exercise
      newExercise.id = uuid()
      this.block.exercises.push(newExercise)
    },
    deleteExercise() {
      if (this.block.exercises.length > 1) {
        this.block.exercises.pop()
      }
    },
    deleteBlock() {
      this.$emit('delete-block', this.block.id)
    },
  },
  computed: {
    exercises() {
      const exercises = []
      this.$store.state.EXERCISES.forEach((exercise) => {
        exercises.push(exercise.name)
      })
      return exercises
    },
  },
}
</script>

<style lang="scss" scoped></style>
