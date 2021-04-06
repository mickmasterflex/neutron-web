import { setBreadcrumbsWithAncestors } from '@/mixins/breadcrumbs/set-breadcrumbs-with-ancestors'
import { mapGetters } from 'vuex'

export const baseContractBreadcrumbs = {
  mixins: [setBreadcrumbsWithAncestors],
  watch: {
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
