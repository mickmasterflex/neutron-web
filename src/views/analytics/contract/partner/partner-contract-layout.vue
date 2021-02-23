<template>
  <contract-layout :contract="contract"
                   :clientId="clientId"
                   :id="id"
                   :leadsRoute="{
                     name: 'PartnerStatsContractLeads',
                     params: { clientId: clientId, id: id },
                     query: $route.query
                   }"
                   :fetchContractStats="fetchPartnerContractStats"
  >
    <template v-slot:statCards>
      <stat-card :data="campaigns.length" title="Campaigns" color="teal" key="campaignCountStatCard" ></stat-card>
    </template>
    <template v-slot:contentTab>
      <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'campaigns' ? 'active' : ''">
        <router-link :to="{
          name: 'PartnerStatsContractCampaigns',
          params: { clientId: clientId, id: id },
          query: $route.query
        }">Campaigns</router-link>
      </li>
    </template>
  </contract-layout>
</template>

<script>
import contractLayout from '@/views/analytics/contract/layout'
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    clientId: Number,
    id: Number
  },
  computed: {
    ...mapGetters({
      contract: 'getCurrentPartnerStatsContract',
      campaigns: 'getPartnerContractStatsCampaigns'
    })
  },
  methods: {
    ...mapActions({
      fetchPartnerContractStats: 'fetchPartnerContractStats'
    })
  },
  components: {
    'contract-layout': contractLayout
  }
}
</script>
