<template>
  <content-layout>
    <template v-slot:hud>
      <div class="hud">
        <h1 class="h1 text-white">All Partner Contracts</h1>
        <div class="hud--stat-cards">
          <stat-card :data="partner_count" :title="`Partner Contracts`" :color="`teal`"></stat-card>
        </div>
      </div>
    </template>
    <template v-slot:content>
      <partner-list :contracts="partners"></partner-list>
    </template>
  </content-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import partnerList from '@/components/partners/list'

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
