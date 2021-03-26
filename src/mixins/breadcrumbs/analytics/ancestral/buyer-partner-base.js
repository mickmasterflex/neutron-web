import { setBreadcrumbsWithAncestors } from '@/mixins/breadcrumbs/set-breadcrumbs-with-ancestors'
import { mapGetters } from 'vuex'

export const baseContractBreadcrumbs = {
  mixins: [setBreadcrumbsWithAncestors],
  watch: {
    contract () {
      this.contractBreadcrumb.text = this.contract.name
    },
    client () {
      this.clientBreadcrumb.text = this.client.name
    },
    loading () {
      if (this.loading === false) {
        this.setBreadcrumbsWithAncestors()
      }
    }
  },
  computed: {
    ...mapGetters({
      loading: 'getAnalyticsFetchLoading'
    })
  }
}
