<template>
  <div>
    <button class="btn btn-green" @click="toggleShowCreateForm(true)" v-show="!showCreateForm">Add Field</button>
    <validation-observer v-slot="{ handleSubmit }" ref="form" v-show="showCreateForm">
      <form @submit.prevent="handleSubmit(submitForm)">
        <v-select-field rules="required" v-model="baseField" field_label="Choose Base Field" :options="baseFields"></v-select-field>
        <button type="submit" class="btn btn-green mt-5">Select Field</button><span class="text-link" @click="toggleShowCreateForm(false)">Close</span>
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
  created () {
    this.fetchBaseFields()
  }
}
</script>
