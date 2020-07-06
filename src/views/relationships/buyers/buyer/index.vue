<template>
  <buyer-layout :id="id" contentTab="details">
    <template v-slot:content>
      <h3 class="h3 mb-2">Update Buyer Contract</h3>
      <update-buyer-contract :buyer="buyer" ></update-buyer-contract>

      <h3 class="h3 mt-5 mb-2">Delete Buyer Contract</h3>
      <delete-buyer-contract :client="buyer.client" :id="id"></delete-buyer-contract>
    </template>
  </buyer-layout>
</template>

<script>
import buyerLayout from '@/views/relationships/buyers/buyer/layout'
import deleteBuyer from '@/components/buyers/delete'
import updateBuyer from '@/components/buyers/update'
import { mapGetters } from 'vuex'

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
    'delete-buyer-contract': deleteBuyer,
    'update-buyer-contract': updateBuyer
  }
}
</script>
