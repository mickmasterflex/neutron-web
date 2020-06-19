<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create Base Field</template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal">
          <v-text-field v-model="name" rules="required" field_id="createBaseTextFieldName" field_label="Name"></v-text-field>
          <v-text-field v-model="label" rules="required" field_id="createBaseTextFieldLabel" field_label="Label"></v-text-field>
          <textarea-field v-model="description" field_id="createBaseTextFieldDesc" field_label="Description"></textarea-field>
          <v-select-field v-model="type" :options="options" rules="required" field_id="createBaseTextFieldType" field_label="Type"></v-select-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-lg btn-green">
        <span v-if="optionFieldSelected">Create then add Options</span>
        <span v-else>Create Field</span>
      </button>
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
      options: {
        text: { name: 'text', id: 'text' },
        textarea: { name: 'textarea', id: 'textarea' },
        select: { name: 'select', id: 'select' },
        radio: { name: 'radio', id: 'radio' }
      }
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowCreateBaseFieldModal'
    }),
    optionFieldSelected () {
      return this.type === 'select' || this.type === 'radio'
    },
    textFieldSelected () {
      return this.type === 'text' || this.type === 'textarea'
    }
  },
  mixins: [enterKeyListener],
  methods: {
    ...mapActions({
      createBaseOptionField: 'createBaseOptionField',
      createBaseTextField: 'createBaseTextField'
    }),
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_BASE_FIELD_MODAL'
    }),
    close () {
      this.name = ''
      this.label = ''
      this.description = ''
      this.type = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
    },
    enterKeyAction () {
      if (this.showModal) {
        this.submitForm()
      }
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          if (this.optionFieldSelected) {
            this.createBaseOptionField({
              name: this.name,
              label: this.label,
              description: this.description,
              type: this.type
            }).then(() => { this.close() })
          } else if (this.textFieldSelected) {
            this.createBaseTextField({
              name: this.name,
              label: this.label,
              description: this.description,
              type: this.type
            }).then(() => { this.close() })
          }
        }
      })
    }
  }
}
</script>
