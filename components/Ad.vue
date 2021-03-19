<template>
  <div v-if="!$store.state.PREMIUMUSER" class="ad mt-3">
    <adsbygoogle />
  </div>
</template>

<style lang="scss">
.ad {
  max-width: 95vw;
}
</style>
