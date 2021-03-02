<template>
  <base-panel-grid>
    <partner-list-panel :contracts="children"
                        :client="$route.params.client"
                        class="col-span-2"
                        emptyStateCopy="Use the 'New Partner' button to add partners to this partner."></partner-list-panel>
    <contract-relations-index v-if="partner.id" :contract="partner.id" contractType="partner" class="col-span-2"></contract-relations-index>
    <create-partner-contract :client="partner.client.id" :parent="partner.id"></create-partner-contract>
  </base-panel-grid>
</template>

<script>
import partnerListPanel from '@/components/partners/list-panel'
import createPartner from '@/components/partners/create'
import contractRelationsIndex from '@/components/contract-relations/index'

import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    'partner-list-panel': partnerListPanel,
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
