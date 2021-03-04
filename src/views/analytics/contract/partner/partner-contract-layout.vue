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
                   :key="$route.params.id"
  >
    <template v-slot:statCards>
      <stat-card :data="campaigns.length" title="Campaigns" key="campaignCountStatCard" ></stat-card>
    </template>
    <template v-slot:contentTab>
      <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'contracts' ? 'active' : ''">
        <router-link :to="{
          name: 'PartnerStatsContractContracts',
          params: { clientId: clientId, id: id },
          query: $route.query
        }">Contracts</router-link>
      </li>
      <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'campaigns' ? 'active' : ''">
        <router-link :to="{
          name: 'PartnerStatsContractCampaigns',
          params: { clientId: clientId, id: id },
          query: $route.query
        }">Campaigns <label-number :number="campaigns.length"></label-number></router-link>
      </li>
    </template>
  </contract-layout>
</template>

<script>
import contractLayout from '@/views/analytics/contract/layout'
import { mapActions, mapGetters } from 'vuex'
import { partnerContractBreadcrumbs } from '@/mixins/breadcrumbs/analytics-contract/partner-breadcrumbs'

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
  mixins: [partnerContractBreadcrumbs],
  components: {
    'contract-layout': contractLayout
  }
}
</script>
