<template>
  <modal-template :show="showCreateField" @close="close">
    <template v-slot:header>
      Clone a Base Field
    </template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal">
          <v-select-field rules="required" v-model="baseField" field_label="Base Field" field_id="baseFieldSelectToClone" :options="baseFields"></v-select-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-lg btn-green">Clone Field</button>
    </template>
  </modal-template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      baseField: ''
    }
  },
  computed: {
    ...mapGetters({
      baseFields: 'getAvailableBaseFields',
      showCreateField: 'getShowCreateFieldModal',
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
      closeModal: 'CLOSE_CREATE_FIELD_MODAL',
      setBaseFields: 'SET_BASE_FIELDS',
      setAvailableBaseFields: 'SET_AVAILABLE_BASE_FIELDS'
    }),
    close () {
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
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
              this.close()
            })
          } else if (this.optionFieldSelected) {
            this.createOptionField({
              form: this.form.id,
              base_field: this.baseField,
              order: this.newFieldOrder
            }).then(() => {
              this.close()
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
  },
  updated () {
    this.setAvailableBaseFields(this.fields)
  }
}
</script>
