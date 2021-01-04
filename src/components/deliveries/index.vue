<template>
  <panel-template title="Deliveries" :showLoader="loading" :loading-text="loadingText">
    <template v-slot:action>
      <button class="btn btn-turquoise" @click="showCreateDeliveryModal()"><font-awesome-icon icon="plus"></font-awesome-icon> New Delivery</button>
    </template>
    <template v-slot:content>
      <delivery-list :deliveries="deliveries"></delivery-list>
      <create-delivery :buyer="buyer"></create-delivery>
      <update-delivery></update-delivery>
    </template>
  </panel-template>
</template>

<script>
import createDelivery from '@/components/deliveries/create'
import deliveryList from '@/components/deliveries/list'
import updateDelivery from '@/components/deliveries/update'

import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    'create-delivery': createDelivery,
    'delivery-list': deliveryList,
    'update-delivery': updateDelivery
  },
  computed: {
    ...mapGetters({
      getDeliveriesByBuyer: 'getDeliveriesByBuyer',
      loading: 'getDeliveriesFetchLoading',
      loadingText: 'getDeliveriesFetchLoadingText'
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
