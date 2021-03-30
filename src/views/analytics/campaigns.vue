<template>
  <analytics-panel-template>
    <template slot="content">
      <campaigns-list :campaigns="campaigns"></campaigns-list>
    </template>
  </analytics-panel-template>
</template>

<script>
import analyticsPanelTemplate from '@/components/analytics/panel-template'
import campaignsList from '@/components/analytics/campaigns-list'
import { mapGetters } from 'vuex'

export default {
  props: {
    id: Number
  },
  computed: {
    ...mapGetters({
      getCampaignsByPartner: 'getCurrentStatsCampaignsByPartner'
    }),
    campaigns () {
      return this.getCampaignsByPartner(this.id)
    }
  },
  components: {
    'analytics-panel-template': analyticsPanelTemplate,
    'campaigns-list': campaignsList
  }
}
</script>
