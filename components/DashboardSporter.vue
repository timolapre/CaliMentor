<template>
  <div>
    <!-- Achievements -->
    <!-- <v-card class="pa-4">
      <p class="text--disabled">Achievements</p>
      <h3>Coming soon</h3>
      <v-row class="text-center">
        <v-col
          cols="3"
          sm="1"
          v-for="achievement in achievements"
          :key="achievement.id"
        >
          <Achievement v-bind:achievement="achievement" />
        </v-col>
      </v-row>
    </v-card> -->

    <!-- Routine -->
    <Routine />

    <!-- Goals -->
    <v-card class="mt-3 pa-4">
      <p class="text--disabled">Goals</p>
      <div v-if="goals.length == 0" class="mt-0 mb-3">
        <h3>
          You have finished all your goals. Add a new one and keep training
          hard!
        </h3>
      </div>
      <GoalBlock
        @remove-goal="removeGoal"
        v-for="goal in goals"
        :key="goal.id"
        :goal="goal"
        class="my-1"
      />

      <v-btn
        v-if="$store.state.PREMIUMUSER || goals.length < 2"
        color="primary"
        @click="$router.push({ name: 'goal-add' })"
        outlined
        block
      >
        <h2>Add goal</h2>
      </v-btn>
      <h3 v-else class="mt-2">You need premium to add more</h3>
    </v-card>

    <!-- Personal Records and progress -->
    <v-card class="mt-3 pa-4">
      <p class="text--disabled">Personal records</p>
      <v-row class="ma-0">
        <v-col
          v-for="pr in PRs"
          :key="pr.id"
          cols="12"
          sm="6"
          class="pa-0 pt-1 px-sm-1"
        >
          <v-card
            style="width: 100%"
            flat
            color="secondary"
            block
            class="py-1 px-2"
            @click="$router.push({ name: 'pr-id', params: { id: pr.id } })"
          >
            <div class="d-flex">
              <h2>{{ pr.exercise }}</h2>
              <h2 class="mr-2 ml-auto">
                {{ pr.history[0].count }}{{ pr.append }}
              </h2>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" class="pa-0 pt-1 px-sm-1 d-flex align-center">
          <v-btn
            v-if="$store.state.PREMIUMUSER || PRs.length < 4"
            color="primary"
            @click="$router.push({ name: 'pr-add' })"
            outlined
            block
          >
            <h2>Add exercise</h2>
          </v-btn>
          <h3 v-else class="mt-2">You need premium to add more</h3>
        </v-col>
      </v-row>
    </v-card>

    <!-- Workout history -->
    <v-card class="mt-3 pa-4">
      <p class="text--disabled">Workout history</p>

      <v-btn
        color="secondary"
        block
        @click="$router.push({ name: 'workout-history' })"
      >
        <v-icon class="mr-3" small>fa-history</v-icon> View my workout history
      </v-btn>
    </v-card>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      PRs: [],
      goals: [],
      achievements: [
        { id: 1, tooltip: 'Buy premium', icon: 'hand-holding-usd', size: '' },
        {
          id: 2,
          tooltip: 'Finish your first workout',
          icon: 'dumbbell',
          size: 'x-small',
        },
        {
          id: 3,
          tooltip: 'Finish 10 workouts',
          icon: 'dumbbell',
          size: 'small',
        },
        {
          id: 4,
          tooltip: 'Finish 25 workouts',
          icon: 'dumbbell',
          size: 'medium',
        },
        {
          id: 5,
          tooltip: 'Finish 100 workouts',
          icon: 'dumbbell',
          size: 'large',
        },
        {
          id: 6,
          tooltip: 'Create your first workout',
          icon: 'pen',
          size: 'x-small',
        },
        {
          id: 7,
          tooltip: 'Create 10 workouts',
          icon: 'pen',
          size: 'small',
        },
        {
          id: 8,
          tooltip: 'Create 25 workouts',
          icon: 'pen',
          size: 'medium',
        },
        {
          id: 9,
          tooltip: 'Create 100 workouts',
          icon: 'pen',
          size: 'large',
        },
      ],
      typeToIcon: {
        Rest: 'bed',
      },
    }
  },
  methods: {
    async getPersonalRecords() {
      const data = await this.$axios.$get('personalrecord/all')
      this.PRs = data || []
    },
    async getGoals() {
      const data = await this.$axios.$get('goal/all')
      this.goals = data || []
    },
    removeGoal(goal) {
      const index = this.goals.indexOf(goal)
      if (index > -1) {
        this.goals.splice(index, 1)
      }
    },
  },
  async beforeCreate() {
    await this.$store.dispatch('setWorkoutDifficultyOptions')
    await this.$store.dispatch('setWorkoutTypeOptions')
  },
  async created() {
    this.getPersonalRecords()
    this.getGoals()
  },
}
</script>

<style lang="scss" scoped></style>
