<template>
  <tooltip-dialog-template button-color="turquoise" :show="formVisible" @close="closeForm" @open="showForm">
    <template v-slot:button-text>
      <font-awesome-icon icon="plus"></font-awesome-icon>
      Add Field
    </template>
    <template v-slot:header>
      Clone a Base Field
    </template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm">
          <v-select-field
            :loading="baseFieldsLoading"
            rules="required"
            v-model="baseField"
            field_label="Base Field"
            field_id="baseFieldSelectToClone"
            :options="baseFields"></v-select-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-green" :disabled="loading">
        <font-awesome-icon v-if="loading" icon="spinner" pulse></font-awesome-icon> Clone
      </button>
    </template>
  </tooltip-dialog-template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      baseField: '',
      formVisible: false
    }
  },
  computed: {
    ...mapGetters({
      baseFields: 'getAvailableBaseFields',
      form: 'getCurrentForm',
      baseFieldsLoading: 'getBaseFieldsFetchLoading',
      baseBooleanFieldTypes: 'getBaseBooleanFieldTypes',
      baseOptionFieldTypes: 'getBaseOptionFieldTypes',
      baseTextFieldTypes: 'getBaseTextFieldTypes',
      loading: 'getFieldsPostLoading'
    }),
    fields () {
      return this.form.fields
    },
    selectedBaseField () {
      return this.baseFields.find(({ id }) => id === parseInt(this.baseField))
    },
    booleanFieldSelected () {
      return this.baseBooleanFieldTypes.includes(this.selectedBaseField.type)
    },
    optionFieldSelected () {
      return this.baseOptionFieldTypes.includes(this.selectedBaseField.type)
    },
    textFieldSelected () {
      return this.baseTextFieldTypes.includes(this.selectedBaseField.type)
    },
    newFieldOrder () {
      return this.form.fields.length + 1
    }
  },
  methods: {
    async cloneField (data) {
      if (this.optionFieldSelected) {
        await this.cloneOptionField(data)
      } else if (this.textFieldSelected) {
        await this.cloneTextField(data)
      } else if (this.booleanFieldSelected) {
        await this.cloneBooleanField(data)
      }
    },
    ...mapActions({
      cloneTextField: 'createTextField',
      cloneOptionField: 'createOptionField',
      cloneBooleanField: 'createBooleanField',
      fetchBaseFields: 'fetchBaseFields'
    }),
    ...mapMutations({
      setBaseFields: 'SET_BASE_FIELDS',
      setAvailableBaseFields: 'SET_AVAILABLE_BASE_FIELDS'
    }),
    resetForm () {
      this.baseField = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },
    showForm () {
      this.formVisible = true
      this.setAvailableBaseFields(this.fields)
    },
    closeForm () {
      this.formVisible = false
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.cloneField({
            form: this.form.id,
            base_field: this.baseField,
            order: this.newFieldOrder
          }).then(() => {
            this.closeForm()
            this.resetForm()
          })
        }
      })
    }
  },
  watch: {
    fields () {
      this.setAvailableBaseFields(this.fields)
    }
  },
  created () {
    this.fetchBaseFields()
  }
}
</script>
