<template>
  <client-layout :id="id"
                 :fetchClient="fetchBuyerClientStats"
                 contracts-route-name="BuyerStatsClientContracts"
                 leads-route-name="BuyerStatsClientLeads"
  ></client-layout>
</template>

<script>
import clientLayout from '@/views/analytics/layouts/client/layout'
import { mapActions } from 'vuex'
import { buyerClientBreadcrumbs } from '@/mixins/breadcrumbs/analytics/client/buyer'

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
  mixins: [buyerClientBreadcrumbs],
  components: {
    'client-layout': clientLayout
  }
}
</script>
