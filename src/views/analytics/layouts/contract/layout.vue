<template>
  <analytics-layout
    :hud-title="contract.name"
    :fetchStats="fetchContractStats"
    :fetch-id="id"
  >
    <template v-slot:statCards>
      <slot name="statCards"></slot>
    </template>
    <template v-slot:contentTabs>
      <underscore-tabs>
        <underscore-tab :active="$route.meta.contentTab === 'contracts'">
          <router-link :to="{
          name: contractsRouteName,
          params: { clientId: $route.params.clientId, id: id },
          query: $route.query
        }">Contracts <label-number :number="contracts.length"></label-number></router-link>
        </underscore-tab>
        <slot name="contentTab"></slot>
        <underscore-tab :active="$route.meta.contentTab === 'leads'">
          <router-link :to="{
                     name: leadsRouteName,
                     params: { clientId: $route.params.clientId, id: id },
                     query: $route.query
          }">Leads <label-number :number="leadCount"></label-number></router-link>
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
    id: Number,
    leadsRouteName: {
      type: String,
      required: true,
      validator: function (value) {
        return ['BuyerStatsContractLeads', 'PartnerStatsContractLeads'].includes(value)
      }
    },
    contractsRouteName: {
      type: String,
      required: true,
      validator: function (value) {
        return ['BuyerStatsContractContracts', 'PartnerStatsContractContracts'].includes(value)
      }
    },
    fetchContractStats: {
      type: Function,
      required: true
    }
  },
  watch: {
    contract () {
      document.title = this.contract.name
    }
  },
  computed: {
    ...mapGetters({
      contract: 'getCurrentContractStats',
      leadCount: 'getAnalyticsTotalLeadCount',
      contractsByParent: 'getCurrentStatsContractsByParent'
    }),
    contracts () {
      return this.contractsByParent(this.id)
    }
  },
  components: {
    'analytics-layout': analyticsLayout
  }
}
</script>
