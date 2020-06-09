<template>
  <div>
    <div class="hud">
      <h1 class="h1 text-white">All Partner Contracts</h1>
      <div class="hud--stat-cards">
        <stat-card :data="partner_count" :title="`Partner Contracts`" :color="`teal`"></stat-card>
      </div>
    </div>
    <div class="flex flex-row justify-between mt-4">
    <h3 class="h3">Partners</h3>
      <button class="btn btn-green" @click="showCreatePartnerModal()">Create Partner</button>
    </div>
    <partner-list :contracts="partners" class="mt-5"></partner-list>
    <create-partner-contract></create-partner-contract>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import partnerList from '@/components/partners/list'
import createPartner from '@/components/partners/create'

export default {
  components: {
    'partner-list': partnerList,
    'create-partner-contract': createPartner
  },
  computed: {
    ...mapGetters({
      partners: 'getAllPartners',
      partner_count: 'getAllPartnersCount'
    })
  },
  methods: {
    ...mapActions({ fetchPartners: 'fetchPartners' }),
    ...mapMutations({ showCreatePartnerModal: 'SHOW_CREATE_PARTNER_MODAL' })
  },
  created () {
    this.fetchPartners()
  }
}
</script>
