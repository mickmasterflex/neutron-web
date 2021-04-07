<template>
  <transition-table-state>
    <table v-if="injectedFieldTypes.length" class="table table-striped">
      <thead>
      <tr class="w-20">
        <th class="th">Type</th>
        <th class="th"></th>
      </tr >
      </thead>
      <tbody class="tbody">
      <tr class="tr" v-for="injectedFieldType in injectedFieldTypes" :key="'injectedField-'+injectedFieldType.id">
        <td class="td">{{ injectedFieldType.field_type}}</td>
        <td class="td">
          <btn-group-right>
            <delete-injected-field-type :id="injectedFieldType.id" :type="injectedFieldType.field_type"></delete-injected-field-type>
            <button @click="showUpdateInjectedFieldTypeModal(injectedFieldType)" class="btn btn-hollow-blue btn-circle"><font-awesome-icon icon="pencil-alt"></font-awesome-icon></button>
          </btn-group-right>
        </td>
      </tr>
      </tbody>
    </table>
    <table-empty-state class="well" v-else heading="None Added" copy="Use the 'Add Type' button."></table-empty-state>
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
    showUpdateInjectedFieldTypeModal (injectedFieldType) {
      this.showModal()
      this.setCurrentInjectedFieldType(injectedFieldType)
    }
  }
}
</script>
