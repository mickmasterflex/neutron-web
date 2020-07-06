<template>
  <buyer-layout :id="id" contentTab="field-management">
    <template v-slot:content>
      <field-management :modal-heading="`${buyer.name}`"></field-management>
    </template>
  </buyer-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import buyerLayout from '@/views/relationships/buyers/buyer/layout'
import fieldManagement from '@/components/forms/fields/field-management'

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
    'field-management': fieldManagement
  }
}
</script>
