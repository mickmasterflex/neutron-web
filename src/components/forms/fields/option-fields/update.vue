<template>
  <modal-template :show="showModal" @close="close" modalClass="modal-md">
    <template v-slot:header>
      Field Configuration
      <span class="text-lg text-gray-700 block">Current Field: {{label}}</span>
    </template>
    <template v-slot:body>
      <div class="form-horizontal">
        <validation-observer ref="form">
          <form @submit.prevent="submitForm">
            <v-text-field v-model="label" field_id="label" field_label="Label" rules="required"></v-text-field>
            <text-field v-model="mapping" field_id="mapping" field_label="Mapping"></text-field>
            <checkbox-single v-model="deliver" field_id="deliver" field_label="Pass to Client"></checkbox-single>
          </form>
        </validation-observer>

        <div class="field-group">
          <label class="field-label">Options</label>
          <field-options class="flex-grow"></field-options>
        </div>

        <div class="field-group">
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
import fieldOptions from '@/components/forms/fields/option-fields/options/list'
import fieldInactiveOptions from '@/components/forms/fields/option-fields/options/inactive_list'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { setResponseErrors } from '@/mixins/set-response-errors'
import { checkUnsavedChangesInModal } from '@/mixins/check-unsaved-changes-in-modal'

export default {
  data () {
    return {
      label: '',
      mapping: '',
      deliver: ''
    }
  },
  props: {
    field: {
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowUpdateOptionFieldModal',
      unsavedOptionChangesInModal: 'getUnsavedOptionChangesInModal'
    }),
    unsavedChanges () {
      if (this.field) {
        return this.unsavedOptionChangesInModal || this.label !== this.field.label || this.mapping !== this.field.mapping || this.deliver !== this.field.deliver
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
  mixins: [enterKeyListener, setResponseErrors, checkUnsavedChangesInModal],
  updated () {
    if (this.field) {
      this.label = this.field.label
      this.mapping = this.field.mapping
      this.deliver = this.field.deliver
    }
  },
  methods: {
    ...mapActions({
      updateField: 'updateOptionField',
      updateOptions: 'updateModifiedOptions'
    }),
    ...mapMutations({
      resetCurrentField: 'RESET_CURRENT_FIELD',
      closeModal: 'CLOSE_UPDATE_OPTION_FIELD_MODAL',
      resetUnsavedOptionChanges: 'RESET_UNSAVED_OPTION_CHANGES',
      toggleChangesInModalUnsaved: 'TOGGLE_CHANGES_IN_MODAL_UNSAVED',
      resetCurrentOptions: 'RESET_CURRENT_OPTIONS',
      resetModifiedOptions: 'RESET_MODIFIED_OPTIONS',
      resetInactiveOptions: 'RESET_INACTIVE_OPTIONS'
    }),
    enterKeyAction () {
      if (this.field) {
        this.submitForm()
      }
    },
    close () {
      this.closeModal()
      this.resetCurrentField()
      this.resetCurrentOptions()
      this.resetModifiedOptions()
      this.resetInactiveOptions()
      this.resetUnsavedOptionChanges()
      this.toggleChangesInModalUnsaved(false)
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.updateOptions()
          this.updateField({
            label: this.label,
            mapping: this.mapping,
            deliver: this.deliver,
            form: this.field.form,
            base_field: this.field.base_field,
            id: this.field.id
          }).then(() => {
            this.closeModal()
            this.resetCurrentField()
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
