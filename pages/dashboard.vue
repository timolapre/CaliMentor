<template>
  <div class="dashboard-container d-flex align-center justify-center">
    <LoggedInOnly />
    <div class="page overflow-hidden">
      <!-- Routine -->
      <div class="text-center">
        <v-icon x-large>fa-calendar-alt</v-icon>
        <h1 class="mb-8 mt-2 text-large">Routine</h1>
      </div>

      <div v-show="hasRoutine">
        <div class="d-flex justify-end mb-1">
          <v-btn
            small
            min-width="auto"
            class="px-3"
            @click="$router.push({ name: 'routine' })"
          >
            <v-icon small>fa-pen</v-icon>
          </v-btn>
        </div>
        <div class="routine d-flex">
          <div
            class="routine-container d-flex justify-center"
            id="routine-container"
          >
            <div
              class="routine-day py-3 d-flex justify-center align-center cursor-pointer overflow-hidden"
              v-for="(day, i) in days"
              :key="day"
              :id="i == (new Date().getDay() + 6) % 7 ? 'routine-today' : ''"
              @click="searchWOD(day)"
            >
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
                <div class="text">
                  <h3 class="routine-type">
                    {{ routineType[day.toLowerCase()] }}
                  </h3>
                  <p class="ma-0 routine-day-text">{{ day }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!hasRoutine">
        <v-card class="pa-5 text-center">
          <h3 class="mb-5">You have not configured your routine yet</h3>
          <v-btn color="secondary" @click="$router.push({ name: 'routine' })"
            >Configure routine</v-btn
          >
        </v-card>
      </div>

      <!-- Progress -->
      <v-divider class="my-8"></v-divider>
      <div class="text-center">
        <v-icon x-large>fa-medal</v-icon>
        <h2 class="mt-2 text-large">Progress</h2>
        <p class="mb-10 mt-0">
          Click on a workout to see history or add a new personal record
        </p>
      </div>

      <!-- <v-row>
        <v-col
          cols="12"
          sm="6"
          v-for="pr in PRs"
          :key="pr.id"
        >
          <div class="d-flex">
            <div class="action-button mr-2">
              <v-icon small>fa-history</v-icon>
            </div>
            <div class="action-button"><v-icon small>fa-plus</v-icon></div>
          </div>
          <v-card class="py-2 px-4 rounded-tl-0">
            <div class="d-flex">
              <h2>{{ pr.exercise }}</h2>
              <h2 class="ml-auto">{{ pr.history[0].count }}{{ pr.append }}</h2>
            </div>
          </v-card>
        </v-col>
      </v-row> -->

      <div v-if="goalsLoading" class="d-flex justify-center">
        <Loading />
      </div>
      <div v-else>
        <v-dialog
          max-width="768"
          overlay-opacity="0.85"
          overlay-color="black"
          v-model="dialog"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-row class="mx-0">
              <v-col
                cols="12"
                md="6"
                v-for="pr in PRs"
                :key="pr.id"
                class="pa-1"
              >
                <v-card
                  class="py-2 px-5"
                  v-bind="attrs"
                  v-on="on"
                  @click="
                    selectedExerciseNewCount = pr.history[0].count
                    selectedPR = pr
                  "
                >
                  <div class="d-flex">
                    <h2>{{ pr.exercise }}</h2>
                    <h2 class="ml-auto">
                      {{ pr.history[0].count }}{{ pr.append }}
                    </h2>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </template>
          <v-dialog
            v-model="DeletePRDialog"
            persistent
            max-width="290"
            overlay-opacity="0.85"
            overlay-color="black"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                class="rounded-b-0"
                color="secondary"
                @click="DeleteWorkoutDialog = true"
                small
                width="10px"
              >
                <v-icon x-small>fa-trash</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline"> Delete progress </v-card-title>
              <v-card-text>
                Are you sure you want to delete your progress of
                {{ selectedPR.exercise }} permanently?
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green" text @click="DeletePRDialog = false">
                  Cancel
                </v-btn>
                <v-btn
                  color="red"
                  text
                  @click="
                    deletePR()
                    DeletePRDialog = false
                  "
                >
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-card class="pa-3 rounded-tl-0">
            <h1 color="secondary" class="text-center mb-2">
              {{ selectedPR.exercise }}
            </h1>
            <div class="history-scroll-container">
              <div
                class="history-scroll"
                :class="selectedPR.history.length >= 4 ? 'mb-9' : ''"
              >
                <PersonalRecordHistoryBlock
                  v-for="h in selectedPR.history"
                  :key="h.id"
                  :append="selectedPR.append"
                  :history="h"
                />
              </div>
            </div>

            <div class="d-flex align-center mt-5" style="position: relative">
              <div
                class="history-scroll-overlay"
                v-if="selectedPR.history.length >= 4"
              ></div>
              <v-text-field
                flat
                solo
                dense
                hide-details
                type="number"
                background-color="secondary"
                v-model="selectedExerciseNewCount"
              ></v-text-field>
            </div>
            <v-btn
              @click="addPersonalRecordHistory()"
              color="secondary"
              class="mt-3"
              block
              ><v-icon small>fa-plus</v-icon></v-btn
            >
          </v-card>
        </v-dialog>

        <div v-if="$store.state.PREMIUMUSER || PRs.length < 3">
          <v-row class="mx-1 mt-3 mb-2">
            <v-col class="px-0 pb-0">
              <v-combobox
                flat
                solo
                dense
                hide-details
                background-color="secondary"
                :items="$store.state.EXERCISENAMES"
                placeholder="Exercise"
                class="block-input"
                v-model="newExercise.name"
              ></v-combobox>
            </v-col>
            <v-col
              cols="3"
              sm="2"
              class="d-flex align-center justify-end px-1 pb-0"
            >
              <v-text-field
                flat
                solo
                dense
                hide-details
                type="number"
                background-color="secondary"
                v-model="newExercise.count"
              ></v-text-field>
            </v-col>
            <v-col
              cols="3"
              sm="2"
              class="d-flex align-center justify-end px-0 pb-0"
            >
              <v-select
                flat
                solo
                dense
                hide-details
                background-color="secondary"
                :items="['x', 's', 'm', 'kg']"
                v-model="newExercise.append"
              ></v-select>
            </v-col>
          </v-row>
          <div class="mx-1">
            <v-btn block color="secondary" @click="addPersonalRecord">
              <v-icon small>fa-plus</v-icon></v-btn
            >
          </div>
        </div>
        <div v-else class="mt-5 mx-1">
          <v-btn block @click="$router.push({ name: 'upgrade' })">
            <p class="ma-0">You need premium to add more</p></v-btn
          >
        </div>
      </div>

      <!-- Goals -->
      <v-divider class="my-8"></v-divider>

      <div class="text-center">
        <v-icon x-large>fa-tasks</v-icon>
        <h2 class="mb-8 mt-2 text-large">Goals</h2>
      </div>

      <div v-if="goalsLoading" class="d-flex justify-center">
        <Loading />
      </div>
      <div v-else>
        <v-row class="mx-0">
          <v-col
            cols="12"
            md="6"
            v-for="goal in goals"
            :key="goal.id"
            class="pa-1"
          >
            <GoalBlock @remove-goal="removeGoal" :goal="goal" />
          </v-col>
        </v-row>

        <div v-if="$store.state.PREMIUMUSER || goals.length < 3">
          <v-row class="mx-1 mt-3 mb-2">
            <v-col cols="12" class="pa-0 pb-2 mt-3">
              <v-menu
                v-model="dateMenu"
                :close-on-content-click="false"
                max-width="290"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    flat
                    solo
                    dense
                    hide-details
                    background-color="secondary"
                    :value="formatDate"
                    clearable
                    color="primary"
                    label="Deadline (optional)"
                    v-on="on"
                    append-icon="fa-calendar-alt"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="deadlineDatum"
                  @change="dateMenu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col class="px-0 py-0">
              <v-combobox
                flat
                solo
                dense
                hide-details
                background-color="secondary"
                :items="$store.state.EXERCISENAMES"
                placeholder="Exercise"
                class="block-input"
                v-model="newGoal.name"
              ></v-combobox>
            </v-col>
            <v-col
              cols="3"
              sm="2"
              class="d-flex align-center justify-end px-1 py-0"
            >
              <v-text-field
                flat
                solo
                dense
                hide-details
                type="number"
                background-color="secondary"
                v-model="newGoal.count"
              ></v-text-field>
            </v-col>
            <v-col
              cols="3"
              sm="2"
              class="d-flex align-center justify-end px-0 py-0"
            >
              <v-select
                flat
                solo
                dense
                hide-details
                background-color="secondary"
                :items="['x', 's', 'm', 'kg']"
                v-model="newGoal.append"
              ></v-select>
            </v-col>
          </v-row>
          <div class="mx-1">
            <v-btn block color="secondary" @click="addGoal">
              <v-icon small>fa-plus</v-icon></v-btn
            >
          </div>
        </div>
        <div v-else class="mt-5 mx-1">
          <v-btn block@click="$router.push({ name: 'upgrade' })">
            <p class="ma-0">You need premium to add more</p></v-btn
          >
        </div>
      </div>

      <!-- History -->
      <v-divider class="my-8"></v-divider>
      <div class="text-center">
        <v-icon x-large>fa-history</v-icon>
        <h2 class="mb-8 mt-2 text-large">History</h2>
      </div>
      <WorkoutHistory class="history-container" />
    </div>
  </div>
</template>

<script lang="ts">
import { User } from '../types'
import moment from 'moment'

export default {
  data() {
    return {
      PRs: [],
      goals: [],
      goalsLoading: true,
      PRsLoading: true,
      selectedPR: { exercise: '', append: 'x', history: [] },
      selectedExerciseNewCount: 1,
      newExercise: { append: 'x', count: 1 },
      newGoal: { append: 'x', count: 1 },
      days: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      dateMenu: false,
      deadlineDatum: null,
      dialog: false,
      DeletePRDialog: false,
      hasRoutine: false,
    }
  },
  methods: {
    async getPersonalRecords() {
      const data = await this.$axios.$get('personalrecord/all')
      this.PRs = data || []
      this.PRsLoading = false
    },
    async addPersonalRecord() {
      const data = await this.$axios.$post('personalrecord/add', {
        exercise: this.newExercise,
      })
      this.PRs.push(data)
    },
    async addPersonalRecordHistory() {
      const data = await this.$axios.$post('personalrecord/add', {
        exercise: { ...this.selectedPR, count: this.selectedExerciseNewCount },
      })
      this.selectedPR = data
      const PRIndex = this.PRs.findIndex((x) => x.id == data.id)
      this.PRs[PRIndex] = data
    },
    async deletePR() {
      const data = await this.$axios.$post('personalrecord/delete', {
        id: this.selectedPR.id,
      })
      this.dialog = false
      this.PRs = this.PRs.filter((x) => x.id != this.selectedPR.id)
    },
    async addGoal() {
      const data = await this.$axios.$post('goal/add', {
        exercise: this.newGoal,
        deadline: this.deadlineDatum,
      })
      this.goals.push(data)
    },
    async getGoals() {
      const data = await this.$axios.$get('goal/all')
      this.goals = data || []
      this.goalsLoading = false
    },
    removeGoal(goal) {
      const index = this.goals.indexOf(goal)
      if (index > -1) {
        this.goals.splice(index, 1)
      }
    },
    searchWOD(day) {
      const type = this.routine.days[day.toLowerCase()]
      if (type < 0) {
        return
      }
      this.$router.push({
        name: 'workouts',
        query: {
          //difficulty: this.routine.difficulty,
          type,
        },
      })
    },
    scrollToWOD() {
      if (this.routine.days.length == 0) {
        return
      }
      var elmnt = document.getElementById('routine-today')
      if (!elmnt) {
        return
      }
      elmnt.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    },
  },
  computed: {
    formatDate(date) {
      return this.deadlineDatum
        ? moment(this.deadlineDatum).format('DD-MM-YYYY')
        : ''
    },
    todayType() {
      const dayOfWeek = (new Date().getDay() + 6) % 7
      return this.routineType[Object.keys(this.routineType)[dayOfWeek]]
    },
    routine() {
      if (!this.$store.state.LOGGEDINUSER.routine) {
        this.hasRoutine = false
        return { days: {} }
      }
      try {
        this.hasRoutine = true
        return JSON.parse(this.$store.state.LOGGEDINUSER.routine)
      } catch (e) {
        this.hasRoutine = false
        return { days: {} }
      }
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
    difficultyText() {
      if (!this.$store.state.WORKOUT_DIFFICULTY_OPTIONS) {
        return ''
      }
      const x = this.$store.state.WORKOUT_DIFFICULTY_OPTIONS.filter(
        (x) => x.id == this.routine.difficulty
      )
      if (x.length) {
        return x[0].text
      } else return ''
    },
  },

  async beforeCreate() {
    await this.$store.dispatch('setWorkoutTypeOptions')
    await this.$store.dispatch('setWorkoutDifficultyOptions')
    await this.$store.dispatch('setWorkoutDurationOptions')
  },
  async created() {
    this.getPersonalRecords()
    this.getGoals()
  },
  mounted() {
    setTimeout(() => {
      this.scrollToWOD()
    }, 1000)
  },
}
</script>

<style lang="scss" scoped>
.routine {
  height: 150px;
  width: auto;
  overflow-x: hidden;
  overflow-y: hidden;
  &-container {
    min-width: 2200px;
  }
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
    position: relative;
    border-radius: 0.3rem;
    margin: 0 1rem 0 0;
    min-width: 220px;
    max-width: 220px;
    &-text {
      font-size: 18px;
    }
  }
  &-type {
    font-size: 34px;
    line-height: 28px;
  }
}

.action-button {
  background-color: $black-tertiary;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  width: 40px;
  padding: 0.1rem;
}

.history-scroll {
  &-container {
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 250px;
    position: relative;
  }

  &-overlay {
    position: absolute;
    top: -70px;
    height: 50px;
    width: 100%;
    background-image: linear-gradient(rgba(0, 0, 0, 0), #1e1e1e);
  }
}

.history-container {
  min-height: 512px;
}

#routine-today {
  border: 2px $green solid;
}
</style>
