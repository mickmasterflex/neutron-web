<template>
  <validation-provider :rules="rules" :vid="$attrs.field_id" :name="$attrs.field_id" :mode="mode" v-slot="{ errors, classes }">
    <multi-select-checkbox-field :options="options" v-model="inner_value" :class="classes" v-bind="$attrs">
      <span class="field-error" v-show="errors.length">{{ errors[0] }}</span>
    </multi-select-checkbox-field>
  </validation-provider>
</template>

<script>
import baseMultiSelectCheckbox from '@/components/ui/forms/base-fields/multi-select-checkbox'
import validation from '@/mixins/fields/multi-select-validation'

export default {
  mixins: [validation],
  components: {
    'multi-select-checkbox-field': baseMultiSelectCheckbox
  }
}
</script>
