import { buyerContractBreadcrumbs } from '@/mixins/breadcrumbs/analytics-contract/buyer-breadcrumbs'
import { mapGetters } from 'vuex'

export const offerContractBreadcrumbs = {
  mixins: [buyerContractBreadcrumbs],
  data () {
    return {
      contractBreadcrumb: {
        name: 'BuyerStatsContract',
        text: this.$route.params.buyerId,
        params: {
          clientId: this.$route.params.clientId,
          id: this.$route.params.buyerId
        },
        query: this.$route.query
      },
      offersBreadcrumb: {
        name: 'BuyerStatsContractOffers',
        text: 'Offers',
        params: {
          clientId: this.$route.params.clientId,
          id: this.$route.params.buyerId
        },
        query: this.$route.query
      },
      offerBreadcrumb: {
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
      ancestors: 'getOfferContractStatsAncestors',
      offer: 'getCurrentBuyerStatsOffer'
    })
  },
  watch: {
    offer () {
      this.$data.offerBreadcrumb.text = this.offer.name
    }
  }
}
