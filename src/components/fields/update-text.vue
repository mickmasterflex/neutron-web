<template>
  <modal-template :show="show" @close="close">
    <template v-slot:header>Update Base Text Field</template>
    <template v-slot:body>
      <validation-observer v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitForm)">
          <v-text-field v-model="formFieldName" rules="required" field_id="formFieldName" field_label="Form Field Name" class="field-group"></v-text-field>
          <v-text-field v-model="formFieldLabel" rules="required" field_id="formFieldLabel" field_label="Form Field Label" class="field-group"></v-text-field>
          <v-text-field v-model="formFieldDesc" rules="required" field_id="formFieldDesc" field_label="Form Field Description" class="field-group"></v-text-field>
          <v-select-field v-model="formFieldType" :options="options" rules="required" field_id="formFieldType" field_label="Form Field Label" class="field-group"></v-select-field>
          <button type="submit" class="btn btn-green mt-5">Submit</button>
        </form>
      </validation-observer>
    </template>
  </modal-template>
</template>

<script>
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
  props: { show: Boolean },
  methods: {
    close () {
      this.title = ''
      this.body = ''
      this.$emit('close')
    },
    submitForm () {
      // Some save logic goes here...

      this.close()
    }
  }
}
</script>
