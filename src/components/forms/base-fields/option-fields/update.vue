<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Update Base Option Field</template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form>
          <v-text-field v-model="name" rules="required" field_id="updateBaseOptionFieldName" field_label="Name" class="field-group"></v-text-field>
          <v-text-field v-model="label" rules="required" field_id="updateBaseOptionFieldLabel" field_label="Label" class="field-group"></v-text-field>
          <text-field v-model="desc" field_id="updateBaseOptionFieldDesc" field_label="Description" class="field-group"></text-field>
          <v-select-field v-model="type" :options="typeOptions" rules="required" field_id="updateBaseOptionFieldType" field_label="Type" class="field-group"></v-select-field>
        </form>
      </validation-observer>
      <field-options class="mt-3"></field-options>
      Add an Option
      <create-option :field="field" :show="showModal"></create-option>
      <button type="submit" class="btn btn-green mt-5" @click="submitForm">Save All Changes</button>
    </template>
  </modal-template>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import fieldOptions from '@/components/forms/base-fields/option-fields/options/list'
import createOption from '@/components/forms/base-fields/option-fields/options/create'
import { enterKeyListener } from '@/mixins/enterKeyListener'

export default {
  data () {
    return {
      name: '',
      label: '',
      desc: '',
      type: '',
      id: null,
      typeOptions: {
        text: { name: 'select', id: 'select' },
        textarea: { name: 'radio', id: 'radio' }
      }
    }
  },
  props: {
    field: Object
  },
  components: {
    'field-options': fieldOptions,
    'create-option': createOption
  },
  watch: {
    field: function () {
      this.name = this.field.name
      this.label = this.field.label
      this.desc = this.field.description
      this.type = this.field.type
      this.id = this.field.id
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowUpdateBaseOptionFieldModal'
    })
  },
  mixins: [enterKeyListener],
  methods: {
    ...mapActions({
      updateField: 'updateBaseOptionField',
      updateOptions: 'updateModifiedBaseOptions'
    }),
    ...mapMutations({
      resetCurrentBaseOptionField: 'RESET_CURRENT_BASE_OPTION_FIELD',
      resetCurrentBaseOptions: 'RESET_CURRENT_BASE_OPTIONS',
      closeModal: 'CLOSE_UPDATE_BASE_OPTION_FIELD_MODAL'
    }),
    enterKeyAction () {
      this.submitForm()
    },
    close () {
      this.resetCurrentBaseOptionField()
      this.resetCurrentBaseOptions()
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
    },
    submitForm () {
      this.$refs.form.validate().then(() => {
        this.updateOptions()
        this.updateField({
          name: this.name,
          label: this.label,
          description: this.desc,
          type: this.type,
          id: this.id
        })
        this.close()
      })
    }
  }
}
</script>
