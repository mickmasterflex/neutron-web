<template>
  <contract-field-panel contentTab="fields" loadingText="fields">
    <template #action>
    </template>
    <template #content>
      <list-fields :contractName="contractName"></list-fields>
      <update-field :field="currentField"/>
    </template>
  </contract-field-panel>
</template>

<script>
import contractFieldPanel from '@/components/forms/fields/contract-field-panel/contract-field-panel.vue'
import listFields from '@/components/forms/fields/list'
import updateField from '@/components/forms/fields/update'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    contractName: String
  },
  data () {
    return {
      updateComponent: null
    }
  },
  computed: {
    ...mapGetters({
      currentField: 'getCurrentField'
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
      showUpdateFieldModal: 'SHOW_UPDATE_FIELD_MODAL',
      showUpdateOptionFieldModal: 'SHOW_UPDATE_OPTION_FIELD_MODAL',
      showField: 'SHOW_USED_BASE_FIELDS_LOADING'
    })
  },
  components: {
    'list-fields': listFields,
    'contract-field-panel': contractFieldPanel,
    'update-field': updateField
  }
}
</script>
