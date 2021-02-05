<template>
  <contracts-layout :contract="buyerContract">
    <template v-slot:content>
      <buyer-contract-list :contracts="buyerContracts"></buyer-contract-list>
    </template>
  </contracts-layout>
</template>

<script>
import buyerContractList from '@/components/analytics/contracts/buyer-contracts-list'
import contractsLayout from '@/views/analytics/contract/contracts-layout'
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    clientId: Number,
    id: Number
  },
  computed: {
    ...mapGetters({
      buyerContract: 'getCurrentBuyerStatsContract',
      getBuyerClientContractsByParent: 'getBuyerClientContractsByParent'
    }),
    buyerContracts () {
      return this.getBuyerClientContractsByParent(this.id)
    }
  },
  components: {
    'contracts-layout': contractsLayout,
    'buyer-contract-list': buyerContractList
  },
  methods: {
    ...mapActions({
      fetchBuyerClientStats: 'fetchBuyerClientStats'
    })
  },
  created () {
    this.fetchBuyerClientStats(this.clientId)
  }
}
</script>
