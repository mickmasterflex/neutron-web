import { mapGetters, mapMutations } from 'vuex'

export const baseContractBreadcrumbs = {
  computed: {
    breadcrumbs () {
      return [
        this.$data.clientsBreadcrumb,
        this.$data.clientBreadcrumb
      ]
    },
    ...mapGetters({
      loading: 'getAnalyticsFetchLoading'
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
