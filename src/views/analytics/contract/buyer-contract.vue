<template>
  <contract-layout :contract="contract"
                   :clientId="clientId"
                   :id="id"
                   :contractsRoute="{ name: 'BuyerStatsContractContracts', params: { clientId: clientId, id: id }}"
                   :leadsRoute="{ name: 'BuyerStatsContractLeads', params: { clientId: clientId, id: id }}"
                   :fetchContractStats="fetchBuyerContractStats"
  >
    <template v-slot:contentTab>
      <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'offers' ? 'active' : ''">
        <router-link :to="{ name: 'BuyerStatsContractOffers', params: { clientId: clientId, id: id }}">Offers</router-link>
      </li>
    </template>
  </contract-layout>
</template>

<script>
import contractLayout from '@/views/analytics/contract/layout'
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    clientId: Number,
    id: Number
  },
  computed: {
    ...mapGetters({
      contract: 'getCurrentBuyerStatsContract'
    })
  },
  methods: {
    ...mapActions({
      fetchBuyerContractStats: 'fetchBuyerContractStats'
    })
  },
  components: {
    'contract-layout': contractLayout
  }
}
</script>
