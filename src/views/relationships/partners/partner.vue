<template>
  <div v-if="partner">
    <div class="hud">
      <h1 class="h1 text-white">{{partner.name}}</h1>
      <div>
        <stat-card v-if="partner.parent" :data="partner.parent" :title="`Parent`" :color="`teal`"></stat-card>
        <stat-card :data="partner.client" :title="`Client`" :color="`teal`"></stat-card>
      </div>
    </div>
    <h3 class="h3 mt-5 mb-2">Campaigns List</h3>
    <campaign-list :campaigns="campaigns"></campaign-list>

    <h3 class="h3 mt-5 mb-2">Delete Partner Contract</h3>
    <delete-partner-contract :client="partner.client" :id="id"></delete-partner-contract>

    <h3 class="h3 mt-5 mb-2">Update Partner Contract</h3>
    <update-partner-contract :partner="partner"></update-partner-contract>

    <h3 class="h3 mt-5 mb-2">Create Campaign</h3>
    <create-campaign :partner="partner.id"></create-campaign>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import deletePartner from '@/components/partners/delete'
import updatePartner from '@/components/partners/update'
import createCampaign from '@/components/campaigns/create'
import campaignList from '@/components/campaigns/list'

export default {
  props: {
    id: Number
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
    })
  },
  created () {
    this.fetchCurrentPartner(this.id)
    this.fetchCampaigns()
  }
}
</script>
