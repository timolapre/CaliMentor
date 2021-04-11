<template>
  <div class="register-container d-flex align-center justify-center">
    <div class="page">
      <v-btn @click="$router.go(-1)" block class="mb-10">Back</v-btn>
      <h1 class="mt-5 text-center">Routine</h1>
      <p class="text-center mb-10">
        Edit your routine by selecting a workout type for each day
      </p>

      <v-form id="routine-form" @submit.prevent="saveRoutine()">
        <v-row>
          <v-col cols="12" sm="6" v-for="day in days" :key="day">
            <div class="routine-day d-flex align-center justify-center overflow-hidden">
              <img
                class="routine-image"
                v-if="routineType[day.toLowerCase()]"
                :src="
                  require('../assets/images/routine/' +
                    routineType[day.toLowerCase()] +
                    '.jpg')
                "
                :alt="routineType[day.toLowerCase()] + 'background'"
              />
              <div class="overlay"></div>
              <div class="d-flex justify-center text-left">
                <div class="text mx-8">
                  <!-- <h3 class="routine-type">
                    {{ routineType[day.toLowerCase()] }}
                  </h3> -->
                  <p class="ma-0 routine-day-text">{{ day }}</p>
                  <v-select
                    hide-details
                    outlined
                    dense
                    v-model="routine.days[day.toLowerCase()]"
                    class="pa-1 ma-0 mb-1 type-select"
                    item-value="id"
                    :items="typeOptions"
                    color="white"
                  ></v-select>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- <v-row class="px-2 mb-5">
          <v-col v-for="day in days" :key="day" class="pa-1" cols="6" sm="3">
            <v-card flat class="pa-1 text-center" color="secondary">
              <p class="mb-0 day-text">{{ day }}</p>
              <v-select
                hide-details
                v-model="routine.days[day.toLowerCase()]"
                class="pa-1 ma-0 mb-1"
                item-value="id"
                :items="typeOptions"
              ></v-select>
            </v-card>
          </v-col>
        </v-row> -->

        <v-btn
          type="submit"
          form="routine-form"
          color="primary"
          block
          class="mt-5"
        >
          <v-icon small class="mr-2">fa-save</v-icon> Save</v-btn
        >
      </v-form>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      days: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      routine: {
        difficulty: 1,
        days: {
          monday: 4,
          tuesday: -1,
          wednesday: 5,
          thursday: -1,
          friday: 3,
          saturday: -1,
          sunday: 6,
        },
      },
    }
  },
  async beforeCreate() {
    await this.$store.dispatch('setWorkoutTypeOptions')
    await this.$store.dispatch('getLoggedinUser', true)
  },
  methods: {
    async saveRoutine() {
      await this.$axios.$post('user/routine', { routine: this.routine })
      await this.$store.dispatch('getLoggedinUser', true)
      this.$router.push({ name: 'dashboard' })
    },
  },
  async created() {
    this.routine = this.$store.state.LOGGEDINUSER.routine
      ? JSON.parse(this.$store.state.LOGGEDINUSER.routine)
      : this.routine
  },

  computed: {
    typeOptions() {
      return [
        { id: -1, text: 'Rest' },
        ...this.$store.state.WORKOUT_TYPE_OPTIONS,
      ]
    },
    routineType() {
      if (!this.$store.state.WORKOUT_TYPE_OPTIONS) {
        return {}
      }
      const routine = {
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: '',
      }
      Object.keys(this.routine.days).forEach((day) => {
        const x = this.$store.state.WORKOUT_TYPE_OPTIONS.filter(
          (x) => x.id == this.routine.days[day]
        )[0]
        routine[day] = x ? x.text : 'Rest'
      })

      return routine
    },
  },
}
</script>

<style lang="scss" scoped>
.routine {
  &-image {
    position: absolute;
    width: 100%;
  }
  &-day {
    .overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
    }
    .text {
      z-index: 1;
    }
    height: 150px;
    position: relative;
    border-radius: 0.3rem;
    &-text {
      font-size: 28px;
    }
  }
  &-type {
    font-size: 32px;
    line-height: 28px;
  }
}

.type-select {
  width: 100%;
  margin-left: 0 !important;
}
</style>
