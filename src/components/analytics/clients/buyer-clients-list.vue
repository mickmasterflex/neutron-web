<template>
  <clients-list
    :clients="clients"
    :link-to-client="linkToBuyerStatsClient"
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
      setCurrent: 'SET_CURRENT_CLIENT_STATS',
      resetLeads: 'RESET_ANALYTICS_LEADS'
    }),
    linkToBuyerStatsClient (client) {
      this.setCurrent(client)
      this.$router.push({
        name: 'BuyerStatsClient',
        params: { id: client.id },
        query: this.$route.query
      })
    },
    linkToClientLeads (client) {
      this.resetLeads()
      this.setCurrent(client)
      this.$router.push({
        name: 'BuyerStatsClientLeads',
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
