<template>
  <div class="d-flex align-center justify-center">
    <div class="page text-center">
      <h1>Thank you!</h1>
      <p>You have succesfully upgraded to a premium account.</p>
      <Confetti :confetti="confetti" @false="confetti = false" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      confetti: false,
    }
  },
  mounted() {
    this.confetti = true
    setTimeout(() => {
      this.confetti = true
    }, 1000)
    setTimeout(() => {
      this.confetti = true
    }, 2000)
  },
}
</script>
