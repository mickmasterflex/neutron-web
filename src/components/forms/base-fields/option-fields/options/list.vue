<template>
  <ul class="well" v-if="options.length">
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
import { mapGetters } from 'vuex'
import updateOption from '@/components/forms/base-fields/option-fields/options/update'
import deleteOption from '@/components/forms/base-fields/option-fields/options/delete'

export default {
  computed: {
    ...mapGetters({
      options: 'getCurrentBaseOptions'
    })
  },
  components: {
    'update-option': updateOption,
    'delete-option': deleteOption
  }
}
</script>
