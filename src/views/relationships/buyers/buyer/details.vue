<template>
  <div>
    <update-buyer-contract :buyer="buyer" ></update-buyer-contract>
    <delivery-index :buyer="buyer.id"></delivery-index>
    <delete-buyer-contract :client="$route.params.client" :id="buyer.id" class="mt-4"></delete-buyer-contract>
  </div>
</template>

<script>
import deleteBuyer from '@/components/buyers/delete'
import updateBuyer from '@/components/buyers/update'
import deliveryIndex from '@/components/deliveries/index'

import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    'delete-buyer-contract': deleteBuyer,
    'delivery-index': deliveryIndex,
    'update-buyer-contract': updateBuyer
  },
  computed: {
    ...mapGetters({
      buyer: 'getCurrentBuyer'
    })
  },
  methods: {
    ...mapActions({
      fetchBuyers: 'fetchBuyers'
    })
  },
  created () {
    this.fetchBuyers()
  }
}
</script>
