<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Update Base Option Field</template>
    <template v-slot:body>
      <validation-observer ref="form" class="form-horizontal">
        <form @submit.prevent="submitForm">
          <v-text-field v-model="name" rules="required" field_id="updateBaseOptionFieldName" field_label="Name"></v-text-field>
          <v-text-field v-model="label" rules="required" field_id="updateBaseOptionFieldLabel" field_label="Label"></v-text-field>
          <text-field v-model="description" field_id="updateBaseOptionFieldDesc" field_label="Description"></text-field>
          <v-select-field v-model="type" :options="typeOptions" rules="required" field_id="updateBaseOptionFieldType" field_label="Type"></v-select-field>
        </form>
        <div class="field-group">
          <label class="field-label">Options</label>
          <field-options></field-options>
        </div>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button class="btn btn-green btn-lg" @click="submitForm">Save All Changes</button>
    </template>
  </modal-template>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import fieldOptions from '@/components/forms/base-fields/option-fields/options/list'
import { enterKeyListener } from '@/mixins/enterKeyListener'
import { checkUnsavedChangesInModal } from '@/mixins/checkUnsavedChangesInModal'

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
    'field-options': fieldOptions
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
      showModal: 'getShowUpdateBaseOptionFieldModal'
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
  mixins: [enterKeyListener, checkUnsavedChangesInModal],
  methods: {
    ...mapActions({
      updateField: 'updateBaseOptionField',
      updateOptions: 'updateModifiedBaseOptions'
    }),
    ...mapMutations({
      resetCurrentBaseOptionField: 'RESET_CURRENT_BASE_OPTION_FIELD',
      resetCurrentBaseOptions: 'RESET_CURRENT_BASE_OPTIONS',
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
        }
      })
    }
  }
}
</script>
