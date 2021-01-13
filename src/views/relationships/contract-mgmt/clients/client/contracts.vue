<template>
  <base-panel-grid>
    <buyer-list-panel class="col-span-2" :contracts="buyers" :client="$route.params.slug"></buyer-list-panel>
    <create-buyer-contract :client="client.id"></create-buyer-contract>
    <partner-list-panel class="col-span-2" :contracts="partners" :client="$route.params.slug"></partner-list-panel>
    <create-partner-contract :client="client.id"></create-partner-contract>
  </base-panel-grid>
</template>

<script>
import partnerListPanel from '@/components/partners/list-panel'
import buyerList from '@/components/buyers/list-panel'
import createPartner from '@/components/partners/create'
import createBuyer from '@/components/buyers/create'
import { mapGetters } from 'vuex'

export default {
  components: {
    'partner-list-panel': partnerListPanel,
    'buyer-list-panel': buyerList,
    'create-partner-contract': createPartner,
    'create-buyer-contract': createBuyer
  },
  computed: {
    ...mapGetters({
      client: 'getCurrentClient',
      getParentlessBuyersByClient: 'getParentlessBuyersByClient',
      getParentlessPartnersByClient: 'getParentlessPartnersByClient'
    }),
    partners: function () {
      return this.getParentlessPartnersByClient(this.client.id)
    },
    buyers: function () {
      return this.getParentlessBuyersByClient(this.client.id)
    }
  }
}
</script>
