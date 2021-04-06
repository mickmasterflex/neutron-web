import { baseContractBreadcrumbs } from '@/mixins/breadcrumbs/relationships/base'

export const campaignContractBreadcrumbs = {
  mixins: [baseContractBreadcrumbs],
  data () {
    return {
      ancestorBreadcrumbRouteName: 'PartnerContract',
      campaignsBreadcrumb: {
        name: 'PartnerContractCampaigns',
        text: 'Campaigns',
        params: {
          client: this.$route.params.client,
          id: this.$route.params.partner
        }
      },
      campaignBreadcrumb: {
        name: 'Campaign',
        text: this.$route.params.id,
        params: {
          client: this.$route.params.client,
          partner: this.$route.params.partner,
          id: this.$route.params.id
        }
      }
    }
  },
  computed: {
    ancestors () {
      return this.campaign.partner_ancestors
    }
  },
  methods: {
    setBreadcrumbText () {
      if (this.campaign.client) {
        this.clientBreadcrumb.text = this.campaign.client_data.name
      }
      if (this.campaign) {
        this.campaignBreadcrumb.text = this.campaign.name
      }
    }
  }
}
