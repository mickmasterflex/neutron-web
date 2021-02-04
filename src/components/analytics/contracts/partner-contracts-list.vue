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
      client: 'getCurrentPartnerStatsClient',
      contractsCount: 'getPartnerClientContractsByParentCount'
    })
  },
  methods: {
    ...mapMutations({
      setCurrent: 'SET_CURRENT_PARTNER_STATS_CONTRACT'
    }),
    linkToContractLeads (contract) {
      this.setCurrent(contract)
      this.$router.push({ name: 'PartnerStatsContractLeads', params: { id: contract.id, clientId: this.client.id } })
    },
    linkToContractContracts (contract) {
      this.setCurrent(contract)
      this.$router.push({ name: 'PartnerStatsContractContracts', params: { id: contract.id, clientId: this.client.id } })
    },
    linkToContract (contract) {
      this.setCurrent(contract)
      this.$router.push({ name: 'PartnerStatsContract', params: { id: contract.id, clientId: this.client.id } })
    }
  }
}
</script>
