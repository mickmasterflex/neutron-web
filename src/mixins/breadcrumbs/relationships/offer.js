import { baseContractBreadcrumbs } from '@/mixins/breadcrumbs/relationships/base'

export const offerContractBreadcrumbs = {
  mixins: [baseContractBreadcrumbs],
  data () {
    return {
      ancestorBreadcrumbRouteName: 'BuyerContractContracts',
      parentBreadcrumb: {
        name: 'BuyerContractOffers',
        text: 'Offers',
        params: {
          client: this.$route.params.client,
          id: this.$route.params.buyer
        }
      },
      currentBreadcrumb: {
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
  methods: {
    setBreadcrumbText () {
      if (this.offer.client) {
        this.clientBreadcrumb.text = this.offer.client_data.name
      }
      if (this.offer) {
        this.currentBreadcrumb.text = this.offer.name
      }
    }
  }
}
