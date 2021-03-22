<template>
  <client-layout :id="id"
                 :client="buyerClient"
                 :fetchClient="fetchBuyerClientStats"
                 contracts-route-name="BuyerStatsClientContracts"
                 leads-route-name="BuyerStatsClientLeads"
                 :contracts-count="contracts.length"
  ></client-layout>
</template>

<script>
import clientLayout from '@/views/analytics/layouts/client/layout'
import { mapActions, mapGetters } from 'vuex'
import { buyerClientBreadcrumbs } from '@/mixins/breadcrumbs/analytics/client/buyer'

export default {
  props: {
    id: {
      type: Number
    }
  },
  computed: {
    ...mapGetters({
      buyerClient: 'getCurrentClientStats',
      contracts: 'getCurrentStatsContractsParentless'
    })
  },
  methods: {
    ...mapActions({
      fetchBuyerClientStats: 'fetchBuyerClientStats'
    })
  },
  mixins: [buyerClientBreadcrumbs],
  components: {
    'client-layout': clientLayout
  }
}
</script>
