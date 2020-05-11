<template>
  <validation-observer v-slot="{ handleSubmit }" ref="form">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="field_label" field_id="updateTextFieldLabel" field_label="Label" rules="required" class="field-group"></v-text-field>
      <v-text-field v-model="field_mapping" field_id="updateTextFieldMapping" field_label="Mapping" rules="required" class="field-group"></v-text-field>
      <checkbox-single v-model="field_deliver" field_id="updateTextFieldDeliver" field_label="Deliver"></checkbox-single>
      <button type="submit" class="btn btn-green mt-5">Update Field</button>
      <span @click="resetCurrentTextField" class="text-link">Close</span>
    </form>
  </validation-observer>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      field_label: '',
      field_mapping: '',
      field_deliver: ''
    }
  },
  props: {
    field: Object
  },
  watch: {
    field: function () {
      this.field_label = this.field.label
      this.field_mapping = this.field.mapping
      this.field_deliver = this.field.deliver
    }
  },
  methods: {
    ...mapActions({ update: 'updateTextField' }),
    ...mapMutations({ resetCurrentTextField: 'RESET_CURRENT_TEXT_FIELD' }),
    submitForm () {
      this.update({
        label: this.field_label,
        mapping: this.field_mapping,
        deliver: this.field_deliver,
        form: this.field.form,
        base_field: this.field.base_field,
        id: this.field.id
      })
      this.resetCurrentTextField()
    }
  }
}
</script>
