<template>
  <div>
      <panel-template title="Injected Field Types" contentBackgroundColor="white">
        <template slot="action">
          <button class="btn btn-turquoise" @click="showCreateInjectedFieldTypeModal()"><font-awesome-icon icon="plus"></font-awesome-icon> New Type</button>
        </template>
        <template slot="content">
          <list-injected-field-types></list-injected-field-types>
        </template>
      </panel-template>
      <component :is="current_injected_field_type_modal" :field="currentInjectedFieldType"></component>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import listInjectedFieldTypes from '@/components/forms/injected-fields/types/list'

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
      fetchInjectedFieldTypes: 'getInjectedFieldTypes'
    })
  },
  computed: {
    ...mapGetters({
      currentInjectedFieldType: 'getCurrentInjectedFieldType'
    })
  },
  components: {
    'list-injected-field-types': listInjectedFieldTypes
  },
  created () {
    this.fetchInjectedFieldTypes()
  }
}
</script>
