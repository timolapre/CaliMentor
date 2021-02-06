<template>
  <div class="register-container d-flex align-center justify-center">
    <div class="page">
      <div>
        <v-row class="mb-5">
          <v-col cols="12" sm="6" class="py-1">
            <v-btn
              block
              :color="selectedDashboard == 'Sporter' ? 'primary' : ''"
              @click="selectedDashboard = 'Sporter'"
            >
              Sporter
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" class="py-1">
            <v-btn
              block
              :color="selectedDashboard == 'Creator' ? 'primary' : ''"
              @click="selectedDashboard = 'Creator'"
            >
              Creator
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <v-divider class="mb-3"></v-divider>

      <!-- Sporter Dashboard -->
      <DashboardSporter
        v-if="selectedDashboard == 'Sporter'"
      ></DashboardSporter>

      <!-- Creator Dashboard -->
      <DashboardCreator
        v-if="selectedDashboard == 'Creator'"
      ></DashboardCreator>
    </div>
  </div>
</template>

<script lang="ts">
import { User } from '../types'

export default {
  data() {
    return {
      selectedDashboard: 'Sporter',
    }
  },
  methods: {
    async logout() {
      const data = await this.$axios.$get('user/logout')

      if (data) {
        await this.$store.dispatch('logoutUser')
        this.$router.push({ name: 'login' })
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
