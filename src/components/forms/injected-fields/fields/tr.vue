<template>
  <tr class="tr">
    <td class="td">{{ injectedField.field_type }}</td>
    <td class="td">{{ injectedField.field_key }}</td>
    <td class="td">{{ injectedField.field_value }}</td>
    <td class="td">{{ injectedField.posting_params }}</td>
    <td class="td w-24">
      <btn-group-right v-if="editable">
        <delete-injected-field :id="injectedField.id"></delete-injected-field>
        <button
          class="btn btn-circle btn-hollow-blue"
          @click="setCurrentInjectedFieldAndShow(injectedField)">
          <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
        </button>
      </btn-group-right>
    </td>
  </tr>
</template>

<script>
import deleteInjectedField from '@/components/forms/injected-fields/fields/delete'
import { mapMutations } from 'vuex'
export default {
  props: {
    injectedField: Object,
    editable: {
      default: true,
      type: Boolean
    }
  },
  components: {
    'delete-injected-field': deleteInjectedField
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
