<template>
  <analytics-panel-template>
    <template slot="content">
      <contracts-list
        :link-to-contract="linkToContract"
        :link-to-contract-leads="linkToContractLeads"
        :is-client-contracts="$route.name === 'BuyerStatsClientContracts'"
        :parent-contract-id="id"
      ></contracts-list>
    </template>
  </analytics-panel-template>
</template>

<script>
import analyticsPanelTemplate from '@/components/analytics/panel-template'
import contractsList from '@/components/analytics/contracts-list'
import { mapMutations, mapGetters } from 'vuex'

export default {
  props: {
    id: Number
  },
  components: {
    'analytics-panel-template': analyticsPanelTemplate,
    'contracts-list': contractsList
  },
  computed: {
    ...mapGetters({
      client: 'getCurrentClientStats'
    })
  },
  methods: {
    ...mapMutations({
      setCurrent: 'SET_CURRENT_CONTRACT_STATS',
      resetLeads: 'RESET_ANALYTICS_LEADS'
    }),
    linkToContractLeads (contract) {
      this.resetLeads()
      this.setCurrent(contract)
      this.$router.push({
        name: 'BuyerStatsContractLeads',
        params: { id: contract.id, clientId: this.client.id },
        query: this.$route.query
      })
    },
    linkToContract (contract) {
      this.setCurrent(contract)
      this.$router.push({
        name: 'BuyerStatsContract',
        params: { id: contract.id, clientId: this.client.id },
        query: this.$route.query
      })
    }
  }
}
</script>
