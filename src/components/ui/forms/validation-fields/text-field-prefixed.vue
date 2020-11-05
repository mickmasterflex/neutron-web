<template>
  <validation-provider :rules="rules" :vid="$attrs.field_id" :name="$attrs.field_id" :mode="mode" v-slot="{ errors, classes }">
    <text-field-prefixed
      v-model="inner_value"
      :class="classes"
      v-bind="$attrs"
      :value="value"
      :color="color"
      :icon="icon"
      :field_wrap_class="field_wrap_class"
      ref="field">
      <span class="field-error" :class="$attrs.field_size ? $attrs.field_size : 'field-lg'" v-show="errors.length">{{ errors[0] }}</span>
      <slot></slot>
    </text-field-prefixed>
  </validation-provider>
</template>

<script>
import validation from '@/mixins/fields/validation'
import textFieldPrefixed from '@/components/ui/forms/base-fields/text-field-prefixed'

export default {
  mixins: [validation],
  props: {
    color: {
      type: String,
      default: 'gray'
    },
    icon: {
      type: String,
      default: 'arrows-alt-v'
    },
    field_wrap_class: String
  },
  components: {
    'text-field-prefixed': textFieldPrefixed
  }
}
</script>
