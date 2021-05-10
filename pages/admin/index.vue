<template>
  <div class="d-flex align-center justify-center">
    <div class="page">
      <!-- Fake login -->
      <v-card class="pa-3">
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
      </v-card>

      <!-- Gift premium -->
      <v-card class="pa-3 mt-5">
        <h1 class="text-center">Users</h1>
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

        <!-- Users -->
        <div class="mt-10" v-if="usersInfo">
          <v-card color="secondary" class="pa-2 text-center mb-3">
            <h3>{{ totalUsers }} total users</h3>
          </v-card>
          <v-row>
            <v-col cols="6" sm="3">
              <v-card color="secondary" class="pa-2 text-center">
                <h3>{{ usersInfo.premiumUsers[1] }} premium</h3>
                <span v-for="user in usersInfo.premiumUsers[0]" :key="user.id">
                  {{ user.username }} -
                </span>
              </v-card>
            </v-col>
            <v-col cols="6" sm="3">
              <v-card color="secondary" class="pa-2 text-center">
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
              <v-card color="secondary" class="pa-2 text-center">
                <h3>{{ usersInfo.freeUsers[1] }} free</h3>
                <span v-for="user in usersInfo.freeUsers[0]" :key="user.id">
                  {{ user.username }} -
                </span>
              </v-card>
            </v-col>
            <v-col cols="6" sm="3">
              <v-card color="secondary" class="pa-2 text-center">
                <h3>{{ usersInfo.expiredUsers[1] }} expired</h3>
                <span v-for="user in usersInfo.expiredUsers[0]" :key="user.id">
                  {{ user.username }} -
                </span>
              </v-card>
            </v-col>
            <v-col cols="6" sm="3">
              <v-card color="secondary" class="pa-2 text-center">
                <h3>{{ usersInfo.canceledUsers[1] }} canceled</h3>
                <span v-for="user in usersInfo.canceledUsers[0]" :key="user.id">
                  {{ user.username }} -
                </span>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-card>

      <!-- Latest workout finishes -->
      <v-card class="pa-3 mt-5">
        <h1 class="text-center mb-5">Latest workout finishes</h1>
        <v-row>
          <v-col
            cols="6"
            sm="3"
            v-for="finish in latestWorkoutFinishes"
            :key="finish.id"
          >
            <v-card color="secondary" class="pa-2">
              <p class="mb-0 text--disabled">
                {{ moment(finish.createdAt).fromNow('DD MMMM') }}
              </p>
              <h3>{{ finish.user.username }}</h3>
              <p class="mb-0">{{ finish.workout.name }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-card>

      <!-- Earnings -->
      <v-card class="pa-3 mt-5">
        <h1 class="text-center mb-5">Earnings</h1>
        <v-row>
          <v-col cols="6" sm="3" v-for="earning in earnings" :key="earning.id">
            <v-card
              :color="thisMonth == earning.month ? 'primary' : 'secondary'"
              class="pa-2"
            >
              <h3>{{ moment(earning.month).format('MMMM YYYY') }}</h3>
              <h3>&euro; {{ earning.earnings }}</h3>
            </v-card>
          </v-col>
        </v-row>
      </v-card>

      <v-card class="pa-3 mt-5">
        <h1 class="text-center mb-5">Exercises</h1>
        <v-btn
          block
          color="primary"
          @click="$router.push({ name: 'admin-exercises' })"
          >Go to exercises</v-btn
        >
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import moment from 'moment'

export default {
  name: 'admin',
  data() {
    return {
      selectedUser: '',
      giftMessage: null,
      usersInfo: null,
      totalUsers: 0,
      months: 2,
      fakeLoginUser: null,
      fakeLoginMessage: null,
      earnings: [],
      moment: moment,
      latestWorkoutFinishes: null,
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
    async getEarnings() {
      const data = await this.$axios.$get('admin/earnings')
      this.earnings = data
    },
    async getLatestWorkoutFinishes() {
      const data = await this.$axios.$get('admin/latestworkoutfinishes')
      this.latestWorkoutFinishes = data
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

    await this.getEarnings()
    await this.getLatestWorkoutFinishes()
  },
  computed: {
    thisMonth() {
      const date = new Date()
      return (
        date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString()
      )
    },
  },
}
</script>

<style lang="scss" scoped>
span {
  font-size: small;
}
</style>
