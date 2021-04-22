<template>
  <content-layout v-if="offer">
    <template v-slot:hud-content>
      <h1 class="h1 text-white">{{offer.name}}</h1>
      <hud-stat-cards>
        <stat-card :data="offer.id" title="Offer" key="offerId"></stat-card>
        <status-card :status="offer.status" key="statusCard"></status-card>
      </hud-stat-cards>
    </template>
    <template v-slot:contentTabs>
      <underscore-tabs>
        <underscore-tab :active="$route.meta.contentTab === 'details'">
          <router-link :to="{name: 'OfferDetails', params: {id:id, client: client, buyer:buyer}}">Offer Details</router-link>
        </underscore-tab>
        <underscore-tab :active="$route.meta.contentTab === 'field-management'" >
          <router-link :to="{name: 'OfferFieldManagement', params: {id:id, client: client, buyer:buyer}}">Form Fields</router-link>
        </underscore-tab>
      </underscore-tabs>
    </template>
    <template v-slot:content>
      <router-view/>
    </template>
  </content-layout>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { offerContractBreadcrumbs } from '@/mixins/breadcrumbs/relationships/offer'
import statusCard from '@/components/ui/cards/stat-cards/status'

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
  mixins: [offerContractBreadcrumbs],
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
    },
    setOfferWithTitleAndBreadcrumbs () {
      this.setOffer().then(() => {
        document.title = this.offer.name
        this.setBreadcrumbsWithAncestors()
      })
    }
  },
  created () {
    this.setOfferWithTitleAndBreadcrumbs()
  },
  destroyed () {
    this.resetCurrent()
  }
}
</script>
