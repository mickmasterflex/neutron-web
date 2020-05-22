<template>
  <div>
    <table v-if="baseFields" class="w-full">
      <tr class="th-row">
        <th class="th">Name</th>
        <th class="th">Label</th>
        <th class="th">Description</th>
        <th class="th">Type</th>
        <th class="th"></th>
      </tr>
      <tr v-for="field in baseFields" :key="field.id">
        <td class="td">
          <span class="text-link"
            @click="editBaseField(field.id, field.type)">
            {{field.name}}</span>
        </td>
        <td class="td">{{field.label}}</td>
        <td class="td">{{field.description}}</td>
        <td class="td">{{field.type}}</td>
        <td class="td flex flex-row justify-end">
          <delete-base-field :id="field.id" :type="field.type" v-if="field.type"></delete-base-field>
        </td>
      </tr>
    </table>
    <div v-else>
      ...Loading...
    </div>
    <update-base-text-field-modal :field="currentBaseTextField"></update-base-text-field-modal>
    <update-base-option-field-modal :field="currentBaseOptionField"></update-base-option-field-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import updateBaseTextField from '@/components/forms/base-fields/text-fields/update'
import updateBaseOptionField from '@/components/forms/base-fields/option-fields/update'
import deleteBaseField from '@/components/forms/base-fields/delete'

export default {
  data () {
    return {
      showModalUpdateBaseTextField: false
    }
  },
  components: {
    'update-base-text-field-modal': updateBaseTextField,
    'update-base-option-field-modal': updateBaseOptionField,
    'delete-base-field': deleteBaseField
  },
  computed: {
    ...mapGetters({
      baseFields: 'getBaseFields',
      currentBaseTextField: 'getCurrentBaseTextField',
      currentBaseOptionField: 'getCurrentBaseOptionField'
    })
  },
  methods: {
    ...mapActions({
      fetchBaseFields: 'fetchBaseFields',
      fetchCurrentBaseOptionField: 'fetchCurrentBaseOptionField',
      fetchCurrentBaseTextField: 'fetchCurrentBaseTextField'
    }),
    ...mapMutations({
      showUpdateBaseOptionFieldModal: 'SHOW_UPDATE_BASE_OPTION_FIELD_MODAL',
      showUpdateBaseTextFieldModal: 'SHOW_UPDATE_BASE_TEXT_FIELD_MODAL'
    }),
    editBaseField (id, type) {
      if (type === 'text' || type === 'textarea') {
        this.editBaseTextField(id)
      } else {
        this.editBaseOptionField(id)
      }
    },
    editBaseTextField (id) {
      this.showUpdateBaseTextFieldModal()
      this.fetchCurrentBaseTextField(id)
    },
    editBaseOptionField (id) {
      this.showUpdateBaseOptionFieldModal()
      this.fetchCurrentBaseOptionField(id)
    }
  },
  created () {
    this.fetchBaseFields()
  }
}
</script>
