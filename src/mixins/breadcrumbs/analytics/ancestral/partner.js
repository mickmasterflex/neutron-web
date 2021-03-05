import { mapGetters } from 'vuex'
import { setBreadcrumbsWithAncestors } from '@/mixins/breadcrumbs/set-breadcrumbs-with-ancestors'

export const partnerContractBreadcrumbs = {
  mixins: [setBreadcrumbsWithAncestors],
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
      loading: 'getAnalyticsFetchLoading',
      contract: 'getCurrentPartnerStatsContract',
      client: 'getCurrentPartnerStatsClient',
      ancestors: 'getPartnerContractStatsAncestors'
    })
  },
  watch: {
    contract () {
      this.$data.contractBreadcrumb.text = this.contract.name
    },
    client () {
      this.$data.clientBreadcrumb.text = this.client.name
    },
    loading () {
      this.setBreadcrumbsWithAncestors()
    }
  },
  created () {
    this.setBreadcrumbs([
      this.$data.clientsBreadcrumb,
      this.$data.clientBreadcrumb,
      this.$data.contractBreadcrumb
    ])
  }
}
