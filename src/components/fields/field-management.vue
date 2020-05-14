<template>
  <div>
    <h3 class="h3 mt-5 mb-2">Form Fields</h3>
    <list-fields v-if="buyer.form" :form="buyer.form"></list-fields>
  </div>
</template>

<script>
import listFields from '@/components/fields/list'

export default {
  props: {
    buyer: Object
  },
  components: {
    'list-fields': listFields
  }
}
</script>
