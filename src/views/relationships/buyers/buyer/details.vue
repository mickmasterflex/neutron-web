<template>
  <div>
      <h3 class="h3 mb-2">Update Buyer Contract</h3>
      <update-buyer-contract :buyer="buyer" ></update-buyer-contract>

      <h3 class="h3 mt-5 mb-2">Delete Buyer Contract</h3>
      <delete-buyer-contract :client="$route.params.client" :id="buyer.id"></delete-buyer-contract>
  </div>
</template>

<script>
import deleteBuyer from '@/components/buyers/delete'
import updateBuyer from '@/components/buyers/update'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      buyer: 'getCurrentBuyer'
    })
  },
  components: {
    'delete-buyer-contract': deleteBuyer,
    'update-buyer-contract': updateBuyer
  }
}
</script>
