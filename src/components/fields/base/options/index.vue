<template>
  <ul class="bg-gray-100 p-3">
    <li class="p-2 flex flex-row items-center">
      <text-field
        value="Order"
        field_id="none"
        class="field-group field-sm mr-2"/>
      <text-field
        value="Label"
        field_id="none"
        class="field-group mr-2"/>
      <text-field
        value="Value"
        field_id="none"
        class="field-group"/>
    </li>
    <li v-for="option in options" :key="option.id" class="mb-1">
      <update-option :option="option"></update-option>
    </li>
  </ul>
</template>

<script>
import updateOption from '@/components/fields/base/options/update'

export default {
  props: {
    options: Array
  },
  components: {
    'update-option': updateOption
  }
}
</script>
