<template>
  <content-layout v-if="campaign">
    <template v-slot:hud-content>
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
import { campaignContractBreadcrumbs } from '@/mixins/breadcrumbs/relationships/campaign'

export default {
  props: {
    id: {
      type: Number
    }
  },
  mixins: [campaignContractBreadcrumbs],
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
      resetCurrent: 'RESET_CURRENT_CAMPAIGN'
    }),
    async setCampaign () {
      if (this.campaign.id !== this.id) {
        await this.fetchCurrentCampaign(this.id)
      }
    },
    setCampaignWithTitleAndBreadcrumbs () {
      this.setCampaign().then(() => {
        document.title = this.campaign.name
        this.setBreadcrumbsWithAncestors()
      })
    }
  },
  created () {
    this.setCampaignWithTitleAndBreadcrumbs()
  },
  destroyed () {
    this.resetCurrent()
  }
}
</script>
