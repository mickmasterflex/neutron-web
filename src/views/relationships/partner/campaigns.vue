<template>
  <div>
    <action-heading>
      <template v-slot:left>
        <h3 class="h3">Campaigns List</h3>
      </template>
      <template v-slot:right>
        <button class="btn btn-turquoise" @click="showCreateCampaignModal()"><font-awesome-icon icon="plus"></font-awesome-icon> New Campaign</button>
      </template>
    </action-heading>
    <campaign-list :campaigns="campaigns" :client="$route.params.client"></campaign-list>
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
