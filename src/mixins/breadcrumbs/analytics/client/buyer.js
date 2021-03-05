import { baseContractBreadcrumbs } from '@/mixins/breadcrumbs/analytics/client/buyer-partner-base'
import { mapGetters } from 'vuex'

export const buyerClientBreadcrumbs = {
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
        text: this.$route.params.id,
        params: { id: this.$route.params.id },
        query: this.$route.query
      }
    }
  },
  computed: {
    ...mapGetters({
      client: 'getCurrentBuyerStatsClient'
    })
  }
}
