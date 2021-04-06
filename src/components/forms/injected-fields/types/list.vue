<template>
  <transition-table-state>
    <table v-if="injectedFieldTypes.length" class="table table-white">
      <thead>
      <tr>
        <th class="th">Type</th>
        <th class="th"></th>
      </tr>
      </thead>
      <tbody class="tbody">
      <tr class="tr" v-for="injectedFieldType in injectedFieldTypes" :key="'injectedField-'+injectedFieldType.id">
        <td class="td">{{ injectedFieldType.field_type}}</td>
        <td class="td">
          <span class="flex flex-row justify-end">
            <delete-injected-field-type :id="injectedFieldType.id" :type="injectedFieldType.field_type"></delete-injected-field-type>
            <button @click="showUpdateInjectedFieldTypeModal(injectedFieldType)" class="btn btn-hollow-blue btn-circle"><font-awesome-icon icon="pencil-alt"></font-awesome-icon></button>
          </span>
        </td>
      </tr>
      </tbody>
    </table>
    <table-empty-state v-else heading="None Added" copy="Use the 'Create Type' button."></table-empty-state>
  </transition-table-state>
</template>

<script>

import { mapMutations, mapGetters } from 'vuex'
import deleteInjectedFieldType from '@/components/forms/injected-fields/types/delete.vue'

export default {
  components: {
    'delete-injected-field-type': deleteInjectedFieldType
  },
  computed: {
    ...mapGetters({
      injectedFieldTypes: 'getInjectedFieldTypes'
    })
  },
  methods: {
    ...mapMutations({
      setCurrentInjectedFieldType: 'SET_CURRENT_INJECTED_FIELD_TYPE',
      showModal: 'SHOW_UPDATE_INJECTED_FIELD_TYPE_MODAL'
    }),
    showUpdateInjectedFieldTypeModal () {
      this.showModal()
    }
  }
}
</script>
