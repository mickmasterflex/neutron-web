<template>
  <div>
    <div class="flex flex-row justify-between">
      <h3 class="h3">Campaigns List</h3>
      <button class="btn btn-green" @click="showCreateCampaignModal()">Create Campaign</button>
    </div>
    <campaign-list :campaigns="campaigns"></campaign-list>
    <create-campaign :partner="partner.id"></create-campaign>
  </div>
</template>

<script>
import createCampaign from '@/components/campaigns/create'
import campaignList from '@/components/campaigns/list'
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      partner: 'getCurrentPartner',
      getCampaignsByPartner: 'getCampaignsByPartner'
    }),
    campaigns: function () {
      return this.getCampaignsByPartner(this.partner.id)
    }
  },
  methods: {
    ...mapMutations({
      showCreateCampaignModal: 'SHOW_CREATE_CAMPAIGN_MODAL'
    })
  },
  components: {
    'create-campaign': createCampaign,
    'campaign-list': campaignList
  }
}
</script>
