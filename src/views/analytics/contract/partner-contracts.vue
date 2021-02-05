<template>
  <contracts-layout :contract="partnerContract">
    <template v-slot:content>
      <partner-contract-list :contracts="partnerContracts"></partner-contract-list>
    </template>
  </contracts-layout>
</template>

<script>
import partnerContractList from '@/components/analytics/contracts/partner-contracts-list'
import contractsLayout from '@/views/analytics/contract/contracts-layout'
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    clientId: Number,
    id: Number
  },
  computed: {
    ...mapGetters({
      partnerContract: 'getCurrentPartnerStatsContract',
      getPartnerClientContractsByParent: 'getPartnerClientContractsByParent'
    }),
    partnerContracts () {
      return this.getPartnerClientContractsByParent(this.id)
    }
  },
  components: {
    'contracts-layout': contractsLayout,
    'partner-contract-list': partnerContractList
  },
  methods: {
    ...mapActions({
      fetchPartnerClientStats: 'fetchPartnerClientStats'
    })
  },
  created () {
    this.fetchPartnerClientStats(this.clientId)
  }
}
</script>
