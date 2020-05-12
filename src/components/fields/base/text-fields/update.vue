<template>
  <modal-template :show="show" @close="close">
    <template v-slot:header>Update Base Text Field</template>
    <template v-slot:body>
      <validation-observer v-slot="{ handleSubmit }" ref="form">
        <form @submit.prevent="handleSubmit(submitForm)">
          <v-text-field v-model="field_name" rules="required" field_id="updateBaseTextFieldName" field_label="Name" class="field-group"></v-text-field>
          <v-text-field v-model="field_label" rules="required" field_id="updateBaseTextFieldLabel" field_label="Label" class="field-group"></v-text-field>
          <text-field v-model="field_desc" field_id="updateBaseTextFieldDesc" field_label="Description" class="field-group"></text-field>
          <v-select-field v-model="field_type" :options="options" rules="required" field_id="updateBaseTextFieldType" field_label="Type" class="field-group"></v-select-field>
          <button type="submit" class="btn btn-green mt-5">Update Field</button>
        </form>
      </validation-observer>
    </template>
  </modal-template>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      field_name: '',
      field_label: '',
      field_desc: '',
      field_type: '',
      field_id: null,
      options: {
        text: { name: 'text', id: 'text' },
        textarea: { name: 'textarea', id: 'textarea' }
      }
    }
  },
  props: {
    show: Boolean,
    field: Object
  },
  watch: {
    field: function () {
      this.field_name = this.field.name
      this.field_label = this.field.label
      this.field_desc = this.field.description
      this.field_type = this.field.type
      this.field_id = this.field.id
    }
  },
  methods: {
    ...mapActions({ update: 'updateBaseTextField' }),
    ...mapMutations({ reset_current_field: 'RESET_CURRENT_BASE_TEXT_FIELD' }),
    close () {
      this.reset_current_field()
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.$emit('close')
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
