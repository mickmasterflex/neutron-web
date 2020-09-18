<template>
  <div>
    <update-buyer-contract :buyer="buyer" ></update-buyer-contract>
    <delete-buyer-contract :client="$route.params.client" :id="buyer.id" class="mt-4"></delete-buyer-contract>
  </div>
</template>

<script>
import deleteBuyer from '@/components/buyers/delete'
import updateBuyer from '@/components/buyers/update'
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      buyer: 'getCurrentBuyer'
    })
  },
  components: {
    'delete-buyer-contract': deleteBuyer,
    'update-buyer-contract': updateBuyer
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
