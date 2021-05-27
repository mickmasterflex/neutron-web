<template>
  <div>
    <contract-fields :loading="loading" :loading-text="loadingText" v-show="fieldsVisible" v-if="fieldsVisible === !usedBaseFieldsVisible"></contract-fields>
    <used-base-fields :loading="loading"
                      :loading-text="loadingText"
                      v-show="usedBaseFieldsVisible"
    ></used-base-fields>
  </div>
</template>

<script>
import fields from '@/components/forms/fields/contract-field-panel/fields'
import usedBaseFields from '@/components/forms/fields/contract-field-panel/used-base-fields'
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    loading: Boolean,
    loadingText: String,
    contractName: String
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
