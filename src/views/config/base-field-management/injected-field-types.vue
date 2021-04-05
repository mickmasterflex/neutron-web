<template>
  <div>
    <panel-template title="Injected Field Types" contentBackgroundColor="white">
      <template slot="action">
        <create-injected-field-type></create-injected-field-type>
      </template>
      <template slot="content">
        <list-injected-field-types></list-injected-field-types>
      </template>
    </panel-template>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import listInjectedFieldTypes from '@/components/forms/injected-fields/types/list'
import createInjectedFieldType from '@/components/forms/injected-fields/types/create'

export default {
  data () {
    return {
      current_injected_field_type_modal: null
    }
  },
  methods: {
    ...mapMutations({
      showCreateInjectedFieldTypeModal: 'SHOW_CREATE_INJECTED_FIELD_TYPE_MODAL'
    }),
    ...mapActions({
      fetchInjectedFieldTypes: 'fetchInjectedFieldTypes'
    })
  },
  computed: {
    ...mapGetters({
      currentInjectedFieldType: 'getCurrentInjectedFieldType'
    })
  },
  components: {
    'list-injected-field-types': listInjectedFieldTypes,
    'create-injected-field-type': createInjectedFieldType
  },
  created () {
    this.fetchInjectedFieldTypes()
  }
}
</script>
