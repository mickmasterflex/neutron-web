<template>
  <div class="card card-base mb-1">
    <h3 class="h3">Field Configuration</h3>
    <validation-observer ref="form">
      <form @submit.prevent="submitForm" class="well well-light fields-inline">
        <v-text-field v-model="label" field_id="updateOptionFieldLabel" field_label="Label" rules="required"></v-text-field>
        <text-field v-model="mapping" field_id="updateOptionFieldMapping" field_label="Mapping"></text-field>
        <checkbox-single v-model="deliver" field_id="updateOptionFieldDeliver" field_label="Pass to Client"></checkbox-single>
      </form>
    </validation-observer>

    <h3 class="h3 mt-4">Field Options</h3>
    <field-options></field-options>

    <h3 class="h3 mt-4">Available Field Options</h3>
    <field-inactive-options></field-inactive-options>

    <div class="card-actions">
      <span class="btn btn-hollow-default" @click="resetCurrentField">Cancel</span>
      <button @click="submitForm" class="btn btn-green">Update Field</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import fieldOptions from '@/components/forms/fields/option-fields/options/list'
import fieldInactiveOptions from '@/components/forms/fields/option-fields/options/inactive_list'
import { enterKeyListener } from '@/mixins/enterKeyListener'

export default {
  data () {
    return {
      label: this.field.label,
      mapping: this.field.mapping,
      deliver: this.field.deliver
    }
  },
  props: {
    field: Object,
    form: Number
  },
  watch: {
    field: function () {
      this.label = this.field.label
      this.mapping = this.field.mapping
      this.deliver = this.field.deliver
    }
  },
  mixins: [enterKeyListener],
  methods: {
    ...mapActions({
      updateField: 'updateOptionField',
      updateOptions: 'updateModifiedOptions'
    }),
    ...mapMutations({
      resetCurrentField: 'RESET_CURRENT_FIELD'
    }),
    enterKeyAction () {
      if (this.field) {
        this.submitForm()
      }
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.updateOptions()
          this.updateField({
            label: this.label,
            mapping: this.mapping,
            deliver: this.deliver,
            form: this.form,
            base_field: this.field.base_field,
            id: this.field.id
          }).then(this.resetCurrentField())
        }
      })
    }
  },
  components: {
    'field-options': fieldOptions,
    'field-inactive-options': fieldInactiveOptions
  }
}
</script>
