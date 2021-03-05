import { buyerContractBreadcrumbs } from '@/mixins/breadcrumbs/relationships/buyer'
import { mapGetters } from 'vuex'

export const offerContractBreadcrumbs = {
  mixins: [buyerContractBreadcrumbs],
  data () {
    return {
      contractBreadcrumb: {
        name: 'BuyerContract',
        text: this.$route.params.buyer,
        params: {
          client: this.$route.params.client,
          id: this.$route.params.buyer
        }
      },
      offersBreadcrumb: {
        name: 'BuyerContractOffers',
        text: 'Offers',
        params: {
          client: this.$route.params.client,
          id: this.$route.params.buyer
        }
      },
      offerBreadcrumb: {
        name: 'OfferDetails',
        text: this.$route.params.id,
        params: {
          client: this.$route.params.client,
          buyer: this.$route.params.buyer,
          id: this.$route.params.id
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      offer: 'getCurrentOffer'
    }),
    ancestors () {
      return this.offer.buyer_ancestors
    }
  },
  methods: {
    setBreadcrumbText () {
      if (this.offer.parent) {
        this.$data.contractBreadcrumb.text = this.offer.parent.name
      }
      if (this.offer.client) {
        this.$data.clientBreadcrumb.text = this.offer.client.name
      }
      if (this.offer) {
        this.$data.offerBreadcrumb.text = this.offer.name
      }
    }
  }
}
