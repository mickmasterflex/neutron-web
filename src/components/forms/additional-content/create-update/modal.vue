<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header><span class="capitalize">{{ modalPurpose }}</span> Content</template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal">
          <v-select-field
            v-model="contentType"
            rules="required"
            field_id="additional_content_type"
            field_label="Type"
            :options="formatListForSelectOptions(contentTypes)"
            :field_disabled="loading"/>
          <v-textarea-field
            v-model="contentBlock"
            field_id="additional_content_block"
            field_label="Content"
            rules="required"
            :field_disabled="loading"/>
          <div class="field-group ml-label-width">
            <checkbox-field
              @click="leadIdToggle = !leadIdToggle"
              :value="leadIdToggle"
              v-if="contentType === 'tcpa'"
              label="Leadid Toggle"
              field_id="leadid_toggle"
              :style-as-field="true"
              :disabled="loading"/>
          </div>
          <v-select-field
            v-if="leadIdToggle"
            v-model="leadIdToggleFieldName"
            field_id="leadid_toggle_field_name"
            field_label="Leadid Field"
            :rules="leadIdToggle ? 'required' : ''"
            :options="injectedFieldOptions"
            :field_disabled="loading"/>
          <div class="field-group ml-label-width">
            <checkbox-field
              :value="doubleOptin"
              @click="doubleOptin = !doubleOptin"
              label="Double Opt-in"
              field_id="double_optin"
              :style-as-field="true"
              :disabled="loading"/>
          </div>
          <v-select-field
            v-if="doubleOptin"
            v-model="doubleOptinFieldName"
            :rules="doubleOptin ? 'required' : ''"
            field_id="leadid_toggle_field_name"
            field_label="Double Optin Field"
            :options="booleanFieldOptions"
            :field_disabled="loading"/>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-lg btn-green" :disabled="loading">
        <font-awesome-icon v-if="loading" icon="spinner" pulse></font-awesome-icon> <span class="capitalize">{{ modalPurpose }}</span> Content
      </button>
    </template>
  </modal-template>
</template>

<script>
import formatList from '@/mixins/format-list-for-select-options'
import { setResponseErrors } from '@/mixins/set-response-errors'
import { mapGetters, mapMutations } from 'vuex'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { checkUnsavedChangesInModal } from '@/mixins/check-unsaved-changes-in-modal'

export default {
  mixins: [formatList, enterKeyListener, setResponseErrors, checkUnsavedChangesInModal],
  data () {
    return {
      contentType: 'tcpa',
      contentBlock: '',
      leadIdToggle: false,
      leadIdToggleFieldName: '',
      doubleOptin: false,
      doubleOptinFieldName: ''
    }
  },
  props: {
    loading: {
      type: Boolean,
      required: true
    },
    submitAction: {
      type: Function,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      contentTypes: 'getAdditionalFormContentTypes',
      currentForm: 'getCurrentForm',
      showModal: 'getShowAdditionalFormContentModal',
      currentAdditionalFormContent: 'getCurrentAdditionalFormContent',
      modalPurpose: 'getAdditionalFormContentModalPurpose',
      form: 'getCurrentForm',
      ancestorFormsWithInjected: 'getAncestorFormsWithInjectedFields',
      ancestorFormsWithFields: 'getAncestorFormsWithFields',
      booleanFieldTypes: 'getBaseBooleanFieldTypes'
    }),
    injectedFieldOptions () {
      let fields = this.form ? this.form.injected_fields : []
      if (this.ancestorFormsWithInjected.length > 0) {
        const ancestorFields = this.ancestorFormsWithInjected.map(ancestor => ancestor.injected_fields)
        fields = fields.concat(ancestorFields[0])
      }
      fields = fields.map(field => {
        return { id: field.field_key, name: field.field_key }
      })
      return fields
    },
    booleanFieldOptions () {
      let fields = this.form ? this.form.fields : []
      if (this.ancestorFormsWithFields.length > 0) {
        const ancestorFields = this.ancestorFormsWithFields.map(ancestor => ancestor.fields)
        fields = fields.concat(ancestorFields[0])
      }
      fields = fields.filter(field => this.booleanFieldTypes.includes(field.type))
      fields = fields.map(field => {
        return { id: field.label, name: field.label }
      })
      return fields
    },
    submitData () {
      const data = {
        additional_content_type: this.contentType,
        additional_content_block: this.contentBlock,
        form: this.currentForm.id
      }
      if (this.contentType === 'tcpa') {
        data.double_optin = this.doubleOptin
        data.double_optin_field_name = this.doubleOptinFieldName
        data.leadid_toggle = this.leadIdToggle
        data.leadid_toggle_field_name = this.leadIdToggleFieldName
      }
      if (this.currentAdditionalFormContent.id) {
        data.id = this.currentAdditionalFormContent.id
      }
      return data
    },
    unsavedChanges () {
      if (this.currentAdditionalFormContent.id) {
        return this.contentType !== this.currentAdditionalFormContent.additional_content_type ||
          this.contentBlock !== this.currentAdditionalFormContent.additional_content_block ||
          this.leadIdToggle !== this.currentAdditionalFormContent.leadid_toggle ||
          this.leadIdToggleFieldName !== this.currentAdditionalFormContent.leadid_toggle_field_name ||
          this.doubleOptin !== this.currentAdditionalFormContent.double_optin ||
          this.doubleOptinFieldName !== this.currentAdditionalFormContent.double_optin_field_name
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
  methods: {
    ...mapMutations({
      resetCurrent: 'RESET_CURRENT_ADDITIONAL_FORM_CONTENT',
      closeModal: 'CLOSE_ADDITIONAL_FORM_CONTENT_MODAL'
    }),
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.submitAction(this.submitData).then(() => {
            this.close()
          }).catch(error => {
            this.error = error
          })
        }
      })
    },
    resetData () {
      this.contentType = 'tcpa'
      this.contentBlock = ''
      this.leadIdToggle = false
      this.leadIdToggleFieldName = ''
      this.doubleOptin = false
      this.doubleOptinFieldName = ''
    },
    close () {
      this.closeModal()
      this.resetData()
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      if (this.currentAdditionalFormContent) {
        this.resetCurrent()
      }
      this.toggleChangesInModalUnsaved(false)
    }
  },
  updated () {
    if (this.currentAdditionalFormContent.id) {
      this.contentType = this.currentAdditionalFormContent.additional_content_type
      this.contentBlock = this.currentAdditionalFormContent.additional_content_block
      this.leadIdToggle = this.currentAdditionalFormContent.leadid_toggle
      this.leadIdToggleFieldName = this.currentAdditionalFormContent.leadid_toggle_field_name
      this.doubleOptin = this.currentAdditionalFormContent.double_optin
      this.doubleOptinFieldName = this.currentAdditionalFormContent.double_optin_field_name
    }
  }
}
</script>
