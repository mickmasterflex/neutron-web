<template>
  <client-layout :id="id"
                 :client="partnerClient"
                 :fetchClient="fetchPartnerClientStats"
                 :contracts-route="{ name: 'PartnerStatsClientContracts', query: $route.query }"
                 :leads-route="{ name: 'PartnerStatsClientLeads', query: $route.query }"
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
      fetchPartnerClientStats: 'fetchPartnerClientStats'
    })
  },
  computed: {
    ...mapGetters({
      partnerClient: 'getCurrentPartnerStatsClient'
    })
  },
  components: {
    'client-layout': clientLayout
  }
}
</script>
