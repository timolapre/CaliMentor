<template>
  <div class="difficultybar-container">
    <div class="difficulty" :class="color"></div>
  </div>
</template>

<script>
export default {
  name: 'DifficultyBar',
  props: { difficulty: { type: Number, default: undefined } },
  computed: {
    color() {
      if (this.difficulty === 1) {
        return 'green'
      } else if (this.difficulty === 2) {
        return 'orange'
      } else if (this.difficulty === 3) {
        return 'red'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.difficultybar-container {
  position: relative;
  background-color: $background-color;
  width: 100px;
  height: 0.3rem;
  border-radius: 10rem;

  .difficulty {
    position: absolute;
    height: 100%;
    border-radius: 10rem;
  }

  .green {
    width: 33%;
    background-color: $green;
  }

  .orange {
    width: 66%;
    background-color: $orange;
  }

  .red {
    width: 100%;
    background-color: $red;
  }
}
</style>
