import { baseContractBreadcrumbs } from '@/mixins/breadcrumbs/relationships/base'

export const partnerContractBreadcrumbs = {
  mixins: [baseContractBreadcrumbs],
  data () {
    return {
      clientBreadcrumb: {
        name: 'ClientPartnerContracts',
        text: this.$route.params.client,
        params: { slug: this.$route.params.client }
      },
      ancestorBreadcrumbRouteName: 'PartnerContractContracts',
      currentBreadcrumb: {
        name: this.ancestorBreadcrumbRouteName,
        text: this.$route.params.id,
        params: {
          client: this.$route.params.client,
          id: this.$route.params.id
        }
      }
    }
  }
}
