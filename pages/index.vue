<template>
  <div style="margin-top: -2rem">
    <!-- <div class="tech-slideshow">
      <div class="mover-1"></div>
    </div> -->

    <v-carousel
      :show-arrows="false"
      hide-delimiters
      touchless
      height="calc(90vh - 230px)"
      cycle
    >
      <v-carousel-item v-for="(image, i) in images" :key="i" eager>
        <v-img :src="image.src" height="100%" eager />
      </v-carousel-item>
    </v-carousel>

    <div class="homepage-container d-flex align-center justify-center">
      <div class="page mt-0">
        <div class="subtitle-container text-center">
          <h1 class="subtitle white--text font-weight-bold">
            All the calisthenics workouts you need
          </h1>
          <div class="d-flex justify-center mt-7">
            <v-btn
              class="black--text"
              color="primary"
              large
              @click="$router.push({ name: 'register' })"
              >Join for free</v-btn
            >
          </div>
        </div>

        <!-- Statistics -->
        <div class="text-center mt-10">
          <v-row class="d-flex align-center">
            <v-col cols="12" sm="6">
              <v-card
                class="pa-7 cardborder"
                @click="$router.push({ name: 'workouts' })"
              >
                <v-icon class="mb-5" large>fa-dumbbell</v-icon>
                <h2>{{ workoutCount }} Workouts</h2>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6">
              <v-card
                class="pa-7 cardborder"
                @click="$router.push({ name: 'exercises' })"
              >
                <v-icon class="mb-5" large>fa-running</v-icon>
                <h2>{{ exercisesCount }} Exercise videos</h2>
              </v-card>
            </v-col>
            <!-- <v-col cols="12" sm="4">
              <v-card
                class="pa-7 cardborder"
                @click="$router.push({ name: 'register' })"
              >
                <v-icon class="mb-5" large>fa-fist-raised</v-icon>
                <h2>Join for free</h2>
              </v-card>
            </v-col> -->
          </v-row>
        </div>

        <div class="text-center mt-15">
          <v-row class="d-flex align-stretch align-center">
            <v-col cols="12" sm="4">
              <v-icon large>fa-dumbbell</v-icon>
              <h2 class="mb-3 mt-2 text-large">Workouts</h2>
              <p>
                Never the need to think about what workout to do. Just pick one
                of the many workouts.
              </p>
            </v-col>

            <v-col cols="12" sm="4">
              <v-icon large>fa-video</v-icon>

              <h2 class="mb-3 mt-2 text-large">Videos</h2>
              <p>
                Not familiar with the name of an exercise? Don't worry. Most of
                the exercises have a video.
              </p>
            </v-col>

            <v-col cols="12" sm="4">
              <v-icon large>fa-plus</v-icon>

              <h2 class="mb-3 mt-2 text-large">Create workouts</h2>
              <p>
                Tired of writing down your workouts in notes? We make it easy
                for you to write down your workouts.
              </p>
            </v-col>
          </v-row>

          <v-row class="d-flex align-stretch align-center" v-if="showMore">
            <v-col cols="12" sm="4">
              <v-icon large>fa-calendar-alt</v-icon>

              <h2 class="mb-3 mt-2 text-large">Routine</h2>
              <p>
                Do you have a structured routine? Find a workout by a press of a
                button based on your routine.
              </p>
            </v-col>

            <v-col cols="12" sm="4">
              <v-icon large>fa-history</v-icon>

              <h2 class="mb-3 mt-2 text-large">History</h2>
              <p>
                Keep track of your workout history. Easily check what day and
                time you did a workout.
              </p>
            </v-col>

            <v-col cols="12" sm="4">
              <v-icon large>fa-medal</v-icon>

              <h2 class="mb-3 mt-2 text-large">Progress</h2>
              <p>Keep track of your personal records and progress.</p>
            </v-col>

            <v-col cols="12" sm="4">
              <v-icon large>fa-tasks</v-icon>

              <h2 class="mb-3 mt-2 text-large">Goals</h2>
              <p>
                Do you have a specific goal? Write it down and it will keep you
                motivated to reach it.
              </p>
            </v-col>

            <v-col cols="12" sm="4">
              <v-icon large>fa-stopwatch</v-icon>

              <h2 class="mb-3 mt-2 text-large">Built in timers</h2>
              <p>No need to open any other app for a stopwatch or timer.</p>
            </v-col>

            <v-col cols="12" sm="4">
              <v-icon large>fa-money-bill-alt</v-icon>

              <h2 class="mb-3 mt-2 text-large">Earn money</h2>
              <p>
                Every month we pay our workout creators based on the amount of
                users that finished their workouts.
              </p>
            </v-col>
          </v-row>

          <div class="d-flex justify-center">
            <v-btn
              large
              @click="showMore = true"
              v-if="!showMore"
              class="mb-3 mt-2 text-large"
              >And a lot more!</v-btn
            >
          </div>
        </div>

        <div hidden>
          <div v-if="!$store.state.LOGGEDIN || true">
            <!-- Sporter and Creators -->
            <div class="mt-5 text-center">
              <v-row class="d-flex align-center">
                <v-col cols="12" sm="6" align-self="start">
                  <v-card class="pa-7">
                    <h1>Sporter</h1>
                    <v-divider class="my-3"></v-divider>
                    <div class="d-flex justify-center">
                      <div class="text-left">
                        <p class="mb-1">🏋️‍♀️ Get stronger</p>
                        <p class="mb-1">🏃‍♀️ Lose fat</p>
                        <p class="mb-1">💪 Build muscle</p>
                        <p class="mb-1">🤸‍♀️ Improve flexibility</p>
                        <p class="mb-1">🧘‍♂️ Reduce stress</p>
                      </div>
                    </div>
                    <v-divider class="my-3"></v-divider>
                    <div class="d-flex justify-center">
                      <div class="text-left">
                        <p class="mb-1">Free account registration</p>
                        <p class="mb-1">Many workouts</p>
                        <p class="mb-1">
                          Track your progress and personal records
                        </p>
                        <p class="mb-1">Premium for way more features</p>
                        <p class="mb-1">Much more!</p>
                      </div>
                    </div>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" align-self="start">
                  <v-card class="pa-7">
                    <h1>Creator</h1>
                    <v-divider class="my-3"></v-divider>
                    <div class="d-flex justify-center">
                      <div class="text-left">
                        <p class="mb-1">💪 Save your workouts</p>
                        <p class="mb-1">🤝 Help people</p>
                        <p class="mb-1">👥 Get followers</p>
                        <p class="mb-1">🤑 Earn money</p>
                        <p class="mb-1">📅 Plan your own workout scheme</p>
                      </div>
                    </div>
                    <v-divider class="my-3"></v-divider>
                    <div class="d-flex justify-center">
                      <div class="text-left">
                        <p class="mb-1">Free account registration</p>
                        <p class="mb-1">Easily create new workouts</p>
                        <p class="mb-1">Beautiful simple UI</p>
                        <p class="mb-1">Get paid monthly</p>
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </div>
            <v-btn
              block
              class="mt-3"
              color="primary"
              @click="$router.push({ name: 'register' })"
            >
              Create account
            </v-btn>

            <!-- Free vs premium -->
            <div class="mt-10 text-center">
              <v-row class="d-flex align-center">
                <v-col cols="12" sm="6" align-self="start">
                  <v-card class="pa-7">
                    <h1>Free</h1>
                    <v-divider class="my-3"></v-divider>
                    <div class="d-flex justify-center">
                      <div class="text-left">
                        <p class="mb-1">✅ Access to all workouts</p>
                        <p class="mb-1">✅ Create your own workouts</p>
                        <p class="mb-1">✅ Favorite workouts</p>
                        <p class="mb-1">🟠 View workout history</p>
                        <p class="mb-1">
                          🟠 Track progress and personal records
                        </p>
                        <p class="mb-1">❌ Earn achievements</p>
                        <p class="mb-1">❌ Ads removed</p>
                      </div>
                    </div>
                    <v-btn
                      block
                      class="mt-3"
                      color="primary"
                      @click="$router.push({ name: 'register' })"
                    >
                      Create account
                    </v-btn>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" align-self="start">
                  <v-card class="pa-7">
                    <h1>Premium</h1>
                    <p class="mb-0">&euro; 1,99 / month</p>
                    <v-divider class="my-3"></v-divider>
                    <div class="d-flex justify-center">
                      <div class="text-left">
                        <p class="mb-1">✅ Access to all workouts</p>
                        <p class="mb-1">✅ Create your own workouts</p>
                        <p class="mb-1">✅ Favorite workouts</p>
                        <p class="mb-1">✅ View workouts history</p>
                        <p class="mb-1">
                          ✅ Track progress and personal records
                        </p>
                        <p class="mb-1">✅ Earn achievements</p>
                        <p class="mb-1">✅ Ads removed</p>
                      </div>
                    </div>
                    <v-btn
                      block
                      class="mt-3"
                      color="primary"
                      @click="$router.push({ name: 'register' })"
                    >
                      Create account
                    </v-btn>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </div>

          <div v-else class="mt-5">
            <Routine />
            <v-row>
              <v-col cols="6">
                <v-card
                  class="mt-5 pa-4 d-flex align-center justify-center flex-column text-center"
                  @click="$router.push({ name: 'workout-create' })"
                >
                  <v-icon class="mb-2">fa-plus</v-icon>
                  <h3>Create workout</h3>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card
                  class="mt-5 pa-4 d-flex align-center justify-center flex-column text-center"
                  @click="
                    $router.push({
                      name: 'workouts',
                      query: { favorited: 1 },
                    })
                  "
                >
                  <v-icon class="mb-2">fa-heart</v-icon>
                  <h3>Favorited workouts</h3>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Index',
  data() {
    return {
      workoutCount: 0,
      exercisesCount: 0,
      showMore: false,
      images: [
        {
          id: 0,
          src: require(`~/assets/images/carousel/HumanFlag0.jpg`),
        },
        {
          id: 1,
          src: require(`~/assets/images/carousel/C1.jpg`),
        },
        {
          id: 2,
          src: require(`~/assets/images/carousel/BridgeHandstand.jpg`),
        },
        {
          id: 3,
          src: require(`~/assets/images/carousel/C5.jpg`),
        },
        {
          id: 4,
          src: require(`~/assets/images/carousel/MelHandstand.jpg`),
        },
        {
          id: 5,
          src: require(`~/assets/images/carousel/C2.jpg`),
        },
        {
          id: 6,
          src: require(`~/assets/images/carousel/CarmenBack.jpg`),
        },
        {
          id: 7,
          src: require(`~/assets/images/carousel/bartPushup.jpg`),
        },
        {
          id: 8,
          src: require(`~/assets/images/carousel/C4.jpg`),
        },
      ],
    }
  },
  methods: {
    async getWorkoutCount() {
      const data = await this.$axios.$get('workout/count')
      this.workoutCount = data
    },
    async getexercisesCount() {
      const data = await this.$axios.$get('exercise/count')
      this.exercisesCount = data
    },
  },
  mounted() {
    this.getWorkoutCount()
    this.getexercisesCount()
  },
}
</script>

<style lang="scss">
a {
  text-decoration: none; /* no underline */
}

.subtitle {
  font-size: 35px;
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000,
    -1px -1px 0 #000, 3px 3px 4px rgba($color: #000000, $alpha: 1),
    0px 0px 4px rgba($color: #000000, $alpha: 1);
  &-container {
    position: absolute;
    width: 100%;
    top: calc(90vh - 380px);
    left: 0;
  }
}

.text-large {
  font-size: 30px;
}

.cardborder {
  border: 1px rgba(25, 210, 74, 0.7) solid !important;
}

.collage-image {
  max-width: 100%;
  height: auto;
  overflow: hidden;
}

.image {
  max-width: 100%;
  height: auto;
}
</style>
