<template>
  <div>
    <button class="btn btn-turquoise" @click="toggleShowCreateForm(true)" v-show="!showCreateForm">
      <font-awesome-icon icon="plus"></font-awesome-icon> Add Field
    </button>
    <validation-observer v-slot="{ handleSubmit }" ref="form" v-show="showCreateForm">
      <form @submit.prevent="handleSubmit(submitForm)">
        <v-select-field rules="required" v-model="baseField" field_label="Choose Base Field" :options="baseFields"></v-select-field>
        <div class="mt-3">
          <button type="submit" class="btn btn-green">Select Field</button>
          <span class="btn btn-hollow-default" @click="toggleShowCreateForm(false)">Cancel</span>
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      baseField: Object
    }
  },
  computed: {
    ...mapGetters({
      baseFields: 'getBaseFields',
      showCreateForm: 'getShowCreateField',
      form: 'getCurrentForm'
    }),
    selectedBaseField () {
      return this.baseFields.find(({ id }) => id === parseInt(this.baseField))
    },
    optionFieldSelected () {
      return this.selectedBaseField.type === 'select' || this.selectedBaseField.type === 'radio'
    },
    textFieldSelected () {
      return this.selectedBaseField.type === 'text' || this.selectedBaseField.type === 'textarea'
    },
    newFieldOrder () {
      let val = 0
      if (this.form.fields.length) {
        val = this.form.fields.length + 1
      }
      return val
    }
  },
  methods: {
    ...mapActions({
      createTextField: 'createTextField',
      createOptionField: 'createOptionField',
      fetchBaseFields: 'fetchBaseFields'
    }),
    ...mapMutations({
      toggleShowCreateForm: 'TOGGLE_SHOW_CREATE_FIELD'
    }),
    submitForm () {
      if (this.textFieldSelected) {
        this.createTextField({
          form: this.form.id,
          base_field: this.baseField,
          order: this.newFieldOrder
        })
      } else if (this.optionFieldSelected) {
        this.createOptionField({
          form: this.form.id,
          base_field: this.baseField,
          order: this.newFieldOrder
        })
      }
    }
  },
  created () {
    this.fetchBaseFields()
  }
}
</script>
