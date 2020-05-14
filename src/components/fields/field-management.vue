<template>
  <div>
    <h3 class="h3 mt-5 mb-2">Form Fields</h3>
    <list-fields v-if="buyer.form" :form="buyer.form"></list-fields>

    <h3 class="h3 mt-5 mb-2">Create Form Field</h3>
    <create-field v-if="buyer.form" :form="buyer.form.id"></create-field>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import createField from '@/components/fields/create'
import listFields from '@/components/fields/list'

export default {
  props: {
    buyer: Object
  },
  components: {
    'create-field': createField,
    'list-fields': listFields
  },
  methods: {
    ...mapActions({
      createTextField: 'createTextField',
      fetchBaseFields: 'fetchBaseFields'
    })
  }
}
</script>
