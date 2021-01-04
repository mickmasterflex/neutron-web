<template>
  <base-panel-grid>
    <buyer-list-panel class="col-span-2" :contracts="buyers" :client="$route.params.slug"></buyer-list-panel>
    <create-buyer-contract :client="client.id"></create-buyer-contract>
    <panel-template title="Partner Contracts" class="col-span-2">
      <template v-slot:action>
        <button class="btn btn-turquoise" @click="showCreatePartnerModal()"><font-awesome-icon icon="plus"></font-awesome-icon> New Partner</button>
      </template>
      <template v-slot:content>
        <partner-list :contracts="partners" :client="$route.params.slug"></partner-list>
      </template>
    </panel-template>
    <create-partner-contract :client="client.id"></create-partner-contract>
  </base-panel-grid>
</template>

<script>
import partnerList from '@/components/partners/list'
import buyerList from '@/components/buyers/list-panel'
import createPartner from '@/components/partners/create'
import createBuyer from '@/components/buyers/create'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    'partner-list': partnerList,
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
  },
  methods: {
    ...mapMutations({
      showCreatePartnerModal: 'SHOW_CREATE_PARTNER_MODAL'
    })
  }
}
</script>
