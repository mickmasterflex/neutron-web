import { baseContractBreadcrumbs } from '@/mixins/breadcrumbs/relationships/base'

export const buyerContractBreadcrumbs = {
  mixins: [baseContractBreadcrumbs],
  data () {
    return {
      clientBreadcrumb: {
        name: 'ClientBuyerContracts',
        text: this.$route.params.client,
        params: { slug: this.$route.params.client }
      },
      ancestorBreadcrumbRouteName: 'BuyerContractContracts',
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
