<template>
  <div class="d-flex align-center justify-center">
    <v-card class="pa-3">
      <h2>{{ exercises.length }}</h2>
      <p
        class="mb-0"
        v-for="exercise in exercises"
        :key="exercise.toLowerCase().replace(/\s/g, '')"
      >
        {{ exercise }}
      </p>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      exercises: [
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
    }
  },
}
</script>
