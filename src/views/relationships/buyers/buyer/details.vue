<template>
  <div>
    <update-buyer-contract :buyer="buyer" ></update-buyer-contract>
    <list-deliveries :deliveries="deliveries"></list-deliveries>
    <delete-buyer-contract :client="$route.params.client" :id="buyer.id" class="mt-4"></delete-buyer-contract>
  </div>
</template>

<script>
import deleteBuyer from '@/components/buyers/delete'
import updateBuyer from '@/components/buyers/update'
import listDeliveries from '@/components/deliveries/list'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    'delete-buyer-contract': deleteBuyer,
    'list-deliveries': listDeliveries,
    'update-buyer-contract': updateBuyer
  },
  computed: {
    ...mapGetters({
      buyer: 'getCurrentBuyer',
      deliveries: 'getDeliveries'
    })
  },
  methods: {
    ...mapActions({
      fetchBuyers: 'fetchBuyers',
      fetchDeliveries: 'fetchDeliveries'
    })
  },
  created () {
    this.fetchBuyers()
    this.fetchDeliveries()
  }
}
</script>
