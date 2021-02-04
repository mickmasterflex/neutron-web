<template>
  <analytics-layout :hud-title="client.name">
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'contracts' ? 'active' : ''">
          <router-link :to="contractsRoute">Contracts</router-link>
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
import { mapGetters, mapMutations } from 'vuex'
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
    }
  },
  computed: {
    ...mapGetters({
      dateRange: 'getAnalyticsDateRangeUrlFormatted'
    })
  },
  methods: {
    ...mapMutations({
      resetLeads: 'RESET_ANALYTICS_LEADS'
    }),
    async setBuyerClientStats () {
      await this.fetchClient(this.id)
    }
  },
  created () {
    this.setBuyerClientStats().then(() => {
      document.title = this.client.name
    })
  },
  destroyed () {
    this.resetLeads()
  },
  watch: {
    dateRange () {
      this.fetchClient(this.id)
    }
  },
  components: {
    'analytics-layout': analyticsLayout
  }
}
</script>
