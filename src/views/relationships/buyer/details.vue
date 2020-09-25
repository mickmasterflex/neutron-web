<template>
  <div>
    <update-buyer-contract :buyer="buyer" ></update-buyer-contract>
    <delivery-index :buyer="buyer.id"></delivery-index>
    <panel-template title="Lead Caps" contentClass="relative">
      <template v-slot:content>
        <lead-caps :parent="id" type="buyers"></lead-caps>
      </template>
    </panel-template>
    <panel-template title="Danger Zone">
      <template v-slot:content>
        <delete-buyer-contract :client="$route.params.client" :id="buyer.id"></delete-buyer-contract>
      </template>
    </panel-template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import deleteBuyer from '@/components/buyers/delete'
import updateBuyer from '@/components/buyers/update'
import deliveryIndex from '@/components/deliveries/index'
import leadCaps from '@/components/caps/'

export default {
  props: {
    id: Number
  },
  computed: {
    ...mapGetters({
      buyer: 'getCurrentBuyer'
    })
  },
  components: {
    'delete-buyer-contract': deleteBuyer,
    'delivery-index': deliveryIndex,
    'update-buyer-contract': updateBuyer,
    'lead-caps': leadCaps
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
