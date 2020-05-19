<template>
  <modal-template :show="show" @close="close">
    <template v-slot:header>Update Base Option Field</template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form>
          <v-text-field v-model="field_name" rules="required" field_id="updateBaseOptionFieldName" field_label="Name" class="field-group"></v-text-field>
          <v-text-field v-model="field_label" rules="required" field_id="updateBaseOptionFieldLabel" field_label="Label" class="field-group"></v-text-field>
          <text-field v-model="field_desc" field_id="updateBaseOptionFieldDesc" field_label="Description" class="field-group"></text-field>
          <v-select-field v-model="field_type" :options="options" rules="required" field_id="updateBaseOptionFieldType" field_label="Type" class="field-group"></v-select-field>
        </form>
      </validation-observer>
      <field-options :options="field.base_options" :field_id="field_id" class="mt-3"></field-options>
      Add an Option
      <create-option :field="field" :show="show"></create-option>
      <button type="submit" class="btn btn-green mt-5" @click="submitForm">Save All Changes</button>
    </template>
  </modal-template>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import fieldOptions from '@/components/forms/base-fields/option-fields/options/list'
import createOption from '@/components/forms/base-fields/option-fields/options/create'

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
    'field-options': fieldOptions,
    'create-option': createOption
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
  computed: {
    ...mapGetters({
      modified_base_options: 'getModifiedBaseOptions'
    })
  },
  methods: {
    ...mapActions({
      updateField: 'updateBaseOptionField',
      updateOptions: 'updateModifiedBaseOptions'
    }),
    ...mapMutations({
      reset_current_field: 'RESET_CURRENT_BASE_OPTION_FIELD'
    }),
    close () {
      this.reset_current_field()
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.$emit('close')
    },
    submitForm () {
      this.$refs.form.validate().then(() => {
        this.updateOptions()
        this.updateField({
          name: this.field_name,
          label: this.field_label,
          description: this.field_desc,
          type: this.field_type,
          id: this.field_id
        })
        this.close()
      })
    }
  }
}
</script>
