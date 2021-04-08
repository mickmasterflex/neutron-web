<template>
  <panel-template title="Injected Fields" :showLoader="loading" :loadingText="loadingText">
    <template v-slot:action>
      <button class="btn btn-turquoise" @click="showCreateInjectedFieldModal()"><font-awesome-icon icon="plus"></font-awesome-icon> Add Injected Field</button>
    </template>
    <template v-slot:content>
      <list-injected-fields></list-injected-fields>
      <update-injected-field></update-injected-field>
      <create-injected-field></create-injected-field>
    </template>
  </panel-template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import createInjectedField from '@/components/forms/injected-fields/fields/create'
import listInjectedFields from '@/components/forms/injected-fields/fields/list'
import updateInjectedField from '@/components/forms/injected-fields/fields/update'

export default {
  props: {
    loading: Boolean,
    loadingText: String
  },
  computed: {
    ...mapGetters({
      injectedFieldTypes: 'getInjectedFieldTypes'
    })
  },
  methods: {
    ...mapMutations({
      showCreateInjectedFieldModal: 'SHOW_CREATE_INJECTED_FIELD_MODAL'
    }),
    ...mapActions({
      fetchInjectedFieldTypes: 'fetchInjectedFieldTypes'
    })
  },
  created () {
    this.fetchInjectedFieldTypes()
  },
  components: {
    'create-injected-field': createInjectedField,
    'list-injected-fields': listInjectedFields,
    'update-injected-field': updateInjectedField
  }
}
</script>
