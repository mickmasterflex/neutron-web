<template>
  <contracts-list :contracts="contracts"
                  :link-to-contract="linkToContract"
                  :link-to-contract-leads="linkToContractLeads"
                  :link-to-contract-contracts="linkToContractContracts"
                  :contracts-count="contractsCount"
  ></contracts-list>
</template>

<script>
import contractsList from '@/components/analytics/contracts/contracts-list'
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    contracts: {
      type: Array,
      required: true
    }
  },
  components: {
    'contracts-list': contractsList
  },
  computed: {
    ...mapGetters({
      client: 'getCurrentBuyerStatsClient',
      contractsCount: 'getBuyerClientContractsByParentCount'
    })
  },
  methods: {
    ...mapMutations({
      setCurrent: 'SET_CURRENT_BUYER_STATS_CONTRACT',
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
    linkToContractContracts (contract) {
      this.setCurrent(contract)
      this.$router.push({
        name: 'BuyerStatsContractContracts',
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
