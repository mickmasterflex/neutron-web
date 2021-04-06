import { buyerContractBreadcrumbs } from '@/mixins/breadcrumbs/analytics/ancestral/buyer'
import { mapGetters } from 'vuex'

export const offerContractBreadcrumbs = {
  mixins: [buyerContractBreadcrumbs],
  data () {
    return {
      offersBreadcrumb: {
        name: 'BuyerStatsContractOffers',
        text: 'Offers',
        params: {
          clientId: this.$route.params.clientId,
          id: this.$route.params.buyerId
        },
        query: this.$route.query
      },
      currentBreadcrumb: {
        name: 'BuyerStatsOfferContract',
        text: this.$route.params.id,
        params: {
          clientId: this.$route.params.clientId,
          buyerId: this.$route.params.buyerId,
          id: this.$route.params.id
        },
        query: this.$route.query
      }
    }
  },
  computed: {
    ...mapGetters({
      current: 'getCurrentOfferContractStats'
    })
  }
}
