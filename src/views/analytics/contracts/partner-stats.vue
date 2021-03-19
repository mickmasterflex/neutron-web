<template>
  <analytics-panel-template>
    <template slot="content">
      <contracts-list
        :link-to-contract="linkToContract"
        :link-to-contract-leads="linkToContractLeads"
        :contract-contracts="$route.name === 'PartnerStatsContractContracts'"
        :client-contracts="$route.name === 'PartnerStatsClientContracts'"
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
        name: 'PartnerStatsContractLeads',
        params: { id: contract.id, clientId: this.client.id },
        query: this.$route.query
      })
    },
    linkToContract (contract) {
      this.setCurrent(contract)
      this.$router.push({
        name: 'PartnerStatsContract',
        params: { id: contract.id, clientId: this.client.id },
        query: this.$route.query
      })
    }
  }
}
</script>
