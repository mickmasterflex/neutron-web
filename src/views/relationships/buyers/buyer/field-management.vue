<template>
  <buyer-layout :id="id" contentTab="field-management">
    <template v-slot:content>
      <action-heading>
        <template v-slot:left>
          <h2 class="h3">Contract Fields</h2>
        </template>
        <template v-slot:right>
          <create-field></create-field>
        </template>
      </action-heading>
      <list-fields></list-fields>
    </template>
  </buyer-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import buyerLayout from '@/views/relationships/buyers/buyer/layout'
import listFields from '@/components/forms/fields/list'
import createField from '@/components/forms/fields/create'

export default {
  props: {
    id: {
      type: Number
    }
  },
  computed: {
    ...mapGetters({
      buyer: 'getCurrentBuyer'
    })
  },
  components: {
    'buyer-layout': buyerLayout,
    'list-fields': listFields,
    'create-field': createField
  }
}
</script>
