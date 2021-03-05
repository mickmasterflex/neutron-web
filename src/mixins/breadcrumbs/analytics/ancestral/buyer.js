import { partnerContractBreadcrumbs } from '@/mixins/breadcrumbs/analytics/ancestral/partner'
import { mapGetters } from 'vuex'

export const buyerContractBreadcrumbs = {
  mixins: [partnerContractBreadcrumbs],
  data () {
    return {
      clientsBreadcrumb: {
        name: 'BuyerStatsClients',
        text: 'All Clients',
        query: this.$route.query
      },
      clientContractsBreadcrumb: {
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
      contract: 'getCurrentBuyerStatsContract',
      client: 'getCurrentBuyerStatsClient',
      ancestors: 'getBuyerContractStatsAncestors'
    })
  }
}
