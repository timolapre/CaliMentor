<template>
  <div class="register-container d-flex align-center justify-center">
    <div class="page">
      <!-- <h1 class="text-center">Welcome {{ user.username }}</h1>
      <v-row class="mb-5">
        <v-col class="px-1">
          <v-btn block color="primary" @click="buyPremium">
            Upgrade to premium
          </v-btn>
        </v-col>
      </v-row> -->

      <v-btn block @click="logout" class="mb-5">
        <v-icon class="mr-3" small>fa-sign-out-alt</v-icon> Sign out
      </v-btn>

      <v-card class="mb-2">
        <v-card-text>
          <v-btn
            @click="$router.push({ name: 'account-edit' })"
            color="secondary"
            class="float-right"
            >Edit</v-btn
          >
          <p class="text--disabled">Personal details</p>
          <h3 class="my-3">{{ $store.state.LOGGEDINUSER.username }}</h3>
          <h3 class="my-3">{{ $store.state.LOGGEDINUSER.email }}</h3>
        </v-card-text>
      </v-card>

      <v-card
        class="mb-2"
        v-if="
          $store.state.PREMIUMUSER ||
          $store.state.LOGGEDINUSER.type == 'expired'
        "
      >
        <v-card-text>
          <v-btn
            @click="$router.push({ name: 'payment-edit' })"
            color="secondary"
            class="float-right"
            >Edit</v-btn
          >
          <p class="text--disabled">Payment details</p>
          <h3 class="my-3">{{ accountType }} account</h3>
          <h3 class="my-3">Expire date: {{ expireDate }}</h3>
          <h3 class="my-3">
            Payment method: {{ $store.state.LOGGEDINUSER.paymentMethod }}
          </h3>
        </v-card-text>
      </v-card>

      <v-btn
        v-if="!$store.state.PREMIUMUSER"
        block
        color="primary"
        class="mb-2"
        @click="$router.push({ name: 'upgrade' })"
      >
        Upgrade account
      </v-btn>

      <v-btn block @click="$router.push({ name: 'workout-history' })">
        <v-icon class="mr-3" small>fa-history</v-icon> My workout history
      </v-btn>
      <v-btn
        class="mt-2"
        block
        @click="$router.push({ name: 'workouts', query: { me: true } })"
      >
        <v-icon class="mr-3" small>fa-dumbbell</v-icon> My workouts
      </v-btn>

      <Contact class="mt-10"/>
    </div>
  </div>
</template>

<script lang="ts">
import moment from 'moment'
import { User } from '../../types'

export default {
  data() {
    return {
      user: {} as User,
    }
  },
  methods: {
    async logout() {
      const data = await this.$axios.$get('user/logout')

      if (data) {
        await this.$store.dispatch('logoutUser')
        this.$router.push({ name: 'login' })
      }
    },
  },
  computed: {
    accountType() {
      switch (this.$store.state.LOGGEDINUSER.type) {
        case 'free':
          return 'Default'
          break
        case 'premium':
          return 'Premium'
          break
        case 'gifted_premium':
          return 'Gifted premium'
          break
        case 'expired':
          return 'Expired'
          break
        case 'canceled':
          return 'Canceled'
          break
        default:
          return ''
          break
      }
    },
    expireDate() {
      return moment(this.$store.state.LOGGEDINUSER.premiumExpireDate).format(
        'DD-MM-YYYY'
      )
    },
  },
}
</script>

<style lang="scss" scoped></style>
