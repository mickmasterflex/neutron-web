<template>
  <modal-template :show="show" @close="close">
    <template v-slot:header>Update Base Option Field</template>
    <template v-slot:body>
      <validation-observer v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitForm)">
          <v-text-field v-model="field_name" rules="required" field_id="formFieldName" field_label="Name" class="field-group"></v-text-field>
          <v-text-field v-model="field_label" rules="required" field_id="formFieldLabel" field_label="Label" class="field-group"></v-text-field>
          <v-text-field v-model="field_desc" rules="required" field_id="formFieldDesc" field_label="Description" class="field-group"></v-text-field>
          <v-select-field v-model="field_type" :options="options" rules="required" field_id="formFieldType" field_label="Type" class="field-group"></v-select-field>
          <button type="submit" class="btn btn-green mt-5">Update Field</button>
        </form>
      </validation-observer>
      <field-options :options="field.base_options"></field-options>
    </template>
  </modal-template>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import fieldOptions from '@/components/fields/base/options/index'

export default {
  data () {
    return {
      field_name: '',
      field_label: '',
      field_desc: '',
      field_type: '',
      field_id: null,
      options: {
        text: { name: 'select', id: 'select' },
        textarea: { name: 'radio', id: 'radio' }
      }
    }
  },
  props: {
    show: Boolean,
    field: Object
  },
  components: {
    'field-options': fieldOptions
  },
  watch: {
    field: function () {
      this.field_name = this.field.name
      this.field_label = this.field.label
      this.field_desc = this.field.description
      this.field_type = this.field.type
      this.field_id = this.field.id
      console.log(this.field.type)
    }
  },
  methods: {
    ...mapActions({ update: 'updateBaseOptionField' }),
    ...mapMutations({ reset_current_field: 'RESET_CURRENT_BASE_OPTION_FIELD' }),
    close () {
      this.$emit('close')
      this.reset_current_field()
    },
    submitForm () {
      this.update({
        name: this.field_name,
        label: this.field_label,
        description: this.field_desc,
        type: this.field_type,
        id: this.field_id
      })
      this.close()
    }
  }
}
</script>
