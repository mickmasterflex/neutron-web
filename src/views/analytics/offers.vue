<template>
  <analytics-panel-template>
    <template slot="content">
      <offer-contracts-list :offers="offersByParent(id)"></offer-contracts-list>
    </template>
  </analytics-panel-template>
</template>

<script>
import analyticsPanelTemplate from '@/components/analytics/panel-template'
import offerList from '@/components/analytics/offer-contracts-list'
import { mapGetters } from 'vuex'

export default {
  props: {
    id: Number
  },
  computed: {
    ...mapGetters({
      offersByParent: 'getCurrentStatsOffersByParent'
    })
  },
  components: {
    'analytics-panel-template': analyticsPanelTemplate,
    'offer-contracts-list': offerList
  }
}
</script>
