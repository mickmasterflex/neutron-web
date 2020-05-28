<template>
  <div class="fields-inline">
    <text-field-prefixed
      color="blue"
      icon="arrows-alt-v"
      field_disabled="true"
      field_class="field-sm"
      prefix_group_class="field-draggable"
      v-model="order"
      :field_id="`optionOrder_${option.id}`"
      class="field-group draggable-handle"/>
    <v-text-field
      v-model="label"
      :field_id="`optionLabel_${option.id}`"
      rules="required"
      class="field-group field-error-inside"/>
    <v-text-field
      v-model="value"
      :field_id="`optionValue_${option.id}`"
      rules="required"
      class="field-group field-error-inside"/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import textFieldPrefixed from '@/components/ui/forms/base-fields/text-field-prefixed'

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
  },
  components: {
    'text-field-prefixed': textFieldPrefixed
  }
}
</script>
