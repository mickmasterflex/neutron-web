<template>
  <clients-list
    client-route-name="BuyerStatsClient"
    leads-route-name="BuyerStatsClientLeads"
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
