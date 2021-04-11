import { baseContractBreadcrumbs } from '@/mixins/breadcrumbs/analytics/ancestral/base'
import { mapGetters } from 'vuex'

export const buyerContractBreadcrumbs = {
  mixins: [baseContractBreadcrumbs],
  data () {
    return {
      ancestorBreadcrumbRouteName: 'BuyerStatsContract',
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
      currentBreadcrumb: {
        name: this.ancestorBreadcrumbRouteName,
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
      current: 'getCurrentContractStats',
      client: 'getCurrentClientStats'
    })
  }
}
