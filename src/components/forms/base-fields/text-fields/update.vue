<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Update Base Text Field</template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm">
          <v-text-field v-model="name" rules="required" field_id="updateBaseTextFieldName" field_label="Name" class="field-group"></v-text-field>
          <v-text-field v-model="label" rules="required" field_id="updateBaseTextFieldLabel" field_label="Label" class="field-group"></v-text-field>
          <text-field v-model="description" field_id="updateBaseTextFieldDesc" field_label="Description" class="field-group"></text-field>
          <v-select-field v-model="type" :options="typeOptions" rules="required" field_id="updateBaseTextFieldType" field_label="Type" class="field-group"></v-select-field>
          <button type="submit" class="btn btn-green mt-5">Update Field</button>
        </form>
      </validation-observer>
    </template>
  </modal-template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { enterKeyListener } from '@/mixins/enterKeyListener'

export default {
  data () {
    return {
      name: '',
      label: '',
      description: '',
      type: '',
      id: null,
      typeOptions: {
        text: { name: 'text', id: 'text' },
        textarea: { name: 'textarea', id: 'textarea' }
      }
    }
  },
  props: {
    show: Boolean,
    field: Object
  },
  watch: {
    field: function () {
      this.name = this.field.name
      this.label = this.field.label
      this.description = this.field.description
      this.type = this.field.type
      this.id = this.field.id
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowUpdateBaseTextFieldModal'
    })
  },
  mixins: [enterKeyListener],
  methods: {
    ...mapActions({
      update: 'updateBaseTextField'
    }),
    ...mapMutations({
      resetCurrentBaseTextField: 'RESET_CURRENT_BASE_TEXT_FIELD',
      closeModal: 'CLOSE_UPDATE_BASE_TEXT_FIELD_MODAL'
    }),
    enterKeyAction () {
      if (this.showModal) {
        this.submitForm()
      }
    },
    close () {
      this.resetCurrentBaseTextField()
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update({
            name: this.name,
            label: this.label,
            description: this.description,
            type: this.type,
            id: this.id
          }).then(() => { this.close() })
        }
      })
    }
  }
}
</script>
