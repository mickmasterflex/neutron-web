import { baseContractBreadcrumbs } from '@/mixins/breadcrumbs/relationships/base'

export const partnerContractBreadcrumbs = {
  mixins: [baseContractBreadcrumbs],
  data () {
    return {
      ancestorBreadcrumbRouteName: 'PartnerContract',
      contractBreadcrumb: {
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
