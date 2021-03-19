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
      <ul class="underscore-tabs">
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'contracts' ? 'active' : ''">
          <router-link :to="{
          name: contractsRouteName,
          params: { clientId: clientId, id: id },
          query: $route.query
        }">Contracts <label-number :number="contracts.length"></label-number></router-link>
        </li>
        <slot name="contentTab"></slot>
        <li class="underscore-tab underscore-tab-lg"
            :class="$route.meta.contentTab === 'leads' ? 'active' : ''">
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
import { mapGetters } from 'vuex'

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
