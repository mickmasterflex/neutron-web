<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Update Base Field</template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal">
          <v-text-field v-model="label" rules="required" field_id="label" field_label="Label"></v-text-field>
          <v-text-field v-model="name" rules="required" field_id="name" field_label="Name"></v-text-field>
          <textarea-field v-model="description" field_id="description" field_label="Description"></textarea-field>
          <v-select-field v-model="type" :options="formatListForSelectOptions(typeOptions)" rules="required" field_id="type" field_label="Type"></v-select-field>
        </form>
      </validation-observer>
      <div v-if="optionFieldSelected" class="border-t mt-6">
        <field-options></field-options>
      </div>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-green btn-lg" :disabled="loading" v-if="unsavedChanges">
        <font-awesome-icon v-if="loading" icon="spinner" pulse></font-awesome-icon> Update Field
      </button>
    </template>
  </modal-template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { checkUnsavedChangesInModal } from '@/mixins/check-unsaved-changes-in-modal'
import { setResponseErrors } from '@/mixins/set-response-errors'
import formatList from '@/mixins/format-list-for-select-options'

export default {
  data () {
    return {
      name: '',
      label: '',
      description: '',
      type: '',
      id: null
    }
  },
  props: {
    show: Boolean,
    field: Object
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
      showModal: 'getShowUpdateBaseFieldModal',
      baseTextFieldTypes: 'getBaseTextFieldTypes',
      baseBooleanFieldTypes: 'getBaseBooleanFieldTypes',
      baseOptionFieldTypes: 'getBaseOptionFieldTypes',
      loading: 'getBaseFieldsPutLoading'
    }),
    unsavedChanges () {
      if (this.field) {
        return this.name !== this.field.name ||
          this.label !== this.field.label ||
          this.description !== this.field.description ||
          this.type !== this.field.type
      } else {
        return false
      }
    },
    fieldType () {
      return this.field ? this.field.type : ''
    },
    booleanFieldSelected () {
      return this.baseBooleanFieldTypes.includes(this.fieldType)
    },
    optionFieldSelected () {
      return this.baseOptionFieldTypes.includes(this.fieldType)
    },
    textFieldSelected () {
      return this.baseTextFieldTypes.includes(this.fieldType)
    },
    typeOptions () {
      if (this.booleanFieldSelected) {
        return this.baseBooleanFieldTypes
      } else if (this.textFieldSelected) {
        return this.baseTextFieldTypes
      } else if (this.optionFieldSelected) {
        return this.baseOptionFieldTypes
      }
      return []
    }
  },
  watch: {
    unsavedChanges () {
      this.checkUnsavedChanges(this.showModal, this.unsavedChanges)
    }
  },
  mixins: [
    enterKeyListener,
    setResponseErrors,
    checkUnsavedChangesInModal,
    formatList
  ],
  methods: {
    ...mapActions({
      updateBaseTextField: 'updateBaseTextField',
      updateBaseOptionField: 'updateBaseOptionField',
      updateBaseBooleanField: 'updateBaseBooleanField'
    }),
    ...mapMutations({
      resetCurrentBaseField: 'RESET_CURRENT_BASE_FIELD',
      closeModal: 'CLOSE_UPDATE_BASE_FIELD_MODAL',
      toggleChangesInModalUnsaved: 'TOGGLE_CHANGES_IN_MODAL_UNSAVED'
    }),
    async updateField (data) {
      if (this.optionFieldSelected) {
        await this.updateBaseOptionField(data)
      } else if (this.textFieldSelected) {
        await this.updateBaseTextField(data)
      } else if (this.booleanFieldSelected) {
        await this.updateBaseBooleanField(data)
      }
    },
    close () {
      this.resetCurrentBaseField()
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
      this.toggleChangesInModalUnsaved(false)
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
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
