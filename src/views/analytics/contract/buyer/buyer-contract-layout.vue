<template>
  <contract-layout :contract="contract"
                   :clientId="clientId"
                   :id="id"
                   :leadsRoute="{
                     name: 'BuyerStatsContractLeads',
                     params: { clientId: clientId, id: id },
                     query: $route.query
                     }"
                   :fetchContractStats="fetchBuyerContractStats"
  >
    <template v-slot:statCards>
      <stat-card :data="offers.length" title="Offers" key="offerCountStatCard" ></stat-card>
    </template>
    <template v-slot:contentTab>
      <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'contracts' ? 'active' : ''">
        <router-link :to="{
          name: 'BuyerStatsContractContracts',
          params: { clientId: clientId, id: id },
          query: $route.query
        }">Contracts</router-link>
      </li>
      <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'offers' ? 'active' : ''">
        <router-link :to="{
          name: 'BuyerStatsContractOffers',
          params: { clientId: clientId, id: id },
          query: $route.query
        }">Offers</router-link>
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
      contract: 'getCurrentBuyerStatsContract',
      offers: 'getBuyerContractStatsOffers'
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
