<template>
  <div class="shadow bg-white rounded-md p-2 flex flex-row items-center">
    <v-text-field
      v-model="order"
      :field_id="`optionOrder_${option.id}`"
      rules="required"
      class="field-group field-sm mr-2"/>
    <v-text-field
      v-model="label"
      :field_id="`optionLabel_${option.id}`"
      rules="required"
      class="field-group mr-2"/>
    <v-text-field
      v-model="value"
      :field_id="`optionValue_${option.id}`"
      rules="required"
      class="field-group"/>
    <button class="btn btn-green" @click="submit">Submit</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      order: this.option.order,
      label: this.option.label,
      value: this.option.value
    }
  },
  props: {
    option: Object
  },
  methods: {
    ...mapActions({ updateBaseOption: 'updateBaseOption' }),
    submit () {
      this.updateBaseOption({
        order: this.order,
        label: this.label,
        value: this.value,
        id: this.option.id,
        field: this.option.field
      })
    }
  }
}
</script>
