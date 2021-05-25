<template>
  <panel-template
    title="Contract Fields"
    :actionTransition="true"
    :showLoader="loading"
    :loadingText="loadingText">
    <template v-slot:action>
      <create-field></create-field>
    </template>
    <template #tabs>
      <underscore-tabs-inset>
        <underscore-tab :active="contentTab === 'fields'" size="sm">
        <span @click="showField()">Fields</span>
      </underscore-tab>
        <underscore-tab :active="contentTab === 'used fields'" size="sm">
          <span @click="showUsedBaseFields()">Used Base Fields</span>
        </underscore-tab>
      </underscore-tabs-inset>
    </template>
    <template v-slot:content>
      <slot name="content"></slot>
    </template>
    <template #footer>
      <panel-footer>
        <template #end>
        </template>
      </panel-footer>
    </template>
  </panel-template>
</template>

<script>
import createField from '@/components/forms/fields/create'
import panelFooter from '@/components/ui/panels/base/footer'
import underscoreTabsInset from '@/components/ui/tabs/underscore/tabs-inset'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  props: {
    contentTab: {
      default: 'fields',
      type: String,
      required: true
    },
    loading: Boolean,
    loadingText: String,
    contractName: String
  },
  data () {
    return {
      updateComponent: null
    }
  },
  components: {
    'create-field': createField,
    'underscore-tabs-inset': underscoreTabsInset,
    'panel-footer': panelFooter
  },
  computed: {
    ...mapGetters({
      currentField: 'getCurrentField',
      usedBaseFields: 'getUsedBaseFields'
    })
  },
  watch: {
    currentField () {
      if (this.currentField) {
        this.showUpdateFieldModal()
      }
    }
  },
  methods: {
    ...mapActions({
      showField: 'showContractFieldsPanel',
      showUsedBaseFields: 'showUsedBaseFieldsPanel'
    }),
    ...mapMutations({
      showUpdateFieldModal: 'SHOW_UPDATE_FIELD_MODAL',
      showUpdateOptionFieldModal: 'SHOW_UPDATE_OPTION_FIELD_MODAL'
    })
  }
}
</script>
