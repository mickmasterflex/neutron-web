<template>
  <contract-layout :contract="contract"
                   :clientId="clientId"
                   :id="id"
                   :contractsRoute="{
                     name: 'PartnerStatsContractContracts',
                     params: { clientId: clientId, id: id },
                     query: $route.query
                   }"
                   :leadsRoute="{
                     name: 'PartnerStatsContractLeads',
                     params: { clientId: clientId, id: id },
                     query: $route.query
                   }"
                   :fetchContractStats="fetchPartnerContractStats"
  >
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
      contract: 'getCurrentPartnerStatsContract'
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
