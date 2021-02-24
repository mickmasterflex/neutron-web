<template>
  <clients-list
    :clients="clients"
    :link-to-client="linkToPartnerStatsClient"
    :link-to-client-leads="linkToClientLeads"
  ></clients-list>
</template>

<script>
import { mapMutations } from 'vuex'
import clientsList from '@/components/analytics/clients/clients-list'

export default {
  props: {
    clients: {
      type: [Object, Array],
      required: true
    }
  },
  methods: {
    ...mapMutations({
      setCurrent: 'SET_CURRENT_PARTNER_STATS_CLIENT'
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
