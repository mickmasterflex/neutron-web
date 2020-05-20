<template>
  <div v-if="campaign">
    <div class="bg-gray-900 rounded-lg w-full p-8 grid grid-cols-1 lg:grid-cols-2 items-center">
      <h1 class="h1 text-white">{{campaign.name}}</h1>
      <div>
        <stat-card :data="campaign.id" :title="`Campaign`" :color="`teal`"></stat-card>
      </div>
    </div>
    <h3 class="h3 mt-5 mb-2">Delete Campaign</h3>
    <delete-campaign :campaign="campaign" ></delete-campaign>

    <h3 class="h3 mt-5 mb-2">Update Campaign</h3>
    <update-campaign :campaign="campaign" :id="id"></update-campaign>
  </div>
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
