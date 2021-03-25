<template>
  <clients-list
    client-route-name="PartnerStatsClient"
    leads-route-name="PartnerStatsClientLeads"
  ></clients-list>
</template>

<script>
import clientsList from '@/components/analytics/clients/clients-list'

export default {
  components: {
    'clients-list': clientsList
  }
}
</script>
