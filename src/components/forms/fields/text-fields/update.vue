<template>
  <div class="card card-base mb-1">
    <h3 class="h3">Field Configuration</h3>
    <validation-observer ref="form">
      <form @submit.prevent="submitForm" class="well well-light fields-inline">
        <v-text-field v-model="label" field_id="updateTextFieldLabel" field_label="Label" rules="required" class="field-group"></v-text-field>
        <text-field v-model="mapping" field_id="updateTextFieldMapping" field_label="Mapping" class="field-group"></text-field>
        <checkbox-single v-model="deliver" field_id="updateTextFieldDeliver" field_label="Pass to Client"></checkbox-single>
      </form>
    </validation-observer>
    <div class="card-actions">
      <span class="btn btn-hollow-default" @click="resetCurrentField">Close</span>
      <button @click="submitForm" class="btn btn-green">Update Field</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
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
      update: 'updateTextField'
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
          this.update({
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
  }
}
</script>
