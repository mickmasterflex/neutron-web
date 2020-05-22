<template>
  <ul class="bg-gray-100 p-3">
    <li class="p-2 flex flex-row items-center">
      <span>Order - Label - Mapping - Scrub - Hide</span>
    </li>
    <update-option v-for="option in options" :key="option.id" :option="option"/>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import updateOption from '@/components/forms/fields/option-fields/options/update'

export default {
  computed: {
    ...mapGetters({
      options: 'getCurrentOptions'
    })
  },
  components: {
    'update-option': updateOption
  }
}
</script>
