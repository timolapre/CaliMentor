<template></template>

<script>
export default {
  props: { page: { default: 'index' } },
  async created() {
    await this.$store.dispatch('getLoggedinUser')
    await this.$store.dispatch('setExerciseOptions')
    if (!this.$store.state.LOGGEDIN) {
      this.$router.push({ name: this.page })
    }
  },
}
</script>
