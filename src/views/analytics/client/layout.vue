<template>
  <analytics-layout
    :hud-title="client.name"
    :fetch-stats="fetchClient"
    :fetch-id="id"
  >
    <template v-slot:statCards>
      <stat-card :data="contractsCount" title="Contracts" key="contractCountStatCard" ></stat-card>
    </template>
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'contracts' ? 'active' : ''">
          <router-link :to="contractsRoute">Contracts <label-template>{{contractsCount}}</label-template></router-link>
        </li>
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'leads' ? 'active' : ''">
          <router-link :to="leadsRoute">Leads <label-template>{{leadCount}}</label-template></router-link>
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
import { mapGetters } from 'vuex'

export default {
  props: {
    id: {
      type: Number
    },
    contractsRoute: {
      type: Object,
      required: true
    },
    leadsRoute: {
      type: Object,
      required: true
    },
    fetchClient: {
      type: Function,
      required: true
    },
    client: {
      type: Object,
      required: true
    },
    contractsCount: {
      type: Number,
      default: 0
    }
  },
  watch: {
    client () {
      document.title = this.client.name
    }
  },
  computed: {
    ...mapGetters({
      leadCount: 'getAnalyticsTotalLeadCount'
    })
  },
  components: {
    'analytics-layout': analyticsLayout
  }
}
</script>
