<template>
  <v-card class="my-4 workout">
    <v-container class="px-0">
      <h3 class="ml-5">{{ block.type }}</h3>
      <v-divider class="my-2"></v-divider>
      <div v-if="!['Rest', 'Text'].includes(block.type)">
        <v-row
          v-for="exercise in block.exercises"
          :key="exercise.id"
          class="mx-2"
        >
          <v-col>
            <h3>{{ exercise.name }}</h3>
            <p v-if="exercise.info" class="ma-0">{{exercise.info}}</p>
          </v-col>
          <v-col cols="3" class="d-flex align-center justify-end">
            <h3 class="ma-0">{{ exercise.count }} {{ exercise.append }}</h3>
          </v-col>
        </v-row>
      </div>
      <div v-else-if="block.type === 'Rest'" class="text-center">
        <h3 class="ma-0">{{ block.values[0] }} {{ block.values[1] }}</h3>
      </div>
      <div v-else-if="block.type === 'Text'" class="text-center">
        <h3 class="mx-5">{{ block.values[0] }}</h3>
      </div>
      <v-divider
        v-if="!['Single', 'For time', 'Rest'].includes(block.type)"
        class="my-2"
      ></v-divider>

      <!-- Circuit -->
      <h3 v-if="block.type == 'Circuit'" class="text-center">
        {{ block.values[0] }} x
      </h3>

      <!-- EMOM -->
      <div v-if="block.type == 'EMOM'">
        <h3 class="text-center">Every {{ block.values[0] }} seconds</h3>
        <h3 class="text-center">for {{ block.values[1] }} minutes</h3>
      </div>

      <!-- AMRAP -->
      <h3 v-if="block.type == 'AMRAP'" class="text-center">
        {{ block.values[0] }} minutes
      </h3>

      <!-- TABATA -->
      <div v-if="block.type == 'TABATA'">
        <h3 class="text-center">{{ block.values[0] }} rounds</h3>
        <h3 class="text-center">{{ block.values[1] }} seconds work</h3>
        <h3 class="text-center">{{ block.values[2] }} seconds rest</h3>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import { Block } from '../../types'

export default {
  props: { block: { type: Block, default: () => {} } },
  methods: {},
}
</script>

<style lang="scss" scoped></style>
