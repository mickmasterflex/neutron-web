import { mapGetters, mapMutations } from 'vuex'

export const partnerContractBreadcrumbs = {
  data () {
    return {
      clientsBreadcrumb: {
        name: 'PartnerStatsClients',
        text: 'All Clients',
        query: this.$route.query
      },
      clientContractsBreadcrumb: {
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
      this.$data.clientContractsBreadcrumb.text = this.client.name
    },
    loading () {
      this.setBreadcrumbsWithAncestors()
    }
  },
  methods: {
    setBreadcrumbsWithAncestors () {
      const breadcrumbs = [
        this.$data.clientsBreadcrumb,
        this.$data.clientContractsBreadcrumb
      ]
      this.ancestors.forEach(ancestor => {
        breadcrumbs.push({
          name: this.$data.contractBreadcrumb.name,
          text: ancestor.name,
          params: {
            clientId: this.$route.params.clientId,
            id: ancestor.id
          },
          query: this.$route.query
        })
      })
      breadcrumbs.push(this.$data.contractBreadcrumb)
      if (this.$data.offersBreadcrumb) {
        breadcrumbs.push(this.$data.offersBreadcrumb)
      }
      if (this.$data.offerBreadcrumb) {
        breadcrumbs.push(this.$data.offerBreadcrumb)
      }
      if (this.$data.campaignsBreadcrumb) {
        breadcrumbs.push(this.$data.campaignsBreadcrumb)
      }
      if (this.$data.campaignBreadcrumb) {
        breadcrumbs.push(this.$data.campaignBreadcrumb)
      }
      this.setBreadcrumbs(breadcrumbs)
    },
    ...mapMutations({
      setBreadcrumbs: 'SET_CURRENT_BREADCRUMBS'
    })
  },
  created () {
    this.setBreadcrumbs([
      this.$data.clientsBreadcrumb,
      this.$data.clientContractsBreadcrumb,
      this.$data.contractBreadcrumb
    ])
  }
}
