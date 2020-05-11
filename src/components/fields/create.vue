<template>
  <validation-observer v-slot="{ handleSubmit }" ref="form">
    <form @submit.prevent="handleSubmit(submitForm)">
    <v-text-field v-model="label" rules="required" field_label="Label" field_id="createFieldLabel" class="field-group"></v-text-field>
    <text-field v-model="mapping" field_label="Mapping" field_id="createFieldMapping" class="field-group"></text-field>
    <checkbox-single v-model="deliver" field_label="Deliver" field_id="createFieldDeliver" class="field-group"></checkbox-single>
<!--    <v-select-field v-model="base_field" rules="required" field_label="Base Field" :options="options"></v-select-field>-->
    <button type="submit">Add Field</button>
    </form>
  </validation-observer>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      label: '',
      mapping: '',
      deliver: '',
      base_field: 55
    }
  },
  props: {
    form: Number
  },
  methods: {
    ...mapActions({ createTextField: 'createTextField' }),
    submitForm () {
      this.createTextField({
        label: this.label,
        mapping: this.mapping,
        deliver: this.deliver,
        form: this.form,
        base_field: this.base_field
      })
    }
  }
}
</script>
