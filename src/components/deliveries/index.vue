<template>
  <panel-template title="Deliveries">
    <template v-slot:action>
      <button class="btn btn-turquoise" @click="showCreateDeliveryModal()">Create Delivery</button>
    </template>
    <template v-slot:content>
      <delivery-list :deliveries="deliveries"></delivery-list>
      <create-delivery :buyer="buyer"></create-delivery>
    </template>
  </panel-template>
</template>

<script>
import createDelivery from '@/components/deliveries/create'
import deliveryList from '@/components/deliveries/list'

import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    'create-delivery': createDelivery,
    'delivery-list': deliveryList
  },
  computed: {
    ...mapGetters({
      getDeliveriesByBuyer: 'getDeliveriesByBuyer'
    }),
    deliveries () {
      return this.getDeliveriesByBuyer(this.buyer)
    }
  },
  methods: {
    ...mapActions({
      fetchDeliveries: 'fetchDeliveries'
    }),
    ...mapMutations({
      showCreateDeliveryModal: 'SHOW_CREATE_DELIVERY_MODAL'
    })
  },
  props: {
    buyer: Number
  },
  created () {
    this.fetchDeliveries()
  }
}
</script>
