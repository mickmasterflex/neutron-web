<template>
  <base-panel-grid>
    <panel-template title="Child Contracts" class="col-span-2">
      <template v-slot:action>
        <button class="btn btn-turquoise" @click="showCreatePartnerModal()"><font-awesome-icon icon="plus"></font-awesome-icon> New Partner</button>
      </template>
      <template v-slot:content>
        <partner-list :contracts="children" :client="$route.params.client"></partner-list>
      </template>
    </panel-template>
    <contract-relations-index v-if="partner.id" :contract="partner.id" contractType="partner" class="col-span-2"></contract-relations-index>
    <create-partner-contract :client="partner.client" :parent="partner.id"></create-partner-contract>
  </base-panel-grid>
</template>

<script>
import partnerList from '@/components/partners/list'
import createPartner from '@/components/partners/create'
import contractRelationsIndex from '@/components/contract-relations/index'

import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    'partner-list': partnerList,
    'create-partner-contract': createPartner,
    'contract-relations-index': contractRelationsIndex
  },
  computed: {
    ...mapGetters({
      partner: 'getCurrentPartner',
      partners: 'getAllPartners',
      getPartnersByParent: 'getPartnersByParent'
    }),
    children: function () {
      return this.getPartnersByParent(this.partner.id)
    }
  },
  methods: {
    ...mapActions({
      fetchPartners: 'fetchPartners'
    }),
    ...mapMutations({
      showCreatePartnerModal: 'SHOW_CREATE_PARTNER_MODAL'
    })
  },
  created () {
    this.fetchPartners()
  }
}
</script>
