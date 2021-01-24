<template>
  <v-tooltip top data-html="true">
    <template v-slot:activator="{ on, attrs }">
      <v-avatar color="secondary" size="60" v-bind="attrs" v-on="on">
        <v-icon
          :x-small="'x-small' == achievement.size"
          :small="'small' == achievement.size"
          :medium="'medium' == achievement.size"
          :large="'large' == achievement.size"
        >
          fa-{{ achievement.icon }}</v-icon
        >
      </v-avatar>
    </template>
    <span> {{ achievement.tooltip }} </span>
  </v-tooltip>
</template>

<script lang="ts">
export default {
  name: 'Achievement',
  props: { achievement: { type: Object, default: () => {} } },
}
</script>
