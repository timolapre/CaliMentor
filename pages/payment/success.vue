<template>
  <div class="d-flex align-center justify-center">
    <div class="page text-center">
      <h1>Thank you!</h1>
      <p>You have succesfully upgraded to a premium account.</p>
      <canvas id="confettiCanvas" class="d-none"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import confetti from 'canvas-confetti'
export default {
  methods: {
    fireConfetti(particleRatio, opts) {
      var myCanvas = document.getElementById('confettiCanvas')
      var count = 200
      var defaults = {
        origin: { y: 0.8 },
      }
      var myConfetti = confetti.create(myCanvas, {
        resize: true,
        useWorker: true,
      })
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        })
      )
    },
    confetti() {
      this.fireConfetti(0.25, {
        spread: 26,
        startVelocity: 55,
      })
      this.fireConfetti(0.2, {
        spread: 60,
      })
      this.fireConfetti(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      })
      this.fireConfetti(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      })
      this.fireConfetti(0.1, {
        spread: 120,
        startVelocity: 45,
      })
    },
  },
  mounted() {
    this.confetti()
    setTimeout(() => {
      this.confetti()
    }, 1000)
    setTimeout(() => {
      this.confetti()
    }, 2000)
  },
}
</script>
