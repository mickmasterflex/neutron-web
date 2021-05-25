<template>
  <contract-field-panel contentTab="used fields" loadingText="used fields">
    <template #action>
    </template>
    <template #content>
      <list-used-base-fields></list-used-base-fields>
    </template>
  </contract-field-panel>
</template>

<script>
import contractFieldPanel from '@/components/forms/fields/contract-field-panel/contract-field-panel.vue'
import listUsedBaseFields from '@/components/forms/fields/used-base-fields-list'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      updateComponent: null
    }
  },
  computed: {
    ...mapGetters({
      usedBaseFields: 'getCurrentUsedBaseFields'
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
      showField: 'showContractFieldsPanel'
    }),
    ...mapMutations({
      showField: 'SHOW_USED_BASE_FIELDS_LOADING'
    })
  },
  components: {
    'list-used-base-fields': listUsedBaseFields,
    'contract-field-panel': contractFieldPanel
  }
}
</script>
