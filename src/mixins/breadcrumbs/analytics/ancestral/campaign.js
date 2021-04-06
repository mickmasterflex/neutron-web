import { partnerContractBreadcrumbs } from '@/mixins/breadcrumbs/analytics/ancestral/partner'
import { mapGetters } from 'vuex'

export const campaignContractBreadcrumbs = {
  mixins: [partnerContractBreadcrumbs],
  data () {
    return {
      campaignsBreadcrumb: {
        name: 'PartnerStatsContractCampaigns',
        text: 'Campaigns',
        params: {
          clientId: this.$route.params.clientId,
          id: this.$route.params.partnerId
        },
        query: this.$route.query
      },
      currentBreadcrumb: {
        name: 'PartnerStatsCampaign',
        text: this.$route.params.id,
        params: {
          clientId: this.$route.params.clientId,
          partnerId: this.$route.params.partnerId,
          id: this.$route.params.id
        },
        query: this.$route.query
      }
    }
  },
  computed: {
    ...mapGetters({
      current: 'getCurrentCampaignStats'
    })
  }
}
