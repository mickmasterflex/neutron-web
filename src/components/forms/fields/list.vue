<template>
  <div>
    <div v-if="form">
      <div class="bg-gray-900 text-white rounded flex flex-row items-center">
        <span class="py-1 px-3">ID</span>
        <span class="py-1 px-3">Label</span>
        <span class="py-1 px-3">Mapping</span>
        <span class="py-1 px-3">Deliver</span>
      </div>
      <div v-for="field in form.fields" :key="field.id">
        <div :field="field" v-show="field.id!==currentTextFieldId" class="flex flex-row items-center">
          <text-field :value="field.id" disabled="disabled"/>
          <text-field :value="field.label" disabled="disabled"/>
          <text-field :value="field.mapping" disabled="disabled"/>
          <text-field :value="field.deliver" disabled="disabled"/>
          <span class="flex flex-row">
            <delete-field :id="field.id" :type="field.type" v-if="field.type"></delete-field>
            <button class="btn btn-circle btn-o-blue" @click="editField(field.id, field.type)" v-if="field.type">e</button>
          </span>
        </div>
        <portal-target :name="`updateTextField--${field.id}`" v-if="field.type === 'text' || field.type === 'textarea'"></portal-target>
        <portal-target :name="`updateOptionField--${field.id}`" v-if="field.type === 'select' || field.type === 'radio'"></portal-target>
      </div>
    </div>
    <div v-else>
      No Fields
    </div>
    <portal v-if="currentTextField" :to="`updateTextField--${currentTextFieldId}`">
      <update-text-field :field="this.currentTextField" :form="form.id" v-show="showUpdateText"></update-text-field>
    </portal>
    <portal v-if="currentOptionField" :to="`updateOptionField--${currentOptionFieldId}`">
      <update-option-field :field="this.currentOptionField" :form="form.id" v-show="showUpdateOption"></update-option-field>
    </portal>
  </div>
</template>

<script>
import updateTextField from '@/components/forms/fields/text-fields/update'
import updateOptionField from '@/components/forms/fields/option-fields/update'
import deleteField from '@/components/forms/fields/delete'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      currentTextFieldId: {
        default: null,
        type: Number
      },
      currentOptionFieldId: {
        default: null,
        type: Number
      }
    }
  },
  components: {
    'delete-field': deleteField,
    'update-text-field': updateTextField,
    'update-option-field': updateOptionField
  },
  methods: {
    ...mapActions({
      fetchCurrentTextField: 'fetchCurrentTextField',
      fetchCurrentOptionField: 'fetchCurrentOptionField',
      fetchBaseFields: 'fetchBaseFields'
    }),
    ...mapMutations({
      toggleShowUpdateTextField: 'TOGGLE_SHOW_UPDATE_TEXT_FIELD',
      toggleShowUpdateOptionField: 'TOGGLE_SHOW_UPDATE_OPTION_FIELD'
    }),
    editField (id, type) {
      if (type === 'radio' || type === 'select') {
        this.fetchCurrentOptionField(id)
      } else if (type === 'text' || type === 'textarea') {
        this.fetchCurrentTextField(id)
      }
    }
  },
  computed: {
    ...mapGetters({
      currentTextField: 'getCurrentTextField',
      currentOptionField: 'getCurrentOptionField',
      baseFields: 'getBaseFields',
      form: 'getCurrentForm',
      showUpdateText: 'getShowUpdateTextField',
      showUpdateOption: 'getShowUpdateOptionField'
    })
  },
  watch: {
    currentTextField () {
      this.toggleShowUpdateTextField(true)
      if (this.currentTextField) {
        this.currentTextFieldId = this.currentTextField.id
      } else {
        this.currentTextFieldId = null
      }
    },
    currentOptionField () {
      this.toggleShowUpdateOptionField(true)
      if (this.currentOptionField) {
        this.currentOptionFieldId = this.currentOptionField.id
      } else {
        this.currentOptionFieldId = null
      }
    }
  }
}
</script>
