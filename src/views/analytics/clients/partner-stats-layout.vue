<template>
  <clients-layout hud-title="All Partner Clients"
                  :fetch-clients="fetchPartnerClientsStats"
                  :clients-route="{ name: 'PartnerStatsClients', query: $route.query }"
                  :leads-route="{ name: 'PartnerStatsClientsLeads', query: $route.query }"
                  :clients-count="clients.length"
  ></clients-layout>
</template>

<script>
import clientsLayout from '@/views/analytics/clients/layout'
import { mapActions, mapGetters } from 'vuex'
export default {
  methods: {
    ...mapActions({
      fetchPartnerClientsStats: 'fetchPartnerClientsStats'
    })
  },
  computed: {
    ...mapGetters({
      clients: 'getPartnerStatsClients'
    })
  },
  components: {
    'clients-layout': clientsLayout
  }
}
</script>
