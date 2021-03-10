<template>
  <content-layout v-if="offer">
    <template v-slot:hud>
      <h1 class="h1 text-white">{{offer.name}}</h1>
      <div class="hud--stat-cards">
        <stat-card :data="offer.id" :title="`Offer`" :color="`teal`"></stat-card>
        <status-card :status="offer.status"></status-card>
      </div>
    </template>
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'details' ? 'active' : ''">
          <router-link :to="{name: 'OfferDetails', params: {id:id, client: client, buyer:buyer}}">Offer Details</router-link>
        </li>
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'field-management' ? 'active' : ''" >
          <router-link :to="{name: 'OfferFieldManagement', params: {id:id, client: client, buyer:buyer}}">Field Management</router-link>
        </li>
      </ul>
    </template>
    <template v-slot:content>
      <router-view/>
    </template>
  </content-layout>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import statusCard from '@/components/ui/cards/status-card'

export default {
  components: {
    'status-card': statusCard
  },
  props: {
    id: {
      type: Number
    },
    client: String,
    buyer: Number
  },
  computed: {
    ...mapGetters({
      offer: 'getCurrentOffer'
    })
  },
  methods: {
    ...mapActions({
      fetchCurrentOffer: 'fetchCurrentOffer'
    }),
    ...mapMutations({
      resetCurrent: 'RESET_CURRENT_OFFER'
    }),
    async setOffer () {
      if (this.offer.id !== this.id) {
        await this.fetchCurrentOffer(this.id)
      }
    }
  },
  created () {
    this.setOffer().then(() => {
      document.title = this.offer.name
    })
  },
  destroyed () {
    this.resetCurrent()
  }
}
</script>
