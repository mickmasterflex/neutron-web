<template>
  <content-layout>
    <template v-slot:hud>
      <div class="hud">
        <h1 class="h1 text-white">All Campaigns</h1>
        <div class="hud--stat-cards">
          <stat-card :data="campaignCount" :title="`Campaigns`" :color="`teal`"></stat-card>
        </div>
      </div>
    </template>
    <template v-slot:content>
      <campaign-list :campaigns="campaigns"></campaign-list>
    </template>
  </content-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import campaignList from '@/components/campaigns/list'

export default {
  props: {
    partner: Number
  },
  components: {
    'campaign-list': campaignList
  },
  computed: {
    ...mapGetters({
      campaigns: 'getCampaigns'
    }),
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
