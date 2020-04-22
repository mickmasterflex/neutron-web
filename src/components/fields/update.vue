<template>
  <div class="modal-container">
    <div class="flex flex-row items-center justify-between">
      <h3 class="h2 inline">Update Base Text Field</h3>
      <span class="cursor-pointer text-gray-500 hover:text-red-500 text-xl" @click="hideModal">&times;</span>
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
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'updateText',
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
    ...mapMutations(['hideModal']),
    ...mapActions({ create: 'updateBaseTextField' }),
    submitForm () {
      // const field = {
      //   name: this.formFieldName,
      //   label: this.formFieldLabel,
      //   description: this.formFieldDesc,
      //   type: this.formFieldType
      // }
      // this.create({ field })
    }
  }
}
</script>
