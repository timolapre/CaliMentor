<template>
  <div class="homepage-container d-flex align-center justify-center">
    <div class="page">
      <Filters />

      <div class="w-100 mt-5">
        <v-btn block class="w-100">Random workout</v-btn>
      </div>

      <div class="w-100 mt-4">
        <v-btn block elevation="5" color="primary" to="/workouts"
          >All workouts</v-btn
        >
      </div>

      <div class="mt-5">
        <h1>About</h1>
        <p>
          CaliMentor is a calisthenics platform with many workouts made by
          professional calisthenics athletes with years of experience. Are you
          just starting with calisthenics or do you already have years of
          experience? We have workouts available for everyone. Stop wasting time
          thinking of your own workout and just look through the list and pick
          one of you liking.
        </p>
        <p>
          Create an account and favorite workouts or start creating your own
          workouts for the world to see. Start tracking your personal records
          and much more.
        </p>
      </div>

      <!-- <div class="mt-5">
        <div class="row">
          <div class="col-6">
            <v-btn block to="login">Login</v-btn>
          </div>
          <div class="col-6">
            <v-btn block to="register">Register</v-btn>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Index',
}
</script>

<style lang="scss"></style>
