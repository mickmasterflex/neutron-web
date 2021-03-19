import { baseContractBreadcrumbs } from '@/mixins/breadcrumbs/analytics/ancestral/buyer-partner-base'
import { mapGetters } from 'vuex'

export const partnerContractBreadcrumbs = {
  mixins: [baseContractBreadcrumbs],
  data () {
    return {
      clientsBreadcrumb: {
        name: 'PartnerStatsClients',
        text: 'All Clients',
        query: this.$route.query
      },
      clientBreadcrumb: {
        name: 'PartnerStatsClientContracts',
        text: this.$route.params.clientId,
        params: { id: this.$route.params.clientId },
        query: this.$route.query
      },
      contractBreadcrumb: {
        name: 'PartnerStatsContract',
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
      ancestors: 'getPartnerContractStatsAncestors'
    })
  }
}
