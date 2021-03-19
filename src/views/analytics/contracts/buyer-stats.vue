<template>
  <contracts-index>
    <contracts-list
      :link-to-contract="linkToContract"
      :link-to-contract-leads="linkToContractLeads"
      :contract-contracts="$route.name === 'BuyerStatsContractContracts'"
      :client-contracts="$route.name === 'BuyerStatsClientContracts'"
      :parent-contract-id="id"
    ></contracts-list>
  </contracts-index>
</template>

<script>
import contractsIndex from './index'
import contractsList from '@/components/analytics/contracts-list'
import { mapMutations, mapGetters } from 'vuex'

export default {
  props: {
    id: Number
  },
  components: {
    'contracts-index': contractsIndex,
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
