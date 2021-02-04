<template>
  <client-layout :id="id"
                 :client="buyerClient"
                 :fetchClient="fetchBuyerClientStats"
                 :contracts-route="{ name: 'BuyerStatsClientContracts' }"
                 :leads-route="{ name: 'BuyerStatsClientLeads'}"
  ></client-layout>
</template>

<script>
import clientLayout from '@/views/analytics/client/layout'
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
      buyerClient: 'getCurrentBuyerStatsClient'
    })
  },
  components: {
    'client-layout': clientLayout
  }
}
</script>
