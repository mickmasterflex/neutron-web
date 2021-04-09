<template>
  <contract-layout :id="id"
                   contracts-route-name="PartnerStatsContractContracts"
                   leads-route-name="PartnerStatsContractLeads"
                   :fetch-contract-stats="fetchPartnerContractStats"
                   :key="id"
  >
    <template v-slot:contentTab>
      <underscore-tab :active="$route.meta.contentTab === 'campaigns'">
        <router-link :to="{
          name: 'PartnerStatsContractCampaigns',
          params: { clientId: clientId, id: id },
          query: $route.query
        }">Campaigns <number-label :number="campaigns.length"></number-label></router-link>
      </underscore-tab>
    </template>
  </contract-layout>
</template>

<script>
import contractLayout from '@/views/analytics/layouts/contract/layout'
import { mapActions, mapGetters } from 'vuex'
import { partnerContractBreadcrumbs } from '@/mixins/breadcrumbs/analytics/ancestral/partner'

export default {
  props: {
    clientId: Number,
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
