<template>
  <content-layout v-if="campaign">
    <template v-slot:hud>
      <h1 class="h1 text-white">{{campaign.name}}</h1>
      <hud-stat-cards>
        <stat-card :data="campaign.id" title="Campaign" key="campaignId"></stat-card>
      </hud-stat-cards>
    </template>
    <template v-slot:content>
      <base-panel-grid>
        <update-campaign :campaign="campaign" class="col-span-2 xl:col-span-1"></update-campaign>
        <panel-template title="Danger Zone" class="col-span-2" :showLoader="loading" :loadingText="loadingText">
          <template #content>
            <delete-campaign :campaign="campaign" :client="$route.params.client"></delete-campaign>
          </template>
        </panel-template>
      </base-panel-grid>
    </template>
  </content-layout>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import deleteCampaign from '@/components/campaigns/delete'
import updateCampaign from '@/components/campaigns/update'

export default {
  props: {
    id: {
      type: Number
    }
  },
  components: {
    'delete-campaign': deleteCampaign,
    'update-campaign': updateCampaign
  },
  computed: {
    ...mapGetters({
      campaign: 'getCurrentCampaign',
      loading: 'getCampaignFetchLoading',
      loadingText: 'getCampaignFetchLoadingText'
    })
  },
  methods: {
    ...mapActions({
      fetchCurrentCampaign: 'fetchCurrentCampaign',
      fetchCampaignByPartner: 'fetchCampaignByPartner'
    }),
    ...mapMutations({
      resetCurrent: 'RESET_CURRENT_CAMPAIGN',
      setBreadcrumbs: 'SET_CURRENT_BREADCRUMBS'
    }),
    async setCampaign () {
      if (this.campaign.id !== this.id) {
        await this.fetchCurrentCampaign(this.id)
      }
    },
    setCampaignBreadcrumbsAndTitle () {
      document.title = this.campaign.name
      const breadcrumbs = [
        { name: 'Clients', text: 'Clients' },
        { name: 'Client', text: this.campaign.client.name, params: { slug: this.$route.params.client } }
        // { name: 'ClientContracts', text: 'Contracts', params: { slug: this.$route.params.client } }
      ]
      this.campaign.partner_ancestors.forEach(ancestor => {
        const additionalCrumbs = [
          { name: 'PartnerContract', text: ancestor.name, params: { client: this.$route.params.client, id: ancestor.id } }
          // { name: 'PartnerContractChildren', text: 'Contracts', params: { client: this.$route.params.client, id: ancestor.id } }
        ]
        breadcrumbs.push(...additionalCrumbs)
      })
      const campaignBreadcrumbs = [
        { name: 'PartnerContract', text: this.campaign.contract.name, params: { client: this.$route.params.client, id: this.$route.params.partner } },
        { name: 'PartnerContractCampaigns', text: 'Campaigns', params: { client: this.$route.params.client, id: this.$route.params.partner } },
        { name: 'Campaign', text: this.campaign.name, params: { client: this.$route.params.client, partner: this.$route.params.partner, id: this.id } }
      ]
      breadcrumbs.push(...campaignBreadcrumbs)
      this.setBreadcrumbs(breadcrumbs)
    }
  },
  created () {
    this.setCampaign().then(() => {
      this.setCampaignBreadcrumbsAndTitle()
    })
  },
  destroyed () {
    this.resetCurrent()
  }
}
</script>
