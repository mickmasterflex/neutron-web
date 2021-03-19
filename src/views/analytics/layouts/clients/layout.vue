<template>
  <analytics-layout
    :hud-title="hudTitle"
    :fetch-stats="fetchClients"
  >
    <template v-slot:statCards>
      <stat-card :loading="loading" :data="clientsCount" title="Clients" key="clientCountStatCard" ></stat-card>
    </template>
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'clients' ? 'active' : ''">
          <router-link :to="clientsRoute">Clients <label-number :number="clientsCount"></label-number></router-link>
        </li>
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'leads' ? 'active' : ''">
          <router-link :to="leadsRoute">Leads <label-number :number="leadCount"></label-number></router-link>
        </li>
      </ul>
    </template>
    <template v-slot:content>
      <router-view></router-view>
    </template>
  </analytics-layout>
</template>

<script>
import analyticsLayout from '@/views/analytics/layouts/analytics-layout.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    hudTitle: {
      type: String,
      default: 'All Clients'
    },
    fetchClients: {
      type: Function,
      required: true
    },
    clientsRoute: {
      type: Object,
      required: true
    },
    leadsRoute: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      leadCount: 'getAnalyticsTotalLeadCount',
      clients: 'getAllClientsStats',
      loading: 'getAnalyticsFetchLoading'
    }),
    clientsCount () {
      return this.clients.length
    }
  },
  methods: {
    ...mapMutations({
      resetBreadcrumbs: 'RESET_CURRENT_BREADCRUMBS'
    })
  },
  created () {
    this.resetBreadcrumbs()
  },
  components: {
    'analytics-layout': analyticsLayout
  }
}
</script>
