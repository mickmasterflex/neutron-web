import { partnerContractBreadcrumbs } from '@/mixins/breadcrumbs/relationships/partner'

export const campaignContractBreadcrumbs = {
  mixins: [partnerContractBreadcrumbs],
  data () {
    return {
      contractBreadcrumb: {
        name: 'PartnerContract',
        text: this.$route.params.partner,
        params: {
          client: this.$route.params.client,
          id: this.$route.params.partner
        }
      },
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
      if (this.campaign.contract) {
        this.contractBreadcrumb.text = this.campaign.contract_data.name
      }
      if (this.campaign.client) {
        this.clientBreadcrumb.text = this.campaign.client_data.name
      }
      if (this.campaign) {
        this.campaignBreadcrumb.text = this.campaign.name
      }
    }
  }
}
