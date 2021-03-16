<template>
  <div v-if="!$store.state.PREMIUMUSER" class="ad">
    <adsbygoogle />
  </div>
</template>

<style lang="scss">
.ad {
  max-width: 95vw;
}
</style>
