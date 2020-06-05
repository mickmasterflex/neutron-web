<template>
  <div>
    <button class="btn btn-turquoise" @click="toggleShowCreateField(true)" v-show="!showCreateField">
      <font-awesome-icon icon="plus"></font-awesome-icon> Add Field
    </button>
    <validation-observer v-slot="{ handleSubmit }" v-show="showCreateField">
      <form @submit.prevent="handleSubmit(submitForm)">
        <v-select-field rules="required" v-model="baseField" field_label="Choose Base Field" field_id="baseFieldSelectToClone" :options="baseFields" class="field-group"></v-select-field>
        <div class="mt-3">
          <button type="submit" class="btn btn-green">Select Field</button>
          <span class="btn btn-hollow-default" @click="toggleShowCreateField(false)">Cancel</span>
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
      baseField: ''
    }
  },
  computed: {
    ...mapGetters({
      baseFields: 'getAvailableBaseFields',
      showCreateField: 'getShowCreateField',
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
    }
  },
  methods: {
    ...mapActions({
      createTextField: 'createTextField',
      createOptionField: 'createOptionField',
      fetchBaseFields: 'fetchBaseFields'
    }),
    ...mapMutations({
      toggleShowCreateField: 'TOGGLE_SHOW_CREATE_FIELD',
      setBaseFields: 'SET_BASE_FIELDS',
      setAvailableBaseFields: 'SET_AVAILABLE_BASE_FIELDS'
    }),
    submitForm () {
      if (this.textFieldSelected) {
        this.createTextField({
          form: this.form.id,
          base_field: this.baseField
        })
      } else if (this.optionFieldSelected) {
        this.createOptionField({
          form: this.form.id,
          base_field: this.baseField
        })
      }
    }
  },
  watch: {
    fields: function () {
      this.setBaseFields()
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
