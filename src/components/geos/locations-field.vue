<template>
  <v-textarea-field
    field_id="locations"
    ref="locationField"
    field_label="Locations"
    v-bind="$attrs"
    :rules="rules"
    v-model="inner_value"
    :placeholder="placeholder"></v-textarea-field>
</template>

<script>
import validation from '@/mixins/fields/validation'

export default {
  mixins: [validation],
  data: () => ({
    placeholder: 'Enter multiple postal codes or abbreviated states.\nSeparate with commas or newlines, ie:\n84104, UT, 90210, ny, TX\nUT\nTX\nNY\nMA'
  })
}
</script>
