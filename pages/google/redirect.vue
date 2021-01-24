<template>
  <div>
    <h1 class="text-center">{{ message }}</h1>
    <div class="d-flex justify-center">
      <Loading v-if="loading" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      loading: true,
      message: '',
    }
  },
  async created() {
    const code = this.$route.query.code
    const data = await this.$axios.$post('google/login', { code })
    this.loading = false
    if (data.id) {
      this.$router.push({ name: 'account' })
    } else {
      this.message = 'Something went wrong'
    }
  },
}
</script>
