<template>
  <client-layout :id="id"
                 :fetchClient="fetchPartnerClientStats"
                 contracts-route-name="PartnerStatsClientContracts"
                 leads-route-name="PartnerStatsClientLeads"
  ></client-layout>
</template>

<script>
import clientLayout from '@/views/analytics/layouts/client/layout'
import { mapActions } from 'vuex'
import { partnerClientBreadcrumbs } from '@/mixins/breadcrumbs/analytics/client/partner'

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
  mixins: [partnerClientBreadcrumbs],
  components: {
    'client-layout': clientLayout
  }
}
</script>
