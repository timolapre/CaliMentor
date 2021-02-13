<template>
  <canvas id="confettiCanvas" class="d-none"></canvas>
</template>

<script>
import confetti from 'canvas-confetti'

export default {
  props: {
    confetti: { default: false, type: Boolean },
    sound: { default: true },
  },
  methods: {
    async confettiGun() {
      if (this.sound) {
        const sounds = ['GoodJob', 'GreatWork', 'WellDone']
        const random = Math.floor(Math.random() * sounds.length)
        const audio = new Audio(
          require('../assets/sounds/' + sounds[random] + '.mp3')
        )
        audio.play()
      }
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
      this.$emit('false')
    },
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
  },
  watch: {
    confetti(x) {
      if (x) {
        this.confettiGun()
      }
    },
  },
}
</script>
