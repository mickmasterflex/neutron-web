<template>
  <client-layout :id="id"
                 :client="partnerClient"
                 :fetchClient="fetchPartnerClientStats"
                 contracts-route-name="PartnerStatsClientContracts"
                 leads-route-name="PartnerStatsClientLeads"
                 :contracts-count="contracts.length"
  ></client-layout>
</template>

<script>
import clientLayout from '@/views/analytics/layouts/client/layout'
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
      partnerClient: 'getCurrentClientStats',
      contracts: 'getCurrentStatsContractsParentless'
    })
  },
  components: {
    'client-layout': clientLayout
  }
}
</script>
