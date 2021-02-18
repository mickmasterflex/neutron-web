<template>
  <analytics-layout
    :hud-title="hudTitle"
    :fetch-stats="fetchClients"
  >
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'clients' ? 'active' : ''">
          <router-link :to="clientsRoute">Clients</router-link>
        </li>
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'leads' ? 'active' : ''">
          <router-link :to="leadsRoute">Leads</router-link>
        </li>
      </ul>
    </template>
    <template v-slot:content>
      <router-view></router-view>
    </template>
  </analytics-layout>
</template>

<script>
import analyticsLayout from '@/views/analytics/layout.vue'

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
  components: {
    'analytics-layout': analyticsLayout
  }
}
</script>
