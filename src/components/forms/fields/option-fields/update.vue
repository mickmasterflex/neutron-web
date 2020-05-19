<template>
  <div>
    <validation-observer ref="form">
      <form>
        <v-text-field v-model="label" field_id="updateOptionFieldLabel" field_label="Label" rules="required" class="field-group"></v-text-field>
        <text-field v-model="mapping" field_id="updateOptionFieldMapping" field_label="Mapping" class="field-group"></text-field>
        <checkbox-single v-model="deliver" field_id="updateOptionFieldDeliver" field_label="Pass to Client"></checkbox-single>
      </form>
    </validation-observer>
    <field-options></field-options>
    <button @click="submitForm" type="submit" class="btn btn-green mt-5">Update Field</button>
    <span @click="resetCurrentField" class="text-link">Close</span>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import fieldOptions from '@/components/forms/fields/option-fields/options/list'
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
  computed: {
    ...mapGetters({
      options: 'getCurrentOptions'
    })
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
      this.submitForm()
    },
    submitForm () {
      this.$refs.form.validate().then(() => {
        this.updateOptions()
        this.updateField({
          label: this.label,
          mapping: this.mapping,
          deliver: this.deliver,
          form: this.form,
          base_field: this.field.base_field,
          id: this.field.id
        })
        this.resetCurrentField()
      })
    }
  },
  components: {
    'field-options': fieldOptions
  }
}
</script>
