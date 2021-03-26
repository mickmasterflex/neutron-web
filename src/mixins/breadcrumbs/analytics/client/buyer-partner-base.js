import { mapGetters, mapMutations } from 'vuex'

export const baseContractBreadcrumbs = {
  computed: {
    breadcrumbs () {
      return [
        this.clientsBreadcrumb,
        this.clientBreadcrumb
      ]
    },
    ...mapGetters({
      loading: 'getAnalyticsFetchLoading'
    })
  },
  watch: {
    client () {
      this.clientBreadcrumb.text = this.client.name
    },
    loading () {
      if (this.loading === false) {
        this.setBreadcrumbs(this.breadcrumbs)
      }
    }
  },
  methods: {
    ...mapMutations({
      setBreadcrumbs: 'SET_CURRENT_BREADCRUMBS'
    })
  }
}
