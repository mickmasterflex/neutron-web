<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Update Base Option Field</template>
    <template v-slot:body>
      <div class="form-horizontal">
        <validation-observer ref="form">
          <form @submit.prevent="submitForm">
            <v-text-field v-model="name" rules="required" field_id="name" field_label="Name"></v-text-field>
            <v-text-field v-model="label" rules="required" field_id="label" field_label="Label"></v-text-field>
            <textarea-field v-model="description" field_id="description" field_label="Description"></textarea-field>
            <v-select-field v-model="type" :options="typeOptions" rules="required" field_id="type" field_label="Type"></v-select-field>
          </form>
          <div class="field-group" v-if="fieldOptions.length">
            <label class="field-label">Options</label>
            <field-options></field-options>
          </div>
        </validation-observer>
        <div class="field-group">
          <label class="field-label">Create Option</label>
          <create-option></create-option>
        </div>
      </div>
    </template>
    <template v-slot:footer-additional>
      <button class="btn btn-green btn-lg" @click="submitForm">Save All Changes</button>
    </template>
  </modal-template>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import fieldOptions from '@/components/forms/base-fields/option-fields/options/list'
import createOption from '@/components/forms/base-fields/option-fields/options/create'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { checkUnsavedChangesInModal } from '@/mixins/check-unsaved-changes-in-modal'
import { setResponseErrors } from '@/mixins/set-response-errors'

export default {
  data () {
    return {
      name: '',
      label: '',
      description: '',
      type: '',
      id: null,
      typeOptions: {
        text: { name: 'select', id: 'select' },
        textarea: { name: 'radio', id: 'radio' }
      }
    }
  },
  props: {
    field: Object
  },
  components: {
    'field-options': fieldOptions,
    'create-option': createOption
  },
  updated () {
    if (this.field) {
      this.name = this.field.name
      this.label = this.field.label
      this.description = this.field.description
      this.type = this.field.type
      this.id = this.field.id
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowUpdateBaseOptionFieldModal',
      unsavedOptionChanges: 'getUnsavedBaseOptionChangesInModal',
      fieldOptions: 'getCurrentBaseOptions'
    }),
    unsavedChanges () {
      if (this.field) {
        return this.unsavedOptionChanges || this.name !== this.field.name || this.label !== this.field.label || this.description !== this.field.description || this.type !== this.field.type
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
  methods: {
    ...mapActions({
      updateField: 'updateBaseOptionField',
      updateOptions: 'updateModifiedBaseOptions'
    }),
    ...mapMutations({
      resetCurrentBaseOptionField: 'RESET_CURRENT_BASE_FIELD',
      resetCurrentBaseOptions: 'RESET_CURRENT_BASE_OPTIONS',
      resetUnsavedBaseOptionChanges: 'RESET_UNSAVED_BASE_OPTION_CHANGES',
      closeModal: 'CLOSE_UPDATE_BASE_OPTION_FIELD_MODAL'
    }),
    enterKeyAction () {
      if (this.showModal) {
        this.submitForm()
      }
    },
    close () {
      this.resetCurrentBaseOptionField()
      this.resetCurrentBaseOptions()
      this.resetUnsavedBaseOptionChanges()
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
      this.toggleChangesInModalUnsaved(false)
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.updateOptions()
          this.updateField({
            name: this.name,
            label: this.label,
            description: this.description,
            type: this.type,
            id: this.id
          }).then(() => { this.close() })
            .catch(error => {
              this.error = error
            })
        }
      })
    }
  }
}
</script>
