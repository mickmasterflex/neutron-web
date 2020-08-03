<template>
  <div>
    <button class="btn btn-turquoise" @click="showForm()" v-show="!formVisible"><font-awesome-icon icon="plus"></font-awesome-icon> Add Field</button>
    <div class="flex flex-row items-start" v-show="formVisible">
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal form-horizontal-slim">
          <v-select-field rules="required" field_class="field-tall" v-model="baseField" field_label="Base Field" field_id="baseFieldSelectToClone" :options="baseFields"></v-select-field>
        </form>
      </validation-observer>
      <button @click="submitForm()" class="btn btn-green ml-2"><font-awesome-icon icon="clone"></font-awesome-icon> Clone</button>
    </div>
  </div>
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
      form: 'getCurrentForm'
    }),
    fields () {
      return this.form.fields
    },
    selectedBaseField () {
      return this.baseFields.find(({ id }) => id === parseInt(this.baseField))
    },
    optionFieldSelected () {
      if (this.selectedBaseField) {
        return this.selectedBaseField.type === 'select' || this.selectedBaseField.type === 'radio'
      } else {
        return null
      }
    },
    textFieldSelected () {
      if (this.selectedBaseField) {
        return this.selectedBaseField.type === 'text' || this.selectedBaseField.type === 'textarea'
      } else {
        return null
      }
    },
    newFieldOrder () {
      return this.form.fields.length + 1
    }
  },
  methods: {
    ...mapActions({
      createTextField: 'createTextField',
      createOptionField: 'createOptionField',
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
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          if (this.textFieldSelected) {
            this.createTextField({
              form: this.form.id,
              base_field: this.baseField,
              order: this.newFieldOrder
            }).then(() => {
              this.resetForm()
            })
          } else if (this.optionFieldSelected) {
            this.createOptionField({
              form: this.form.id,
              base_field: this.baseField,
              order: this.newFieldOrder
            }).then(() => {
              this.resetForm()
            })
          }
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
