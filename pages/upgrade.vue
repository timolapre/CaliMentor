<template>
  <div class="d-flex align-center justify-center">
    <div class="page">
      <v-btn @click="$router.go(-1)" block>Back</v-btn>

      <h1 class="text-center my-5">Upgrade to premium</h1>

      <v-form id="upgrade-form" class="mt-5" @submit.prevent="buyPremium()">
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
        .then((data) => {
          console.log(data)
        })
    },
  },
}
</script>
