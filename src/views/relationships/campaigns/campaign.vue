<template>
  <content-layout v-if="campaign">
    <template v-slot:hud>
      <div class="hud">
        <h1 class="h1 text-white">{{campaign.name}}</h1>
        <div class="hud--stat-cards">
          <stat-card :data="campaign.id" :title="`Campaign`" :color="`teal`"></stat-card>
        </div>
      </div>
    </template>
    <template v-slot:content>
      <h3 class="h3 mb-2">Update Campaign</h3>
      <update-campaign :campaign="campaign"></update-campaign>
      <h3 class="h3 mt-5 mb-2">Delete Campaign</h3>
      <delete-campaign :campaign="campaign" :client="$route.params.client"></delete-campaign>
    </template>
  </content-layout>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
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
      campaign: 'getCurrentCampaign'
    })
  },
  methods: {
    ...mapActions({
      fetchCurrentCampaign: 'fetchCurrentCampaign',
      fetchCampaignByPartner: 'fetchCampaignByPartner',
      fetchPartners: 'fetchPartners'
    })
  },
  created () {
    this.fetchCurrentCampaign(this.id)
  }
}
</script>
