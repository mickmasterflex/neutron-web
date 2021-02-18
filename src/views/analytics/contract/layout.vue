<template>
  <analytics-layout :hud-title="contract.name">
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <slot name="contentTab"></slot>
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
    clientId: Number,
    id: Number,
    contract: {
      type: Object,
      required: true
    },
    leadsRoute: {
      type: Object,
      required: true
    },
    fetchContractStats: {
      type: Function,
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
    async setContractStats () {
      await this.fetchContractStats(this.id)
    }
  },
  created () {
    this.setContractStats().then(() => {
      document.title = this.contract.name
    })
  },
  destroyed () {
    this.resetLeads()
  },
  watch: {
    dateRange () {
      this.fetchContractStats(this.id)
    }
  },
  components: {
    'analytics-layout': analyticsLayout
  }
}
</script>
