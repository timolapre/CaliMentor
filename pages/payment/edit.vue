<template>
  <div class="d-flex align-center justify-center">
    <div class="page">
      <v-btn block @click="$router.push({ name: 'account' })"> Back </v-btn>
      <h1 class="my-5 text-center">Edit payment method</h1>

      <!-- None -->
      <!-- <div v-if="$store.state.LOGGEDINUSER.paymentMethod == 'None'">
        <p>You don't have a payment method to edit yet</p>
        <v-btn @click="$router.push({ name: 'upgrade' })"
          >Add payment method</v-btn
        >
      </div> -->

      <!-- Single -->
      <div v-if="$store.state.LOGGEDINUSER.paymentMethod == 'Single'">
        <v-form
          id="upgrade-form"
          class="mt-5"
          @submit.prevent="addPremiumMonths()"
        >
          <p class="mb-0">Add Premium Months:</p>
          <v-text-field
            hide-details
            suffix="Months"
            type="number"
            min="1"
            max="99"
            v-model="months"
          ></v-text-field>
          <v-card class="pa-4 mt-5">
            <h3>
              &euro; {{ months * 1.99 }} for {{ months }} extra months
              <small class="ml-8 text--disabled">&euro; 1,99 per month</small>
            </h3>
            <p class="mb-0 mt-3">This amount will be charged once</p>
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

      <!-- Subscription -->
      <div
        v-if="
          $store.state.LOGGEDINUSER.paymentMethod == 'Subscription' &&
          $store.state.LOGGEDINUSER.type !== 'canceled'
        "
      >
        <v-btn color="red" class="mt-3" @click="cancelSubscription" block
          >Cancel subscription</v-btn
        >
      </div>
      <h3 v-if="message" class="text-center">{{ message }}</h3>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      message: '',
      months: 3,
    }
  },
  methods: {
    async cancelSubscription() {
      const data = await this.$axios.$post('payment/subscription/cancel')

      if (data == 'OK') {
        this.message = 'Your subscription has succesfully been canceled.'
        await this.$store.dispatch('getLoggedinUser', true)
      } else {
        this.message =
          'Something went wrong. Try again in a few minutes or contact support.'
      }
    },
    async addPremiumMonths() {
      const stripe = Stripe(process.env.STRIPE_PUBLIC_KEY)
      const data = await this.$axios.$post('payment/create-checkout-session', {
        method: 'Single',
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
  created() {
    if (this.$store.state.LOGGEDINUSER.paymentMethod === 'None') {
      this.$router.push({ name: 'upgrade' })
    }
  },
}
</script>
