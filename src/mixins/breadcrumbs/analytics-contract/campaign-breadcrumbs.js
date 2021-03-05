import { partnerContractBreadcrumbs } from '@/mixins/breadcrumbs/analytics-contract/partner-breadcrumbs'
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
          id: this.$route.params.buyerId
        },
        query: this.$route.query
      },
      campaignBreadcrumb: {
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
      ancestors: 'getCampaignStatsAncestors',
      campaign: 'getCurrentPartnerStatsCampaign'
    })
  },
  watch: {
    campaign () {
      this.$data.campaignBreadcrumb.text = this.campaign.name
    }
  }
}
