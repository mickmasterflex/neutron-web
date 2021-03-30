import { baseContractBreadcrumbs } from '@/mixins/breadcrumbs/analytics/ancestral/buyer-partner-base'
import { mapGetters } from 'vuex'

export const buyerContractBreadcrumbs = {
  mixins: [baseContractBreadcrumbs],
  data () {
    return {
      clientsBreadcrumb: {
        name: 'BuyerStatsClients',
        text: 'All Clients',
        query: this.$route.query
      },
      clientBreadcrumb: {
        name: 'BuyerStatsClientContracts',
        text: this.$route.params.clientId,
        params: { id: this.$route.params.clientId },
        query: this.$route.query
      },
      contractBreadcrumb: {
        name: 'BuyerStatsContract',
        text: this.$route.params.id,
        params: {
          clientId: this.$route.params.clientId,
          id: this.$route.params.id
        },
        query: this.$route.query
      }
    }
  },
  computed: {
    ...mapGetters({
      contract: 'getCurrentContractStats',
      client: 'getCurrentClientStats',
      ancestors: 'getBuyerContractStatsAncestors'
    })
  }
}
