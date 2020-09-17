<template>
  <div>
    <action-heading>
      <template v-slot:left>
        <h2 class="h3">Child Contracts</h2>
      </template>
      <template v-slot:right>
        <button class="btn btn-turquoise" @click="showCreatePartnerModal()"><font-awesome-icon icon="plus"></font-awesome-icon> New Partner</button>
      </template>
    </action-heading>
    <partner-list :contracts="children" :client="$route.params.client"></partner-list>
    <create-partner-contract :client="partner.client" :parent="partner.id"></create-partner-contract>
  </div>
</template>

<script>
import partnerList from '@/components/partners/list'
import createPartner from '@/components/partners/create'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    'partner-list': partnerList,
    'create-partner-contract': createPartner
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
