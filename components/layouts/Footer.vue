<template>
  <div>
    <v-footer class="d-none d-md-block text-center" absolute
      >&copy; CaliMentor</v-footer
    >
    <v-footer
      class="d-md-none d-flex justify-center align-center text-center"
      height="60rem"
      fixed
    >
      <div class="row m-0 p-0">
        <div
          v-for="button in buttons"
          :key="button.name"
          class="col-3 cursor-pointer"
          @click="$router.push({ name: button.url })"
        >
          <v-icon>{{ button.icon }}</v-icon>
        </div>
      </div>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'MenuFooter',
  data() {
    return {
      buttons: [
        {
          name: 'workouts',
          icon: 'fa-dumbbell',
          url: 'workouts',
        },
        {
          name: 'Saved workouts',
          icon: 'fa-save',
          url: '',
        },
        {
          name: 'Search',
          icon: 'fa-search',
          url: '',
        },
        {
          name: 'Account',
          icon: 'fa-user',
          url: 'Account',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
