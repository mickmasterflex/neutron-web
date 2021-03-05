import { mapGetters } from 'vuex'
import { baseContractBreadcrumbs } from '@/mixins/breadcrumbs/relationships/buyer-partner-base'

export const partnerContractBreadcrumbs = {
  mixins: [baseContractBreadcrumbs],
  data () {
    return {
      contractBreadcrumb: {
        name: 'PartnerContract',
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
      contract: 'getCurrentPartner'
    })
  }
}
