<template>
  <panel-template title="Recruitment Locations" :actionTransition="true" :showLoader="geoLoading || buyerFetchLoading" :loadingText="computedLoadingText">
    <template #action>
      <slot name="action"></slot>
    </template>
    <template #tabs>
      <panel-tabs>
        <underscore-tab :active="contentTab === 'add'" size="sm">
          <span @click="showAdd()">Add</span>
        </underscore-tab>
        <underscore-tab :active="contentTab === 'remove'" size="sm">
          <span @click="showRemove()">Remove</span>
        </underscore-tab>
        <underscore-tab :active="contentTab === 'search'" size="sm">
          <span @click="showSearch()">Search</span>
        </underscore-tab>
      </panel-tabs>
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
import panelTabs from '@/components/ui/panels/base/tabs'
import panelFooter from '@/components/ui/panels/base/footer'
import downloadLocations from '@/components/geos/download-locations'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    'panel-tabs': panelTabs,
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
      buyerFetchLoadingText: 'getBuyerFetchLoadingText'
    }),
    computedLoadingText () {
      if (this.buyerFetchLoading) {
        return this.buyerFetchLoadingText
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
  },
  created () {
    this.showAdd()
  }
}
</script>
