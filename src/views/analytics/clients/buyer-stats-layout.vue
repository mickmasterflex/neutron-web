<template>
  <clients-layout hud-title="All Buyer Clients"
                  :fetch-clients="fetchBuyerClientsStats"
                  :clients-route="{ name: 'BuyerStatsClients', query: $route.query }"
                  :leads-route="{ name: 'BuyerStatsClientsLeads', query: $route.query }"
                  :clients-count="clients.length"
  ></clients-layout>
</template>

<script>
import clientsLayout from '@/views/analytics/clients/layout'
import { mapActions, mapGetters } from 'vuex'
export default {
  methods: {
    ...mapActions({
      fetchBuyerClientsStats: 'fetchBuyerClientsStats'
    })
  },
  computed: {
    ...mapGetters({
      clients: 'getBuyerStatsClients'
    })
  },
  components: {
    'clients-layout': clientsLayout
  }
}
</script>
