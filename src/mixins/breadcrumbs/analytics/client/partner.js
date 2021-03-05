import { mapGetters, mapMutations } from 'vuex'

export const partnerClientBreadcrumbs = {
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
    breadcrumbs () {
      return [
        this.$data.clientsBreadcrumb,
        this.$data.clientBreadcrumb
      ]
    },
    ...mapGetters({
      loading: 'getAnalyticsFetchLoading',
      client: 'getCurrentPartnerStatsClient'
    })
  },
  watch: {
    client () {
      this.$data.clientBreadcrumb.text = this.client.name
    },
    loading () {
      this.setBreadcrumbs(this.breadcrumbs)
    }
  },
  created () {
    this.setBreadcrumbs(this.breadcrumbs)
  },
  methods: {
    ...mapMutations({
      setBreadcrumbs: 'SET_CURRENT_BREADCRUMBS'
    })
  }
}
