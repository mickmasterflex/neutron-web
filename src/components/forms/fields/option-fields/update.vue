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
            <v-text-field v-model="label" field_id="updateOptionFieldLabel" field_label="Label" rules="required"></v-text-field>
            <text-field v-model="mapping" field_id="updateOptionFieldMapping" field_label="Mapping"></text-field>
            <checkbox-single v-model="deliver" field_id="updateOptionFieldDeliver" field_label="Pass to Client"></checkbox-single>
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
import { enterKeyListener } from '@/mixins/enterKeyListener'
import { setResponseErrors } from '@/mixins/setResponseErrors'
import { checkUnsavedChangesInModal } from '@/mixins/checkUnsavedChangesInModal'

export default {
  data () {
    return {
      label: '',
      mapping: '',
      deliver: ''
    }
  },
  computed: {
    ...mapGetters({
      field: 'getCurrentField',
      showModal: 'getShowUpdateOptionFieldModal'
    }),
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
    },
    field: function () {
      if (this.field) {
        this.label = this.field.label
        this.mapping = this.field.mapping
        this.deliver = this.field.deliver
      }
    }
  },
  mixins: [enterKeyListener, setResponseErrors, checkUnsavedChangesInModal],
  methods: {
    ...mapActions({
      updateField: 'updateOptionField',
      updateOptions: 'updateModifiedOptions'
    }),
    ...mapMutations({
      resetCurrentField: 'RESET_CURRENT_FIELD',
      closeModal: 'CLOSE_UPDATE_OPTION_FIELD_MODAL'
    }),
    enterKeyAction () {
      if (this.field) {
        this.submitForm()
      }
    },
    close () {
      this.label = ''
      this.mapping = ''
      this.deliver = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
      this.resetCurrentField()
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
