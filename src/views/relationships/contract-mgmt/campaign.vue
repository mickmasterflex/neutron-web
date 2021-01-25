<template>
  <content-layout v-if="campaign">
    <template v-slot:hud>
      <h1 class="h1 text-white">{{campaign.name}}</h1>
      <div class="hud--stat-cards">
        <stat-card :data="campaign.id" :title="`Campaign`" :color="`teal`"></stat-card>
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
      resetCurrent: 'RESET_CURRENT_CAMPAIGN'
    })
  },
  created () {
    if (this.id !== this.campaign.id) {
      this.fetchCurrentCampaign(this.id)
    }
  },
  destroyed () {
    this.resetCurrent()
  }
}
</script>