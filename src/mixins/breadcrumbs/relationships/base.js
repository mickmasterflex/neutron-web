import { setBreadcrumbsWithAncestors } from '@/mixins/breadcrumbs/set-breadcrumbs-with-ancestors'
import { mapGetters } from 'vuex'

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
    ...mapGetters({
      ancestors: 'getCurrentAncestors'
    })
  },
  methods: {
    setBreadcrumbText () {
      if (this.contract) {
        this.contractBreadcrumb.text = this.contract.name
      }
      if (this.contract.client) {
        this.clientBreadcrumb.text = this.contract.client_data.name
      }
    }
  }
}
