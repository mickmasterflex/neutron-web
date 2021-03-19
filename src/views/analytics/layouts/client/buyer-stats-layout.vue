<template>
  <client-layout :id="id"
                 :client="buyerClient"
                 :fetchClient="fetchBuyerClientStats"
                 :contracts-route="{ name: 'BuyerStatsClientContracts', query: $route.query }"
                 :leads-route="{ name: 'BuyerStatsClientLeads', query: $route.query }"
                 :contracts-count="contracts.length"
  ></client-layout>
</template>

<script>
import clientLayout from '@/views/analytics/layouts/client/layout'
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    id: {
      type: Number
    }
  },
  methods: {
    ...mapActions({
      fetchBuyerClientStats: 'fetchBuyerClientStats'
    })
  },
  computed: {
    ...mapGetters({
      buyerClient: 'getCurrentClientStats',
      contracts: 'getCurrentStatsContractsParentless'
    })
  },
  components: {
    'client-layout': clientLayout
  }
}
</script>
