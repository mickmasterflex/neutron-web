<template>
  <transition-table-state>
    <table v-if="formInjectedFieldsExist" class="table table-white">
      <thead>
      <tr>
        <th class="th">Type</th>
        <th class="th">Key</th>
        <th class="th">Value</th>
        <th class="th">Params</th>
        <th class="th"></th>
      </tr>
      </thead>
      <tbody class="tbody">
      <tr class="tr" v-for="injectedField in form.injected_fields" :key="injectedField.id">
        <td class="td">{{ injectedField.field_type }}</td>
        <td class="td">{{ injectedField.field_key }}</td>
        <td class="td">{{ injectedField.field_value }}</td>
        <td class="td">{{ injectedField.posting_params }}</td>
        <td class="td w-24">
          <btn-group-right>
            <delete-injected-field :id="injectedField.id"></delete-injected-field>
            <button class="btn btn-circle btn-hollow-blue" @click="setCurrentInjectedFieldAndShow(injectedField)"><font-awesome-icon icon="pencil-alt"></font-awesome-icon></button>
          </btn-group-right>
        </td>
      </tr>
      </tbody>
    </table>
    <table-empty-state v-else heading="None Added" copy="Use the 'Create a Injected Field' button."></table-empty-state>
  </transition-table-state>
</template>

<script>

import { mapMutations, mapGetters } from 'vuex'
import deleteInjectedField from '@/components/forms/fields/injected-fields/delete'

export default {
  components: {
    'delete-injected-field': deleteInjectedField
  },
  computed: {
    ...mapGetters({
      form: 'getCurrentForm'
    }),
    formInjectedFieldsExist () {
      if (this.form.injected_fields) {
        return this.form.injected_fields.length
      } else {
        return 0
      }
    }
  },
  methods: {
    ...mapMutations({
      setCurrentInjectedField: 'SET_CURRENT_INJECTED_FIELD',
      showUpdateInjectedFieldModal: 'SHOW_UPDATE_INJECTED_FIELD_MODAL'
    }),
    setCurrentInjectedFieldAndShow (injectedField) {
      this.setCurrentInjectedField(injectedField)
      this.showUpdateInjectedFieldModal()
    }
  }
}
</script>
