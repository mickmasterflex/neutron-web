<template>
  <partner-layout :id="id" contentTab="campaigns">
    <template v-slot:content>
      <div class="flex flex-row justify-between">
        <h3 class="h3">Campaigns List</h3>
        <button class="btn btn-green" @click="showCreateCampaignModal()">Create Campaign</button>
      </div>
      <campaign-list :campaigns="campaigns"></campaign-list>
      <create-campaign :partner="partner.id"></create-campaign>
    </template>
  </partner-layout>
</template>

<script>
import partnerLayout from '@/views/relationships/partners/partner/layout'
import createCampaign from '@/components/campaigns/create'
import campaignList from '@/components/campaigns/list'
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      partner: 'getCurrentPartner',
      getCampaignsByPartner: 'getCampaignsByPartner'
    }),
    campaigns: function () {
      return this.getCampaignsByPartner(this.id)
    }
  },
  methods: {
    ...mapMutations({
      showCreateCampaignModal: 'SHOW_CREATE_CAMPAIGN_MODAL'
    })
  },
  components: {
    'partner-layout': partnerLayout,
    'create-campaign': createCampaign,
    'campaign-list': campaignList
  }
}
</script>
