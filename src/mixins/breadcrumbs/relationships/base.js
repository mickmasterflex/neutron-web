import { setBreadcrumbsWithAncestors } from '@/mixins/breadcrumbs/set-breadcrumbs-with-ancestors'

export const baseContractBreadcrumbs = {
  mixins: [setBreadcrumbsWithAncestors],
  data () {
    return {
      clientsBreadcrumb: {
        name: 'Clients',
        text: 'Clients'
      },
      clientBreadcrumb: {
        name: 'Client',
        text: this.$route.params.client,
        params: { slug: this.$route.params.client }
      }
    }
  },
  methods: {
    setBreadcrumbText () {
      if (this.contract) {
        this.currentBreadcrumb.text = this.contract.name
      }
      if (this.contract.client) {
        this.clientBreadcrumb.text = this.contract.client_data.name
      }
    }
  }
}
