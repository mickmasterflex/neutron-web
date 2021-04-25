<template>
  <div>
    <panel-template title="Injected Field Types" contentBackgroundColor="white" :show-loader="loading" :loading-text="loadingText">
      <template slot="action">
        <create-injected-field-type></create-injected-field-type>
      </template>
      <template slot="content">
        <list-injected-field-types></list-injected-field-types>
      </template>
    </panel-template>
    <update-injected-field-type></update-injected-field-type>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import listInjectedFieldTypes from '@/components/forms/injected-fields/types/list'
import createInjectedFieldType from '@/components/forms/injected-fields/types/create'
import updateInjectedFieldType from '@/components/forms/injected-fields/types/update'

export default {
  data () {
    return {
      current_injected_field_type_modal: null
    }
  },
  methods: {
    ...mapMutations({
      showCreateInjectedFieldTypeModal: 'SHOW_CREATE_INJECTED_FIELD_TYPE_MODAL'
    })
  },
  computed: {
    ...mapGetters({
      currentInjectedFieldType: 'getCurrentInjectedFieldType',
      loading: 'getInjectedFieldTypesFetchLoading',
      loadingText: 'getInjectedFieldTypesFetchLoadingText'
    })
  },
  components: {
    'list-injected-field-types': listInjectedFieldTypes,
    'create-injected-field-type': createInjectedFieldType,
    'update-injected-field-type': updateInjectedFieldType
  }
}
</script>
