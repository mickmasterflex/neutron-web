<template>
  <div class="fields-inline">
    <text-field-prefixed
      color="blue"
      icon="arrows-alt-v"
      field_disabled="true"
      field_class="field-sm"
      prefix_group_class="field-draggable"
      v-model="order"
      :field_id="`fieldOrder_${id}`"
      class="field-group"/>
    <text-field class="field-group" field_class="field-sm" :value="id" field_disabled="true"/>
    <text-field class="field-group" :value="label" field_disabled="true"/>
    <text-field class="field-group" :value="mapping" field_disabled="true"/>
    <text-field class="field-group" field_class="field-sm" :value="deliver" field_disabled="true"/>
  </div>
</template>

<script>
import textFieldPrefixed from '@/components/ui/forms/base-fields/text-field-prefixed'

export default {
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      order: this.field.order,
      id: this.field.id,
      label: this.field.label,
      mapping: this.field.mapping,
      deliver: this.field.deliver
    }
  },
  components: {
    'text-field-prefixed': textFieldPrefixed
  }
}
</script>
