<template>
  <div>
    <!-- Totals -->
    <v-card class="pa-4">
      <p class="text--disabled">Overall statistics</p>
      <div v-if="totalLoading" class="d-flex align-center justify-center">
        <Loading />
      </div>
      <v-row class="d-flex mt-1" v-else>
        <v-col cols="12" sm="6" class="pt-0">
          <v-card class="py-2 px-3 d-flex" color="secondary">
            <v-icon small class="mr-2">fa-dumbbell</v-icon>
            <h3>{{ totalData.workoutsCount }} workouts</h3>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" class="pt-0">
          <v-card class="py-2 px-3 d-flex" color="secondary">
            <v-icon small class="mr-2">fa-flag-checkered</v-icon>
            <h3>{{ totalData.finishesCount }} finishes</h3>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <!-- Monthly -->
    <v-card class="pa-4 mt-3">
      <p class="text--disabled">Monthly statistics</p>
      <v-date-picker
        flat
        full-width
        v-model="date"
        color="primary"
        event-color="orange accent-4"
        type="month"
        @click:month="getMonthlyData"
        @click:year="getMonthlyData"
        class="mb-3"
      ></v-date-picker>
      <div v-if="monthlyLoading" class="d-flex align-center justify-center">
        <Loading />
      </div>
      <div v-show="!monthlyLoading">
        <canvas id="lineGraphCanvas"></canvas>

        <v-row class="d-flex mt-4 mb-3">
          <v-col cols="12" sm="6" class="py-1 pr-sm-1">
            <v-card class="py-2 px-3 d-flex" color="secondary">
              <v-icon small class="mr-2">fa-dumbbell</v-icon>
              <h3>{{ monthlyData.workoutsCount }} workouts added</h3>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" class="py-1 pl-sm-1">
            <v-card class="py-2 px-3 d-flex" color="secondary">
              <v-icon small class="mr-2">fa-flag-checkered</v-icon>
              <h3>{{ finishesHistoryLength }} finishes</h3>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="d-flex mb-1">
          <v-col cols="12" sm="6" class="py-1 pr-sm-1">
            <v-card class="py-2 px-3 d-flex" color="secondary">
              <v-icon small class="mr-2">fa-flag-checkered</v-icon>
              <h3>{{ finishPercentage }}% of total finishes</h3>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" class="py-1 pl-sm-1">
            <v-card class="py-2 px-3 d-flex" color="secondary">
              <v-icon small class="mr-2">fa-money-bill</v-icon>
              <h3>&euro;0.00 paid (coming soon)</h3>
            </v-card>
          </v-col>
        </v-row>

        <!-- <h3>$x paid or coming end of month</h3> -->

        <!-- <v-card color="secondary" class="py-2 px-3 my-3">
        <h3 class="float-right">12 finishes</h3>
        <h3>Workout 1</h3>
      </v-card> -->
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import Chart from 'chart.js'

export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 7),
      totalData: { workoutsCount: null, finishesCount: null },
      monthlyData: {
        workoutsCount: null,
        finishesHistory: null,
        totalFinishes: null,
      },
      totalLoading: true,
      monthlyLoading: true,
    }
  },
  methods: {
    async getMonthlyData() {
      this.monthlyLoading = true
      const data = await this.$axios.$post('creator/data', { date: this.date })
      this.monthlyData = data

      const d = this.date.split('-')
      const daysInMonth = new Date(d[0], d[1], 0).getDate()

      const dayValues = Array(daysInMonth).fill(0)
      this.monthlyData.finishesHistory.forEach((f) => {
        const day = new Date(f.createdAt).getDate()
        dayValues[day - 1]++
      })

      const canvas = <HTMLCanvasElement>(
        document.getElementById('lineGraphCanvas')
      )
      const ctx = canvas.getContext('2d')
      var myLineChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
          datasets: [
            {
              label: 'Finishes',
              backgroundColor: '#19D24B',
              data: dayValues,
            },
          ],
        },
        // options: options,
      })
      this.monthlyLoading = false
    },
    async getTotalData() {
      const data = await this.$axios.$get('creator/data')
      this.totalData = data
      this.totalLoading = false
    },
  },
  created() {
    this.getTotalData()
    this.getMonthlyData()
  },
  computed: {
    finishPercentage() {
      return this.monthlyData.finishesHistory &&
        this.monthlyData.finishesHistory.length
        ? Math.round(
            (this.monthlyData.finishesHistory.length /
              this.monthlyData.totalFinishes) *
              100
          )
        : 0
    },
    finishesHistoryLength() {
      return this.monthlyData.finishesHistory
        ? this.monthlyData.finishesHistory.length
        : 0
    },
  },
}
</script>

<style lang="scss" scoped>
.v-date-picker-table--month {
  td {
    height: 30px;
  }
}
</style>
