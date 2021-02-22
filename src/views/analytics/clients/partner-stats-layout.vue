<template>
  <clients-layout hud-title="All Partner Clients"
                  :fetch-clients="fetchPartnerClientsStats"
                  :clients-route="{ name: 'PartnerStatsClients', query: $route.query }"
                  :leads-route="{ name: 'PartnerStatsClientsLeads', query: $route.query }"
  ></clients-layout>
</template>

<script>
import clientsLayout from '@/views/analytics/clients/layout'
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions({
      fetchPartnerClientsStats: 'fetchPartnerClientsStats'
    })
  },
  components: {
    'clients-layout': clientsLayout
  }
}
</script>
