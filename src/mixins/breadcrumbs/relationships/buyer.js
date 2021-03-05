import { partnerContractBreadcrumbs } from '@/mixins/breadcrumbs/relationships/partner'
import { mapGetters } from 'vuex'

export const buyerContractBreadcrumbs = {
  mixins: [partnerContractBreadcrumbs],
  data () {
    return {
      contractBreadcrumb: {
        name: 'BuyerContract',
        text: this.$route.params.id,
        params: {
          client: this.$route.params.client,
          id: this.$route.params.id
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      contract: 'getCurrentBuyer'
    })
  }
}
