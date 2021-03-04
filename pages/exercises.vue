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

      <div class="mt-15 d-flex align-center justify-center">
        <v-card class="pa-3">
          <h2>{{ oldExercises.length }}</h2>
          <p
            class="mb-0"
            v-for="exercise in oldExercises"
            :key="exercise.toLowerCase().replace(/\s/g, '')"
          >
            {{ exercise }}
          </p>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
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
  },
  created() {
    this.getExercises(0)
  },
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
      oldExercises: [
        'Pull ups',
        'Australian pull ups',
        'Muscle ups',
        'Chin ups',
        'Archer pull ups',
        'Wide Pull ups',
        'Frontlever raises',
        'Negative frontlever raises',
        'Military pull ups',
        'Push ups',
        'Straight bar dips',
        'One legged lunges',
        'Narrow stance squats',
        'jumping squats',
        'Lunges',
        'Squats',
        'Calf raises',
        'Explosive squats',
        'Pistol squats',
        'Dips',
        'Body rows',
        'Toes to bar',
        'Ring dips',
        'Pike push ups',
        'Pike ups',
        'Ring flies',
        'Tricp extensions',
        'Handstand pushups',
        'Advanced tucked planche',
        'Handstand',
        'Explosive pull ups',
        'Scapula pull ups',
        'Explosive L-sit pull ups',
        'Diamond push ups',
        'Wall handstand',
        'Jumping lunges',
        'Mountain climbers',
        'Biceps curls',
        'Leg raises',
        'Protracted push ups',
        'Shoulder taps',
        'Squat holds',
        'Reversed deadlifts',
        'Jumping jacks',
        'Bulgarian split squats',
        'One legged glute bridges',
        'Glute bridges',
        'Negative pull ups',
        'Dead hang',
        'Reversed glute bridges',
        'Lying glute bridges',
        'One arm triceps extentions',
        'Slow dips',
        'Knee raises',
        'Face pulls',
        'Incline push-ups',
        'L-sit chin-ups',
        'Shoulder raises',
        'Skull crushers',
        'Ab walk-outs',
        'Deep dips',
        'Romanian Deadlift',
        'Leg extentions',
        'Sliding hamstring curls',
        'Close grip push-ups',
        'Decline push-ups',
        'Back rows',
        'Nordic curls',
        'Reverse Nordic curls',
        'Sliding glute bridges',
        'Wide push-ups',
        "'Biceps' push-ups",
        'Skater squats',
        'Single arm overhead presses',
        'Ring rows',
        'Ring push-ups',
        'Single arm bicep curls',
        'Single arm tricep extentions',
        'Downward dog extentions',
        'Archer push-ups',
        'Swan Raises',
        'V-crunches',
        'Small stance squats',
      ],
      /*
          Pull-Up
          Chin-Up
          Wide Pull-Up
          Narrow Pull-Up
          Archer Pull-Up
          Back Extension
          Australian Pull-Up
          Dips
          Push-Ups
          Diamond Push-Ups
          Wide Push-Ups
          Incline Push-Ups
          Spiderman Push-Up
          Straight Bar Dip
          Pike Push-Up
          Hindu Push-Up
          Pseudo Push-Up
          Helicopter
          Decline Push-Up
          Korean Dip
          Squat
          Lunges
          Wall Sit
          Sumo Squat
          Calf Raise
          Hollow Body Hold
          Superman Hold
          Plank
          Leg raises
          Sit-Ups
          Glute bridges
          Russian twists
          Windshield wipers
          Good mornings
          Muscle-Up
          Front Lever
          Back Lever
          Planche
          Handstand
          Human Flag
          360
          Shrimp Flip
          Alley oop
          Giant
          Switch Blade
          Frontflip Regrab
      */
    }
  },
}
</script>
