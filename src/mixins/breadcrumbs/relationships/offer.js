import { buyerContractBreadcrumbs } from '@/mixins/breadcrumbs/relationships/buyer'

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
    ancestors () {
      return this.offer.buyer_ancestors
    }
  },
  methods: {
    setBreadcrumbText () {
      if (this.offer.parent) {
        this.contractBreadcrumb.text = this.offer.parent_data.name
      }
      if (this.offer.client) {
        this.clientBreadcrumb.text = this.offer.client_data.name
      }
      if (this.offer) {
        this.offerBreadcrumb.text = this.offer.name
      }
    }
  }
}
