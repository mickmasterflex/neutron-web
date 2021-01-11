<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>
      Field Configuration
      <span class="text-lg text-gray-700 block">Current Field: {{label}}</span>
    </template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal">
          <v-text-field v-model="label" field_id="label" field_label="Label" rules="required"></v-text-field>
          <text-field v-model="mapping" field_id="mapping" field_label="Mapping"></text-field>
          <div class="field-group">
            <label class="field-label">Pass to Client</label>
            <check-switch v-model="deliver" field_id="deliver"></check-switch>
          </div>
        </form>
      </validation-observer>
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
      showModal: 'getShowUpdateTextFieldModal'
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
      update: 'updateTextField'
    }),
    ...mapMutations({
      resetCurrentField: 'RESET_CURRENT_FIELD',
      closeModal: 'CLOSE_UPDATE_TEXT_FIELD_MODAL'
    }),
    close () {
      this.closeModal()
      this.label = ''
      this.mapping = ''
      this.deliver = ''
      this.resetCurrentField()
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update({
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
  }
}
</script>
