<template>
  <div>
    <v-row class="mx-0">
      <v-col cols="12" sm="6" v-for="pr in PRs" :key="pr.id" class="pa-1">
        <v-card
          class="py-2 px-5"
          @click="$router.push({ name: 'pr-id', params: { id: pr.id } })"
        >
          <div class="d-flex">
            <h2>{{ pr.exercise }}</h2>
            <h2 class="ml-auto">{{ pr.history[0].count }}{{ pr.append }}</h2>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mx-1 mt-3 mb-2">
      <v-col class="px-0 pb-0">
        <v-combobox
          flat
          solo
          dense
          hide-details
          background-color="secondary"
          :items="$store.state.EXERCISENAMES"
          placeholder="Exercise"
          class="block-input"
          v-model="newExercise.name"
        ></v-combobox>
      </v-col>
      <v-col cols="3" sm="2" class="d-flex align-center justify-end px-1 pb-0">
        <v-text-field
          flat
          solo
          dense
          hide-details
          type="number"
          background-color="secondary"
          v-model="newExercise.count"
        ></v-text-field>
      </v-col>
      <v-col cols="3" sm="2" class="d-flex align-center justify-end px-0 pb-0">
        <v-select
          flat
          solo
          dense
          hide-details
          background-color="secondary"
          :items="['x', 's', 'm']"
          v-model="newExercise.append"
        ></v-select>
      </v-col>
    </v-row>
    <div class="mx-1">
      <v-btn block color="secondary"><v-icon small>fa-plus</v-icon></v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { User } from '../types'

export default {
  data() {
    return {
      PRs: [],
      newExercise: { append: 'x', count: 1 },
    }
  },
  methods: {
    async getPersonalRecords() {
      const data = await this.$axios.$get('personalrecord/all')
      this.PRs = data || []
    },
  },
  async beforeCreate() {
    await this.$store.dispatch('setWorkoutTypeOptions')
    await this.$store.dispatch('setWorkoutDifficultyOptions')
    await this.$store.dispatch('setWorkoutDurationOptions')
  },
  async created() {
    this.getPersonalRecords()
  },
}
</script>

<style lang="scss" scoped>
.action-button {
  background-color: $black-tertiary;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  width: 40px;
  padding: 0.1rem;
}
</style>
