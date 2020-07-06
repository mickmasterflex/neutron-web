<template>
  <div v-if="partner">
    <div class="hud">
      <h1 class="h1 text-white">{{partner.name}}</h1>
      <div class="hud--stat-cards">
        <stat-card v-if="partner.parent" :data="partner.parent" :title="`Parent`" :color="`teal`"></stat-card>
        <stat-card :data="partner.client" :title="`Client`" :color="`teal`"></stat-card>
      </div>
    </div>
    <div class="flex flex-row justify-between mt-4">
      <h3 class="h3">Campaigns List</h3>
      <button class="btn btn-green" @click="showCreateCampaignModal()">Create Campaign</button>
    </div>
    <campaign-list :campaigns="campaigns"></campaign-list>
    <create-campaign :partner="partner.id"></create-campaign>

    <h3 class="h3 mt-5 mb-2">Delete Partner Contract</h3>
    <delete-partner-contract :client="partner.client" :id="id"></delete-partner-contract>

    <h3 class="h3 mt-5 mb-2">Update Partner Contract</h3>
    <update-partner-contract :partner="partner"></update-partner-contract>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import deletePartner from '@/components/partners/delete'
import updatePartner from '@/components/partners/update'
import createCampaign from '@/components/campaigns/create'
import campaignList from '@/components/campaigns/list'

export default {
  props: {
    id: {
      type: Number
    }
  },
  components: {
    'delete-partner-contract': deletePartner,
    'update-partner-contract': updatePartner,
    'create-campaign': createCampaign,
    'campaign-list': campaignList
  },
  computed: {
    ...mapGetters({
      partner: 'getCurrentPartner',
      campaign: 'getCurrentCampaign',
      getCampaignsByPartner: 'getCampaignsByPartner'
    }),
    campaigns: function () {
      return this.getCampaignsByPartner(this.id)
    }
  },
  methods: {
    ...mapActions({
      fetchCurrentPartner: 'fetchCurrentPartner',
      fetchCampaigns: 'fetchCampaigns'
    }),
    ...mapMutations({
      showCreateCampaignModal: 'SHOW_CREATE_CAMPAIGN_MODAL'
    })
  },
  created () {
    this.fetchCurrentPartner(this.id)
    this.fetchCampaigns()
  }
}
</script>
