<template>
  <div>
    <div class="bg-gray-900 rounded-lg w-full p-8 grid grid-cols-1 lg:grid-cols-2 items-center">
      <h1 class="h1 text-white">All Partner Contracts</h1>
      <div>
        <stat-card :data="partner_count" :title="`Partner Contracts`" :color="`teal`"></stat-card>
      </div>
    </div>
    <h3 class="h3 mt-5 mb-2">All Partners</h3>
    <partner-list :contracts="partners"></partner-list>
  </div>
</template>

<script>
import partnerList from '@/components/contracts/partners/list'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    'partner-list': partnerList
  },
  computed: {
    ...mapGetters({
      partners: 'getAllPartners',
      partner_count: 'getAllPartnersCount'
    })
  },
  methods: {
    ...mapActions({ fetchPartners: 'fetchPartners' })
  },
  created () {
    this.fetchPartners()
  }
}
</script>
