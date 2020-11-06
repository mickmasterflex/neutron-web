<template>
  <validation-provider :rules="rules" :vid="$attrs.field_id" :name="$attrs.field_id" :mode="mode" v-slot="{ errors, classes }">
    <select-field v-model="inner_value" :class="classes" v-bind="$attrs">
      <span class="field-error" :class="$attrs.field_size ? $attrs.field_size : 'field-lg'" v-show="errors.length">{{ errors[0] }}</span>
      <slot></slot>
    </select-field>
  </validation-provider>
</template>

<script>
import validation from '@/mixins/fields/validation'

export default {
  mixins: [validation]
}
</script>
