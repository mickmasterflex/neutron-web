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
  computed: {
    ancestors () {
      return this.contract.ancestors
    }
  },
  methods: {
    setBreadcrumbText () {
      if (this.contract) {
        this.$data.contractBreadcrumb.text = this.contract.name
      }
      if (this.contract.client) {
        this.$data.clientBreadcrumb.text = this.contract.client.name
      }
    }
  }
}
