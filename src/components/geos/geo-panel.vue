<template>
  <panel-template title="Recruitment Locations" :actionTransition="true" :showLoader="contractLoading ? contractLoading : geoLoading" :loadingText="computedLoadingText">
    <template #action>
      <slot name="action"></slot>
    </template>
    <template #tabs>
      <inherited-location-status-bar/>
      <underscore-tabs-inset>
        <underscore-tab :active="contentTab === 'add'" size="sm">
          <span @click="showAdd()">Add</span>
        </underscore-tab>
        <underscore-tab :active="contentTab === 'remove'" size="sm">
          <span @click="showRemove()">Remove</span>
        </underscore-tab>
        <underscore-tab :active="contentTab === 'search'" size="sm">
          <span @click="showSearch()">Search</span>
        </underscore-tab>
      </underscore-tabs-inset>
    </template>
    <template #content>
      <slot name="content"></slot>
    </template>
    <template #footer>
      <panel-footer>
        <template #end>
          <download-locations></download-locations>
        </template>
      </panel-footer>
    </template>
  </panel-template>
</template>

<script>
import underscoreTabsInset from '@/components/ui/tabs/underscore/tabs-inset'
import inheritedLocationStatusBar from '@/components/geos/inherited-locations-status-bar/index'
import panelFooter from '@/components/ui/panels/base/footer'
import downloadLocations from '@/components/geos/download-locations'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    'inherited-location-status-bar': inheritedLocationStatusBar,
    'underscore-tabs-inset': underscoreTabsInset,
    'panel-footer': panelFooter,
    'download-locations': downloadLocations
  },
  props: {
    contentTab: {
      default: 'add',
      type: String,
      required: true,
      validator: function (value) {
        return ['add', 'remove', 'search'].includes(value)
      }
    },
    loadingText: {
      default: 'Loading',
      type: String
    }
  },
  computed: {
    ...mapGetters({
      geoLoading: 'getGeoPanelLoading',
      buyerFetchLoading: 'getBuyerFetchLoading',
      buyerFetchLoadingText: 'getBuyerFetchLoadingText',
      offerFetchLoading: 'getOfferFetchLoading',
      offerFetchLoadingText: 'getOfferFetchLoadingText'
    }),
    contractLoading () {
      if (this.buyerFetchLoading) {
        return this.buyerFetchLoading
      } else if (this.offerFetchLoading) {
        return this.offerFetchLoading
      }
      return false
    },
    contractLoadingText () {
      if (this.buyerFetchLoading) {
        return this.buyerFetchLoadingText
      } else if (this.offerFetchLoading) {
        return this.offerFetchLoadingText
      }
      return 'Loading'
    },
    computedLoadingText () {
      if (this.contractLoading) {
        return this.contractLoadingText
      } else if (this.geoLoading) {
        return this.loadingText
      }
      return 'Loading'
    }
  },
  methods: {
    ...mapActions({
      showAdd: 'showAddLocationsPanel',
      showRemove: 'showRemoveLocationsPanel',
      showSearch: 'showSearchLocationsPanel'
    })
  }
}
</script>
