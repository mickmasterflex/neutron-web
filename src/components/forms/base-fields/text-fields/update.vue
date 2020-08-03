<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Update Base Text Field</template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal">
          <v-text-field v-model="name" rules="required" field_id="name" field_label="Name"></v-text-field>
          <v-text-field v-model="label" rules="required" field_id="label" field_label="Label"></v-text-field>
          <textarea-field v-model="description" field_id="description" field_label="Description"></textarea-field>
          <v-select-field v-model="type" :options="typeOptions" rules="required" field_id="type" field_label="Type"></v-select-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-green btn-lg">Update Field</button>
    </template>
  </modal-template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { enterKeyListener } from '@/mixins/enterKeyListener'
import { checkUnsavedChangesInModal } from '@/mixins/checkUnsavedChangesInModal'
import { setResponseErrors } from '@/mixins/setResponseErrors'

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
    field () {
      this.name = this.field.name
      this.label = this.field.label
      this.description = this.field.description
      this.type = this.field.type
      this.id = this.field.id
    },
    localField: 'checkUnsavedChanges'
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowUpdateBaseTextFieldModal'
    }),
    localField () {
      return {
        name: this.name,
        label: this.label,
        description: this.description,
        type: this.type
      }
    }
  },
  mixins: [enterKeyListener, setResponseErrors, checkUnsavedChangesInModal],
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
      this.toggleChangesInModalUnsaved(false)
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
            .catch(error => {
              this.error = error
            })
        }
      })
    }
  }
}
</script>
