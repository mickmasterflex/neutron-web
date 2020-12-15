<template>
  <panel-template title="Recruitment Locations" :actionTransition="true" :showLoader="geoLoading" :loadingText="loadingText">
    <template #action>
      <slot name="action"></slot>
    </template>
    <template #tabs>
      <panel-tabs>
        <li class="underscore-tab underscore-tab-sm" :class="contentTab === 'add' ? 'active' : ''">
          <span @click="showAdd()">Add</span>
        </li>
        <li class="underscore-tab underscore-tab-sm" :class="contentTab === 'remove' ? 'active' : ''">
          <span @click="showRemove()">Remove</span>
        </li>
        <li class="underscore-tab underscore-tab-sm" :class="contentTab === 'search' ? 'active' : ''">
          <span @click="showSearch()">Search</span>
        </li>
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
      geoLoading: 'getGeoPanelLoading'
    })
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