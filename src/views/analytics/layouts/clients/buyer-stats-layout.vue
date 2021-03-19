<template>
  <clients-layout hud-title="All Buyer Clients"
                  :fetch-clients="fetchBuyerClientsStats"
                  :clients-route="{ name: 'BuyerStatsClients', query: $route.query }"
                  :leads-route="{ name: 'BuyerStatsClientsLeads', query: $route.query }"
  ></clients-layout>
</template>

<script>
import clientsLayout from '@/views/analytics/layouts/clients/layout'
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions({
      fetchBuyerClientsStats: 'fetchBuyerClientsStats'
    })
  },
  components: {
    'clients-layout': clientsLayout
  }
}
</script>
