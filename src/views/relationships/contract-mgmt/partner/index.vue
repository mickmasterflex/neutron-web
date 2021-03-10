<template>
  <content-layout>
    <template v-slot:hud>
      <h1 class="h1 text-white">{{partner.name}}</h1>
      <div class="hud--stat-cards">
        <stat-card v-if="partner.parent" :data="partner.parent" :title="`Parent`" :color="`teal`"></stat-card>
        <stat-card :data="partner.client" :title="`Client`" :color="`teal`"></stat-card>
        <status-card :status="partner.status"></status-card>
      </div>
    </template>
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'details' ? 'active' : ''">
          <router-link :to="{name: 'PartnerContract', params: {id:id}}">Partner Details</router-link>
        </li>
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'contracts' ? 'active' : ''">
          <router-link :to="{name: 'PartnerContractChildren', params: {id:id}}">Contracts</router-link>
        </li>
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'campaigns' ? 'active' : ''">
          <router-link :to="{name: 'PartnerContractCampaigns', params: {id:id}}">Campaigns</router-link>
        </li>
      </ul>
    </template>
    <template v-slot:content>
      <router-view />
    </template>
  </content-layout>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import statusCard from '@/components/ui/cards/status-card.vue'

export default {
  components: {
    'status-card': statusCard
  },
  props: {
    id: Number
  },
  computed: {
    ...mapGetters({
      partner: 'getCurrentPartner'
    })
  },
  methods: {
    ...mapActions({
      fetchCurrentPartner: 'fetchCurrentPartner'
    }),
    ...mapMutations({
      resetCurrent: 'RESET_CURRENT_PARTNER'
    }),
    async setPartner () {
      if (this.partner.id !== this.id) {
        await this.fetchCurrentPartner(this.id)
      }
    }
  },
  watch: {
    id: function () {
      this.fetchCurrentPartner(this.id)
    }
  },
  created () {
    this.setPartner().then(() => {
      document.title = this.partner.name
    })
  },
  destroyed () {
    this.resetCurrent()
  }
}
</script>
