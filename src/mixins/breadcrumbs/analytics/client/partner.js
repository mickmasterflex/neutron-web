import { baseContractBreadcrumbs } from '@/mixins/breadcrumbs/analytics/client/buyer-partner-base'
import { mapGetters } from 'vuex'

export const partnerClientBreadcrumbs = {
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
        text: this.$route.params.id,
        params: { id: this.$route.params.id },
        query: this.$route.query
      }
    }
  },
  computed: {
    ...mapGetters({
      client: 'getCurrentPartnerStatsClient'
    })
  }
}
