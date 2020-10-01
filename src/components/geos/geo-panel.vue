<template>
  <panel-template title="Recruitment Locations">
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
          <button class="btn btn-hollow-purple"><font-awesome-icon icon="download"></font-awesome-icon> Download Current Locations</button>
        </template>
      </panel-footer>
    </template>
  </panel-template>
</template>

<script>
import panelTabs from '@/components/ui/panels/base/tabs'
import panelFooter from '@/components/ui/panels/base/footer'
import { mapActions } from 'vuex'

export default {
  components: {
    'panel-tabs': panelTabs,
    'panel-footer': panelFooter
  },
  props: {
    contentTab: {
      default: 'add',
      type: String,
      required: true,
      validator: function (value) {
        return ['add', 'remove', 'search'].includes(value)
      }
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
