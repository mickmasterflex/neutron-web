<template>
  <modal-template  :show="showModal" @close="close">
    <template v-slot:header>
      Field Configuration
      <span class="text-lg text-gray-700 block">Current Field: {{label}}</span>
    </template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal">
          <v-text-field v-model="label" field_id="updateTextFieldLabel" field_label="Label" rules="required"></v-text-field>
          <text-field v-model="mapping" field_id="updateTextFieldMapping" field_label="Mapping"></text-field>
          <checkbox-single v-model="deliver" field_id="updateTextFieldDeliver" field_label="Pass to Client"></checkbox-single>
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
import { enterKeyListener } from '@/mixins/enterKeyListener'

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
      showModal: 'getShowUpdateTextFieldModal'
    })
  },
  watch: {
    field: function () {
      this.label = this.field.label
      this.mapping = this.field.mapping
      this.deliver = this.field.deliver
    }
  },
  mixins: [enterKeyListener],
  methods: {
    ...mapActions({
      update: 'updateTextField'
    }),
    ...mapMutations({
      resetCurrentField: 'RESET_CURRENT_FIELD',
      closeModal: 'CLOSE_UPDATE_TEXT_FIELD_MODAL'
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
          })
        }
      })
    }
  }
}
</script>
