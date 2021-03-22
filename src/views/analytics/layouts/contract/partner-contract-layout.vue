<template>
  <contract-layout :contract="contract"
                   :clientId="clientId"
                   :id="id"
                   contracts-route-name="PartnerStatsContractContracts"
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
        }">Campaigns <label-number :number="campaigns.length"></label-number></router-link>
      </li>
    </template>
  </contract-layout>
</template>

<script>
import contractLayout from '@/views/analytics/layouts/contract/layout'
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    clientId: Number,
    id: Number
  },
  computed: {
    ...mapGetters({
      contract: 'getCurrentContractStats',
      getCampaignsByPartner: 'getCurrentStatsCampaignsByPartner'
    }),
    campaigns () {
      return this.getCampaignsByPartner(this.id)
    }
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
