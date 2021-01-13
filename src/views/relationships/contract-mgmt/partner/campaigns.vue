<template>
  <div>
    <panel-template title="Campaigns List" :showLoader="loading" :loadingText="loadingText">
      <template slot="action">
        <button class="btn btn-turquoise" @click="showCreateCampaignModal()"><font-awesome-icon icon="plus"></font-awesome-icon> New Campaign</button>
      </template>
      <template slot="content">
        <campaign-list :campaigns="campaigns" :client="$route.params.client"></campaign-list>
      </template>
    </panel-template>
    <create-campaign :partner="partner.id"></create-campaign>
  </div>
</template>

<script>
import createCampaign from '@/components/campaigns/create'
import campaignList from '@/components/campaigns/list'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      partner: 'getCurrentPartner',
      getCampaignsByPartner: 'getCampaignsByPartner',
      loading: 'getCampaignsFetchLoading',
      loadingText: 'getCampaignsFetchLoadingText'
    }),
    campaigns: function () {
      return this.getCampaignsByPartner(this.partner.id)
    }
  },
  methods: {
    ...mapActions({
      fetchCampaigns: 'fetchCampaigns'
    }),
    ...mapMutations({
      showCreateCampaignModal: 'SHOW_CREATE_CAMPAIGN_MODAL'
    })
  },
  created () {
    this.fetchCampaigns()
  },
  components: {
    'create-campaign': createCampaign,
    'campaign-list': campaignList
  }
}
</script>
