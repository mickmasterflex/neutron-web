import { setBreadcrumbsWithAncestors } from '@/mixins/breadcrumbs/set-breadcrumbs-with-ancestors'
import { mapGetters } from 'vuex'

export const baseContractBreadcrumbs = {
  mixins: [setBreadcrumbsWithAncestors],
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
  },
  computed: {
    ...mapGetters({
      loading: 'getAnalyticsFetchLoading'
    })
  }
}
