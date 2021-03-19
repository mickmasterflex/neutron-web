<template>
  <clients-list
    :link-to-client="linkToPartnerStatsClient"
    :link-to-client-leads="linkToClientLeads"
  ></clients-list>
</template>

<script>
import { mapMutations } from 'vuex'
import clientsList from '@/components/analytics/clients/clients-list'

export default {
  methods: {
    ...mapMutations({
      setCurrent: 'SET_CURRENT_CLIENT_STATS',
      resetLeads: 'RESET_ANALYTICS_LEADS'
    }),
    linkToPartnerStatsClient (client) {
      this.setCurrent(client)
      this.$router.push({
        name: 'PartnerStatsClient',
        params: { id: client.id },
        query: this.$route.query
      })
    },
    linkToClientLeads (client) {
      this.resetLeads()
      this.setCurrent(client)
      this.$router.push({
        name: 'PartnerStatsClientLeads',
        params: { id: client.id },
        query: this.$route.query
      })
    }
  },
  components: {
    'clients-list': clientsList
  }
}
</script>
