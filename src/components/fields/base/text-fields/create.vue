<template>
  <modal-template :show="show" @close="close">
    <template v-slot:header>Create Base Text Field</template>
    <template v-slot:body>
      <validation-observer v-slot="{ handleSubmit }" ref="form">
        <form @submit.prevent="handleSubmit(submitForm)">
          <v-text-field v-model="field_name" rules="required" field_id="formFieldName" field_label="Name" class="field-group"></v-text-field>
          <v-text-field v-model="field_label" rules="required" field_id="formFieldLabel" field_label="Label" class="field-group"></v-text-field>
          <text-field v-model="field_desc" field_id="formFieldDesc" field_label="Description" class="field-group"></text-field>
          <v-select-field v-model="field_type" :options="options" rules="required" field_id="formFieldType" field_label="Type" class="field-group"></v-select-field>
          <button type="submit" class="btn btn-green mt-5">Create</button>
        </form>
      </validation-observer>
    </template>
  </modal-template>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      field_name: '',
      field_label: '',
      field_desc: '',
      field_type: '',
      options: {
        text: { name: 'text', id: 'text' },
        textarea: { name: 'textarea', id: 'textarea' }
      }
    }
  },
  props: {
    show: Boolean
  },
  methods: {
    ...mapActions({ create: 'createBaseTextField' }),
    close () {
      this.field_name = ''
      this.field_label = ''
      this.field_desc = ''
      this.field_type = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.$emit('close')
    },
    submitForm () {
      this.create({
        name: this.field_name,
        label: this.field_label,
        description: this.field_desc,
        type: this.field_type
      })
      this.close()
    }
  }
}
</script>
