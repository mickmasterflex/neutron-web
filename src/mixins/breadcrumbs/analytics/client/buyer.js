import { partnerClientBreadcrumbs } from '@/mixins/breadcrumbs/analytics/client/partner'
import { mapGetters } from 'vuex'

export const buyerClientBreadcrumbs = {
  mixins: [partnerClientBreadcrumbs],
  data () {
    return {
      clientsBreadcrumb: {
        name: 'BuyerStatsClients',
        text: 'All Clients',
        query: this.$route.query
      },
      clientContractsBreadcrumb: {
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
