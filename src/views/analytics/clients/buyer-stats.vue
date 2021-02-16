<template>
  <clients-index hud-title="All Buyer Clients"
                 :fetch-data="fetchBuyerClientsStats"
                 :clients-route="{ name: 'BuyerStatsClients', query: $route.query }"
                 :leads-route="{ name: 'BuyerStatsClientsLeads', query: $route.query }"
  >
  </clients-index>
</template>

<script>
import clientsIndex from '@/views/analytics/clients/layout'
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      fetchBuyerClientsStats: 'fetchBuyerClientsStats'
    })
  },
  components: {
    'clients-index': clientsIndex
  }
}
</script>
