<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="formFieldName" rules="required" field_id="formFieldName" field_label="Name" class="field-group"></v-text-field>
      <v-text-field v-model="formFieldLabel" rules="required" field_id="formFieldLabel" field_label="Label" class="field-group"></v-text-field>
      <v-text-field v-model="formFieldDesc" rules="required" field_id="formFieldDesc" field_label="Description" class="field-group"></v-text-field>
      <v-select-field v-model="formFieldType" :options="options" rules="required" field_id="formFieldType" field_label="Type" class="field-group"></v-select-field>
      <button type="submit" class="btn btn-green mt-5">Submit</button>
    </form>
  </validation-observer>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      formFieldName: '',
      formFieldLabel: '',
      formFieldDesc: '',
      formFieldType: '',
      options: {
        text: { name: 'text', id: 'text' },
        textarea: { name: 'textarea', id: 'textarea' }
      }
    }
  },
  methods: {
    ...mapActions({ create: 'createBaseTextField' }),
    submitForm () {
      const field = {
        name: this.formFieldName,
        label: this.formFieldLabel,
        description: this.formFieldDesc,
        type: this.formFieldType
      }
      this.create({ field })
    }
  }
}
</script>
