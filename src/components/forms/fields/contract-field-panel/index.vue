<template>
  <div>
    <contract-fields  :loading="loading"
                      :loading-text="loadingText"
                      :contract-name="contract.name"
                      class="col-span-2"
                      v-show="fieldsVisible"></contract-fields>
    <used-base-fields :loading="loading"
                      :loading-text="loadingText"
                      :contract-name="contract.name"
                      class="col-span-2"
                      v-show="usedBaseFieldsVisible"></used-base-fields>
  </div>
</template>

<script>
import fields from '@/components/forms/fields/contract-field-panel/fields'
import usedBaseFields from '@/components/forms/fields/contract-field-panel/used-base-fields'
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    geo: Number
  },
  components: {
    'contract-fields': fields,
    'used-base-fields': usedBaseFields
  },
  computed: {
    ...mapGetters({
      fieldsVisible: 'getContractFieldsPanelVisible',
      usedBaseFieldsVisible: 'getUsedBaseFieldsPanelVisible'
    })
  },
  methods: {
    ...mapMutations({
      setCurrentGeo: 'SET_CURRENT_GEO',
      resetCurrentGeo: 'RESET_CURRENT_GEO'
    })
  }
}
</script>
