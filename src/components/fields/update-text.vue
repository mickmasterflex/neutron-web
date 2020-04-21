<template>
  <modal :show="show" @close="close">
    <div class="flex flex-row items-center justify-between">
      <h3 class="h2 inline">Update Base Text Field</h3>
      <span class="cursor-pointer text-gray-500 hover:text-red-500 text-xl" @click="close">&times;</span>
    </div>
    <div class="modal-body">
      <validation-observer v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitForm)">
          <v-text-field v-model="formFieldName" rules="required" field_id="formFieldName" field_label="Form Field Name" class="field-group"></v-text-field>
          <v-text-field v-model="formFieldLabel" rules="required" field_id="formFieldLabel" field_label="Form Field Label" class="field-group"></v-text-field>
          <v-text-field v-model="formFieldDesc" rules="required" field_id="formFieldDesc" field_label="Form Field Description" class="field-group"></v-text-field>
          <v-select-field v-model="formFieldType" :options="options" rules="required" field_id="formFieldType" field_label="Form Field Label" class="field-group"></v-select-field>
          <button type="submit" class="btn btn-green mt-5">Submit</button>
        </form>
      </validation-observer>
    </div>
  </modal>
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
  props: ['show'],
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
