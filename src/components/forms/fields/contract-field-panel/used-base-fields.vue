<template>
  <contract-field-panel contentTab="used fields" loadingText="used fields">
    <template #action>
    </template>
    <template #content>
      <list-used-base-fields :contractName="contractName"></list-used-base-fields>
    </template>
  </contract-field-panel>
</template>

<script>
import contractFieldPanel from '@/components/forms/fields/contract-field-panel/contract-field-panel.vue'
import listUsedBaseFields from '@/components/forms/fields/list'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { setResponseErrors } from '@/mixins/set-response-errors'
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
      usedBaseFields: 'getCurrentBaseFields'
    })
  },
  watch: {
    currentField () {
      if (this.currentField) {
        this.showUpdateFieldModal()
      }
    }
  },
  mixins: [enterKeyListener, setResponseErrors],
  methods: {
    methods: {
      ...mapActions({
        showField: 'showContractFieldsPanel'
      }),
      ...mapMutations({
        showField: 'SHOW_USED_BASE_FIELDS_LOADING'
      })
    }
  },
  components: {
    'list-used-base-fields': listUsedBaseFields,
    'contract-field-panel': contractFieldPanel
  }
}
</script>
