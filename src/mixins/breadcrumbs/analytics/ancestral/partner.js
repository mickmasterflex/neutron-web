import { baseContractBreadcrumbs } from '@/mixins/breadcrumbs/analytics/ancestral/base'
import { mapGetters } from 'vuex'

export const partnerContractBreadcrumbs = {
  mixins: [baseContractBreadcrumbs],
  data () {
    return {
      ancestorBreadcrumbRouteName: 'PartnerStatsContract',
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
  },
  watch: {
    current () {
      this.currentBreadcrumb.text = this.current.name
    }
  }
}
