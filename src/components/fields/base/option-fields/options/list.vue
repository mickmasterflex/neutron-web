<template>
  <ul class="bg-gray-100 p-3">
    <li class="p-2 flex flex-row items-center">
      <span>Order - Label - Value - Delete</span>
    </li>
    <li v-for="option in options" :key="option.id" class="mb-1 shadow bg-white rounded-md p-2 flex flex-row items-center">
      <update-option :option="option"></update-option>
      <delete-option :option="option" class="ml-2"></delete-option>
    </li>
  </ul>
</template>

<script>
import updateOption from '@/components/fields/base/option-fields/options/update'
import deleteOption from '@/components/fields/base/option-fields/options/delete'

export default {
  props: {
    options: Array,
    field_id: Number
  },
  components: {
    'update-option': updateOption,
    'delete-option': deleteOption
  }
}
</script>
