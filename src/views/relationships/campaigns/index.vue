<template>
  <div>
    <div class="bg-gray-900 rounded-lg w-full p-8 grid grid-cols-1 lg:grid-cols-2 items-center">
      <h1 class="h1 text-white">All Campaigns</h1>
      <div>
        <stat-card :data="campaignCount" :title="`Campaigns`" :color="`teal`"></stat-card>
      </div>
    </div>
    <campaign-list :offers="campaigns"></campaign-list>
    <h3 class="h3 mt-5 mb-2">Create Campaign</h3>
    <create-campaign :campaigns="campaigns"></create-campaign>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import campaignList from '@/components/campaigns/list'
import createCampaign from '@/components/campaigns/create'

export default {
  props: {
    partner: Number
  },
  components: {
    'campaign-list': campaignList,
    'create-campaign': createCampaign
  },
  computed: {
    ...mapGetters({
      getCampaignsByPartner: 'getCampaignsByPartner'
    }),
    campaigns: function () {
      return this.getCampaignsByPartner(this.partner)
    },
    campaignCount: function () {
      return this.campaigns.length
    }

  },
  methods: {
    ...mapActions({ fetchCampaigns: 'fetchCampaigns' })
  },
  created () {
    this.fetchCampaigns()
  }
}
</script>
