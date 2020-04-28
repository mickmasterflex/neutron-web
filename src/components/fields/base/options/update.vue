<template>
  <div class="flex flex-row items-center">
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
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

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
  computed: {
    optionData () {
      return [this.order, this.label, this.value]
    }
  },
  watch: {
    optionData () {
      this.addToModified()
    }
  },
  methods: {
    ...mapMutations({ addBaseOptionToModified: 'ADD_BASE_OPTION_TO_MODIFIED' }),
    addToModified () {
      this.addBaseOptionToModified({
        id: this.option.id,
        order: this.order,
        label: this.label,
        value: this.value,
        field: this.option.field
      })
    }
  }
}
</script>
