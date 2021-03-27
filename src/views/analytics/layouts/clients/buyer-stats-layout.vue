<template>
  <clients-layout hud-title="All Buyer Clients"
                  :fetch-clients="fetchBuyerClientsStats"
                  clients-route-name="BuyerStatsClients"
                  leads-route-name="BuyerStatsClientsLeads"
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
