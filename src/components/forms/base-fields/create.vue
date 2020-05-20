<template>
  <modal-template :show="show" @close="close">
    <template v-slot:header>Create Field</template>
    <template v-slot:body>
      <validation-observer v-slot="{ handleSubmit }" ref="form">
        <form @submit.prevent="handleSubmit(submitForm)">
          <v-text-field v-model="name" rules="required" field_id="createBaseTextFieldName" field_label="Name" class="field-group"></v-text-field>
          <v-text-field v-model="label" rules="required" field_id="createBaseTextFieldLabel" field_label="Label" class="field-group"></v-text-field>
          <text-field v-model="desc" field_id="createBaseTextFieldDesc" field_label="Description" class="field-group"></text-field>
          <v-select-field v-model="type" :options="options" rules="required" field_id="createBaseTextFieldType" field_label="Type" class="field-group"></v-select-field>
          <button type="submit" class="btn btn-green mt-5">
            <span v-if="optionFieldSelected">Create then add Options</span>
            <span v-else>Create Field</span>
          </button>
        </form>
      </validation-observer>
    </template>
  </modal-template>
</template>

<script>
import { mapActions } from 'vuex'
import { enterKeyListener } from '@/mixins/enterKeyListener'

export default {
  data () {
    return {
      name: '',
      label: '',
      desc: '',
      type: '',
      options: {
        text: { name: 'text', id: 'text' },
        textarea: { name: 'textarea', id: 'textarea' },
        select: { name: 'select', id: 'select' },
        radio: { name: 'radio', id: 'radio' }
      }
    }
  },
  props: {
    show: Boolean
  },
  computed: {
    optionFieldSelected () {
      return this.type === 'select' || this.type === 'radio'
    },
    textFieldSelected () {
      return this.type === 'text' || this.type === 'textarea'
    }
  },
  mixins: [enterKeyListener],
  methods: {
    ...mapActions({
      createBaseOptionField: 'createBaseOptionField',
      createBaseTextField: 'createBaseTextField'
    }),
    close () {
      this.name = ''
      this.label = ''
      this.desc = ''
      this.type = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.$emit('close')
    },
    enterKeyAction () {
      this.submitForm()
    },
    submitForm () {
      if (this.optionFieldSelected) {
        this.createBaseOptionField({
          name: this.name,
          label: this.label,
          description: this.desc,
          type: this.type
        })
      } else if (this.textFieldSelected) {
        this.createBaseTextField({
          name: this.name,
          label: this.label,
          description: this.desc,
          type: this.type
        })
      }
      this.close()
    }
  }
}
</script>
