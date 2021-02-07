<template>
  <div class="d-flex align-center justify-center">
    <div class="page">
      <!-- Fake login -->
      <h1 class="text-center">Fake login</h1>
      <v-form id="fake-login-form" @submit.prevent="fakeLogin()">
        <v-text-field
          label="username"
          v-model="fakeLoginUser"
          hide-details
        ></v-text-field>
        <p v-if="fakeLoginMessage">{{ fakeLoginMessage }}</p>
        <v-btn
          type="submit"
          form="fake-login-form"
          class="mt-3"
          color="primary"
          block
        >
          fake Login
        </v-btn>
      </v-form>

      <!-- Gift premium -->
      <h1 class="text-center mt-10">Users</h1>
      <v-form id="gift-premium-form" @submit.prevent="giftPremium()">
        <v-text-field
          label="username"
          v-model="selectedUser"
          hide-details
        ></v-text-field>
        <v-text-field
          hide-details
          suffix="Months"
          type="number"
          min="0"
          max="99"
          v-model="months"
        ></v-text-field>
        <p v-if="giftMessage">{{ giftMessage }}</p>
        <v-btn
          type="submit"
          form="gift-premium-form"
          class="mt-3"
          color="primary"
          block
        >
          gift premium
        </v-btn>
      </v-form>

      <div class="mt-10" v-if="usersInfo">
        <v-card class="pa-2 text-center mb-3">
          <h3>{{ totalUsers }} total users</h3>
        </v-card>
        <v-row>
          <v-col cols="6" sm="3">
            <v-card class="pa-2 text-center">
              <h3>{{ usersInfo.premiumUsers[1] }} premium</h3>
              <span v-for="user in usersInfo.premiumUsers[0]" :key="user.id">
                {{ user.username }} -
              </span>
            </v-card>
          </v-col>
          <v-col cols="6" sm="3">
            <v-card class="pa-2 text-center">
              <h3>{{ usersInfo.giftedPremiumUsers[1] }} gifted premium</h3>
              <span
                v-for="user in usersInfo.giftedPremiumUsers[0]"
                :key="user.id"
              >
                {{ user.username }} -
              </span>
            </v-card>
          </v-col>
          <v-col cols="6" sm="3">
            <v-card class="pa-2 text-center">
              <h3>{{ usersInfo.freeUsers[1] }} free</h3>
              <span v-for="user in usersInfo.freeUsers[0]" :key="user.id">
                {{ user.username }} -
              </span>
            </v-card>
          </v-col>
          <v-col cols="6" sm="3">
            <v-card class="pa-2 text-center">
              <h3>{{ usersInfo.expiredUsers[1] }} expired</h3>
              <span v-for="user in usersInfo.expiredUsers[0]" :key="user.id">
                {{ user.username }} -
              </span>
            </v-card>
          </v-col>
          <v-col cols="6" sm="3">
            <v-card class="pa-2 text-center">
              <h3>{{ usersInfo.canceledUsers[1] }} canceled</h3>
              <span v-for="user in usersInfo.canceledUsers[0]" :key="user.id">
                {{ user.username }} -
              </span>
            </v-card>
          </v-col>
        </v-row>
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
      selectedUser: '',
      giftMessage: null,
      usersInfo: null,
      totalUsers: 0,
      exerciseName: '',
      exerciseMessage: null,
      exercisesInfo: null,
      months: 2,
      fakeLoginUser: null,
      fakeLoginMessage: null,
    }
  },
  methods: {
    async fakeLogin() {
      const data = await this.$axios.$post('admin/fakelogin', {
        username: this.fakeLoginUser,
      })
      this.fakeLoginMessage = data
      setTimeout(() => {
        this.fakeLoginMessage = null
      }, 2000)
    },
    async giftPremium() {
      const data = await this.$axios.$post('admin/premiumgift', {
        username: this.selectedUser,
        months: this.months,
      })

      this.selectedUser = ''
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
    await this.$store.dispatch('getLoggedinUser')
    if (this.$store.state.LOGGEDINUSER?.username?.toLowerCase() !== 'timo') {
      this.$router.push({ name: 'index' })
      return
    }
    const usersData = await this.$axios.$get('admin/users/info')

    this.usersInfo = usersData
    this.totalUsers =
      this.usersInfo.premiumUsers[1] +
      this.usersInfo.giftedPremiumUsers[1] +
      this.usersInfo.freeUsers[1] +
      this.usersInfo.expiredUsers[1] +
      this.usersInfo.canceledUsers[1]

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

<style lang="scss" scoped>
span {
  font-size: small;
}
</style>
