<template>
  <div class="d-flex align-center justify-center">
    <LoggedInOnly />
    <div class="page">
      <v-btn @click="$router.go(-1)" block>Back</v-btn>

      <h1 class="text-center my-5">Upgrade to premium</h1>

      <!-- Free vs premium -->
      <!-- <div class="mt-5 text-center">
        <v-row class="d-flex align-center">
          <v-col cols="12" sm="6" align-self="start">
            <v-card class="pa-7">
              <h1>Free</h1>
              <v-divider class="my-3"></v-divider>
              <div class="d-flex justify-center">
                <div class="text-left">
                  <p class="mb-1">✅ Access to all workouts</p>
                  <p class="mb-1">✅ Create your own workouts</p>
                  <p class="mb-1">✅ Favorite workouts</p>
                  <p class="mb-1">🟠 View workout history</p>
                  <p class="mb-1">🟠 Track progress and personal records</p>
                  <p class="mb-1">❌ Earn achievements</p>
                  <p class="mb-1">❌ Ads removed</p>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" align-self="start">
            <v-card class="pa-7">
              <h1>Premium</h1>
              <p class="mb-0">&euro; 1,99 / month</p>
              <v-divider class="my-3"></v-divider>
              <div class="d-flex justify-center">
                <div class="text-left">
                  <p class="mb-1">✅ Access to all workouts</p>
                  <p class="mb-1">✅ Create your own workouts</p>
                  <p class="mb-1">✅ Favorite workouts</p>
                  <p class="mb-1">✅ View workouts history</p>
                  <p class="mb-1">✅ Track progress and personal records</p>
                  <p class="mb-1">✅ Earn achievements</p>
                  <p class="mb-1">✅ Ads removed</p>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div> -->

      <v-form id="upgrade-form" class="mt-8" @submit.prevent="buyPremium()">
        <v-select
          hide-details
          v-model="paymentMethod"
          class="pa-1 ma-0"
          :items="['Subscription', 'Single']"
          label="Payment method"
        ></v-select>
        <v-text-field
          v-if="paymentMethod == 'Single'"
          hide-details
          suffix="Months"
          type="number"
          min="1"
          max="99"
          v-model="months"
        ></v-text-field>
        <v-card class="pa-4 mt-5">
          <div v-if="paymentMethod == 'Subscription'">
            <h3>&euro; 1,99 / month</h3>
            <p class="mb-0 mt-3">
              This amount will automatically be charged every month
            </p>
            <!-- <v-icon class="mr-2" small>fa-credit-card</v-icon>
            <v-icon class="mr-2" small>fa-university</v-icon>
            <p class="mt-3 mb-0">Credit Card, SEPA</p> -->
          </div>
          <div v-if="paymentMethod == 'Single'">
            <h3>
              &euro; {{ months * 1.99 }} for {{ months }} months
              <small class="ml-8 text--disabled">&euro; 1,99 per month</small>
            </h3>
            <p class="mb-0 mt-3">This amount will be charged once</p>
            <!-- <p class="mt-3 mb-0">
              Credit card, sepa_debit, ideal, alipay, bancontact, eps, giropay,
              p24, sofort
            </p> -->
          </div>
        </v-card>
        <v-btn
          type="submit"
          form="upgrade-form"
          class="mt-5"
          color="primary"
          block
          >Continue
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      paymentMethod: 'Subscription',
      months: 3,
    }
  },
  methods: {
    async buyPremium() {
      const stripe = Stripe(process.env.STRIPE_PUBLIC_KEY)
      const data = await this.$axios.$post('payment/create-checkout-session', {
        method: this.paymentMethod,
        months: this.months,
      })
      stripe
        .redirectToCheckout({
          sessionId: data.sessionId,
        })
        .then((data) => {})
    },
  },
  watch: {
    months(x) {
      if (x < 1) {
        this.months = 1
      }
    },
  },
}
</script>
