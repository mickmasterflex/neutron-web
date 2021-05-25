<template>
  <validation-provider :rules="rules" :vid="$attrs.field_id" :name="$attrs.field_id" :mode="mode" v-slot="{ errors, classes }">
    <select-tree-field v-model="inner_value" :class="classes" v-bind="$attrs" @input="$emit('input', $event)">
      <span class="field-error" :class="$attrs.field_size ? $attrs.field_size : 'field-lg'" v-show="errors.length">{{ errors[0] }}</span>
      <slot/>
      <template v-slot:option="slotProps">
        <slot name="option" :option="slotProps.option"/>
      </template>
    </select-tree-field>
  </validation-provider>
</template>

<script>
import validation from '@/mixins/fields/validation'
import selectTreeField from '@/components/ui/forms/base-fields/select-tree-field'

export default {
  mixins: [validation],
  components: {
    'select-tree-field': selectTreeField
  }
}
</script>
