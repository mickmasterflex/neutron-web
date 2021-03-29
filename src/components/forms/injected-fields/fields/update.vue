<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>
      Update Injected Field
    </template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal">
          <v-select-field v-model="type" rules="required" field_id="field_type" field_label="Type" :options="fieldTypes"></v-select-field>
          <v-text-field v-model="key" field_id="field_key" field_label="Key" rules="required"></v-text-field>
          <v-text-field v-model="value" field_id="field_value" field_label="Value" rules="required"></v-text-field>
          <v-text-field v-model="params" field_id="posting_params" field_label="Posting Params" rules="required"></v-text-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm" class="btn btn-green btn-lg">Update</button>
    </template>
  </modal-template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { checkUnsavedChangesInModal } from '@/mixins/check-unsaved-changes-in-modal'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { setResponseErrors } from '@/mixins/set-response-errors'

export default {
  data () {
    return {
      type: '',
      key: '',
      value: '',
      params: ''
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowUpdateInjectedFieldModal',
      injectedField: 'getCurrentInjectedField',
      fieldTypes: 'getInjectedFieldTypes'
    }),
    unsavedChanges () {
      if (this.injectedField) {
        return this.type !== this.injectedField.field_type ||
          this.key !== this.injectedField.field_key ||
          this.value !== this.injectedField.field_value ||
          this.params !== this.injectedField.posting_params
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
  mixins: [checkUnsavedChangesInModal, enterKeyListener, setResponseErrors],
  updated () {
    if (this.injectedField) {
      this.type = this.injectedField.field_type
      this.key = this.injectedField.field_key
      this.value = this.injectedField.field_value
      this.params = this.injectedField.posting_params
    }
  },
  methods: {
    ...mapActions({
      update: 'updateInjectedField'
    }),
    ...mapMutations({
      resetCurrentInjectedField: 'RESET_CURRENT_INJECTED_FIELD',
      closeModal: 'CLOSE_UPDATE_INJECTED_FIELD_MODAL'
    }),
    close () {
      this.closeModal()
      this.type = ''
      this.key = ''
      this.value = ''
      this.params = ''
      this.resetCurrentInjectedField()
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update({
            field_type: this.type,
            field_key: this.key,
            field_value: this.value,
            posting_params: this.params,
            form: this.injectedField.form,
            id: this.injectedField.id
          }).then(() => {
            this.closeModal()
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  }
}
</script>
