<template>
  <client-layout :id="id"
                 :client="partnerClient"
                 :fetchClient="fetchPartnerClientStats"
                 :contracts-route="{ name: 'PartnerStatsClientContracts' }"
                 :leads-route="{ name: 'PartnerStatsClientLeads'}"
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
