<template>
  <analytics-layout
    :hud-title="client.name"
    :fetch-stats="fetchClient"
    :fetch-id="id"
  >
    <template v-slot:contentTabs>
      <underscore-tabs>
        <underscore-tab :active="$route.meta.contentTab === 'contracts'">
          <router-link :to="{ name: contractsRouteName, query: $route.query }">Contracts <label-number :number="contracts.length"></label-number></router-link>
        </underscore-tab>
        <underscore-tab :active="$route.meta.contentTab === 'leads'">
          <router-link :to="{ name: leadsRouteName, query: $route.query }">Leads <label-number :number="leadCount"></label-number></router-link>
        </underscore-tab>
      </underscore-tabs>
    </template>
    <template v-slot:content>
      <router-view></router-view>
    </template>
  </analytics-layout>
</template>

<script>
import analyticsLayout from '@/views/analytics/layouts/analytics-layout.vue'
import { mapGetters } from 'vuex'

export default {
  props: {
    id: {
      type: Number
    },
    leadsRouteName: {
      type: String,
      required: true,
      validator: function (value) {
        return ['BuyerStatsClientLeads', 'PartnerStatsClientLeads'].includes(value)
      }
    },
    contractsRouteName: {
      type: String,
      required: true,
      validator: function (value) {
        return ['BuyerStatsClientContracts', 'PartnerStatsClientContracts'].includes(value)
      }
    },
    fetchClient: {
      type: Function,
      required: true
    }
  },
  watch: {
    client () {
      document.title = this.client.name
    }
  },
  computed: {
    ...mapGetters({
      leadCount: 'getAnalyticsTotalLeadCount',
      loading: 'getAnalyticsFetchLoading',
      client: 'getCurrentClientStats',
      contracts: 'getCurrentStatsContractsParentless'
    })
  },
  components: {
    'analytics-layout': analyticsLayout
  }
}
</script>
