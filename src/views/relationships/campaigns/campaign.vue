<template>
  <content-layout v-if="campaign">
    <template v-slot:hud>
      <h1 class="h1 text-white">{{campaign.name}}</h1>
      <div class="hud--stat-cards">
        <stat-card :data="campaign.id" :title="`Campaign`" :color="`teal`"></stat-card>
      </div>
    </template>
    <template v-slot:content>
      <update-campaign :campaign="campaign"></update-campaign>
      <delete-campaign :campaign="campaign" :client="$route.params.client" class="mt-4"></delete-campaign>
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
