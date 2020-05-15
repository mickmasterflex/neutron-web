<template>
  <div>
    <h3 class="h3 mt-5 mb-2">Form Fields</h3>
    <list-fields></list-fields>
    <create-field :form="form.id" v-if="form" class="mt-5"></create-field>
  </div>
</template>

<script>
import listFields from '@/components/forms/fields/list'
import createField from '@/components/forms/fields/create'

export default {
  props: {
    form: Object
  },
  components: {
    'list-fields': listFields,
    'create-field': createField
  }
}
</script>
