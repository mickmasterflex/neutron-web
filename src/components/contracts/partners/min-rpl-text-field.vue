<template>
  <v-text-field-prefixed
    mode="passive"
    icon="dollar-sign"
    color="none"
    placeholder="0.00"
    v-model="inner_value"
    v-bind="$attrs"
    field_id="minimum_rpl"
    rules="dollar_amount"
    field_label="Min Revenue Per Lead"
  />
</template>

<script>
import validation from '@/mixins/fields/validation'
import textFieldPrefixed from '@/components/ui/forms/validation-fields/text-field-prefixed'

export default {
  mixins: [validation],
  components: {
    'v-text-field-prefixed': textFieldPrefixed
  }
}
</script>
