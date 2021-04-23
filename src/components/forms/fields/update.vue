<template>
  <modal-template :show="showModal" @close="close" :modalClass="optionFieldSelected ? 'modal-md' : ''">
    <template v-slot:header>
      Field Configurations
      <span class="text-lg text-gray-700 block">Current Field: {{label}}</span>
    </template>
    <template v-slot:body>
      <div class="form-horizontal">
        <validation-observer ref="form">
          <form @submit.prevent="submitForm">
            <v-text-field v-model="label" field_id="label" field_label="Label" rules="required"></v-text-field>
            <text-field v-model="mapping" field_id="mapping" field_label="Mapping"></text-field>
            <div class="field-group">
              <label class="field-label">Pass to Client</label>
              <check-switch v-model="deliver" field_id="deliver"></check-switch>
            </div>
          </form>
        </validation-observer>

        <div class="field-group" v-if="optionFieldSelected">
          <label class="field-label">Options</label>
          <field-options class="flex-grow"></field-options>
        </div>

        <div class="field-group" v-if="optionFieldSelected">
          <label class="field-label">Available Field Options</label>
          <field-inactive-options class="flex-grow"></field-inactive-options>
        </div>
      </div>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm" class="btn btn-green btn-lg">Update Field</button>
    </template>
  </modal-template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { checkUnsavedChangesInModal } from '@/mixins/check-unsaved-changes-in-modal'
import { setResponseErrors } from '@/mixins/set-response-errors'
import fieldOptions from '@/components/forms/fields/options/list'
import fieldInactiveOptions from '@/components/forms/fields/options/inactive_list'

export default {
  data () {
    return {
      label: '',
      mapping: '',
      deliver: '',
      fieldType: null
    }
  },
  props: {
    field: {
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowUpdateFieldModal',
      baseBooleanFieldTypes: 'getBaseBooleanFieldTypes',
      baseOptionFieldTypes: 'getBaseOptionFieldTypes',
      baseTextFieldTypes: 'getBaseTextFieldTypes'
    }),
    booleanFieldSelected () {
      return this.baseBooleanFieldTypes.includes(this.fieldType)
    },
    optionFieldSelected () {
      return this.baseOptionFieldTypes.includes(this.fieldType)
    },
    textFieldSelected () {
      return this.baseTextFieldTypes.includes(this.fieldType)
    },
    unsavedChanges () {
      if (this.field) {
        return this.label !== this.field.label || this.mapping !== this.field.mapping || this.deliver !== this.field.deliver
      } else {
        return false
      }
    }
  },
  watch: {
    unsavedChanges () {
      this.checkUnsavedChanges(this.showModal, this.unsavedChanges)
    }
  },
  mixins: [
    enterKeyListener,
    setResponseErrors,
    checkUnsavedChangesInModal
  ],
  updated () {
    if (this.field) {
      this.label = this.field.label
      this.mapping = this.field.mapping
      this.deliver = this.field.deliver
      this.fieldType = this.field.type
    }
  },
  methods: {
    ...mapActions({
      updateTextField: 'updateTextField',
      updateBooleanField: 'updateBooleanField',
      updateOptionField: 'updateOptionField',
      updateOptions: 'updateModifiedOptions'
    }),
    ...mapMutations({
      resetCurrentField: 'RESET_CURRENT_FIELD',
      resetCurrentOptions: 'RESET_CURRENT_OPTIONS',
      resetModifiedOptions: 'RESET_MODIFIED_OPTIONS',
      resetInactiveOptions: 'RESET_INACTIVE_OPTIONS',
      resetUnsavedOptionChanges: 'RESET_UNSAVED_OPTION_CHANGES',
      toggleChangesInModalUnsaved: 'TOGGLE_CHANGES_IN_MODAL_UNSAVED',
      closeModal: 'CLOSE_UPDATE_TEXT_FIELD_MODAL'
    }),
    async updateField (data) {
      if (this.optionFieldSelected) {
        await this.updateOptions()
        await this.updateOptionField(data)
      } else if (this.textFieldSelected) {
        await this.updateTextField(data)
      } else if (this.booleanFieldSelected) {
        await this.updateBooleanField(data)
      }
    },
    async close () {
      this.closeModal()
      if (this.optionFieldSelected) {
        this.resetCurrentOptions()
        this.resetModifiedOptions()
        this.resetInactiveOptions()
        this.resetUnsavedOptionChanges()
      }
      this.label = ''
      this.mapping = ''
      this.deliver = ''
      this.resetCurrentField()
      this.toggleChangesInModalUnsaved(false)
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.updateField({
            label: this.label,
            mapping: this.mapping,
            deliver: this.deliver,
            form: this.field.form,
            base_field: this.field.base_field,
            id: this.field.id
          }).then(() => {
            this.closeModal()
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  },
  components: {
    'field-options': fieldOptions,
    'field-inactive-options': fieldInactiveOptions
  }
}
</script>
