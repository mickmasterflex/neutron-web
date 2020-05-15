<template>
  <div>
    <h3 class="h3 mt-5 mb-2">Form Fields</h3>
    <list-fields></list-fields>
  </div>
</template>

<script>
import listFields from '@/components/forms/fields/list'

export default {
  props: {
    form: Object
  },
  components: {
    'list-fields': listFields
  }
}
</script>
