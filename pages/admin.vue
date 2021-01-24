<template>
  <div class="d-flex align-center justify-center">
    <div class="page">
      <h1 class="text-center">Users</h1>
      <v-form id="gift-premium-form" @submit.prevent="giftPremium()">
        <v-text-field label="username" v-model="selecterUser"></v-text-field>
        <p v-if="giftMessage">{{ giftMessage }}</p>
        <v-btn
          type="submit"
          form="gift-premium-form"
          class="mt-1"
          color="primary"
          block
        >
          gift premium
        </v-btn>
      </v-form>

      <div class="mt-10" v-if="usersInfo">
        <h1>{{ totalUsers }} total users</h1>
        <h1>{{ usersInfo.premiumUsers[1] }} premium users</h1>
        <span v-for="user in usersInfo.premiumUsers[0]" :key="user.id">
          {{ user.username }} -
        </span>

        <h1>{{ usersInfo.giftedPremiumUsers[1] }} gifted premium users</h1>
        <span v-for="user in usersInfo.giftedPremiumUsers[0]" :key="user.id">
          {{ user.username }} -
        </span>

        <h1>{{ usersInfo.freeUsers[1] }} free users</h1>
        <span v-for="user in usersInfo.freeUsers[0]" :key="user.id">
          {{ user.username }} -
        </span>
      </div>

      <h1 class="mt-10 text-center">Exercises</h1>
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
        <div
          class="d-flex align-center"
          v-for="exercise in notApprovedExercises"
          :key="exercise.id"
        >
          <h2>{{ exercise.name }}</h2>
          <v-btn
            small
            color="primary"
            class="ml-3"
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
          <v-text-field class="ml-3"></v-text-field>
          <v-btn small>Synonym</v-btn>
        </div>
        <div class="mt-5">
          <span v-for="exercise in approvedExercises" :key="exercise.id">
            {{ exercise.name }} -
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'admin',
  data() {
    return {
      selecterUser: '',
      giftMessage: null,
      usersInfo: null,
      totalUsers: 0,
      exerciseName: '',
      exerciseMessage: null,
      exercisesInfo: null,
    }
  },
  methods: {
    async giftPremium() {
      const data = await this.$axios.$post('admin/premiumgift', {
        username: this.selecterUser,
      })

      this.selecterUser = ''
      this.giftMessage = data?.message
      setTimeout(() => {
        this.giftMessage = null
      }, 2000)
    },
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
    const usersData = await this.$axios.$get('admin/users/info')

    this.usersInfo = usersData
    this.totalUsers =
      this.usersInfo.premiumUsers[1] +
      this.usersInfo.giftedPremiumUsers[1] +
      this.usersInfo.freeUsers[1]

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
  },
}
</script>
