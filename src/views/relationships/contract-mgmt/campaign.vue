<template>
  <content-layout v-if="campaign">
    <template v-slot:hud>
      <h1 class="h1 text-white">{{campaign.name}}</h1>
      <div class="hud--stat-cards">
        <stat-card :data="campaign.id" :title="`Campaign`"></stat-card>
      </div>
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
      this.setBreadcrumbs([
        { name: 'Clients', text: 'Clients' },
        { name: 'Client', text: this.$route.params.client, params: { slug: this.$route.params.client } },
        { name: 'ClientContracts', text: 'Contracts', params: { slug: this.$route.params.client } },
        { name: 'PartnerContract', text: this.$route.params.partner, params: { client: this.$route.params.client, id: this.$route.params.partner } },
        { name: 'PartnerContractCampaigns', text: 'Campaigns', params: { client: this.$route.params.client, id: this.$route.params.partner } },
        { name: 'Campaign', text: this.campaign.name, params: { client: this.$route.params.client, partner: this.$route.params.partner, id: this.id } }
      ])
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
