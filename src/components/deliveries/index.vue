<template>
  <panel-template title="Deliveries" :showLoader="loading" :loading-text="loadingText">
    <template v-slot:action>
      <button class="btn btn-turquoise" @click="showCreateDeliveryModal()"><font-awesome-icon icon="plus"></font-awesome-icon> New Delivery</button>
    </template>
    <template v-slot:content>
      <delivery-list
        :buyerId="buyer.id"
        :client-slug="buyer.client_data ? buyer.client_data.slug : ''"
      ></delivery-list>
      <create-delivery :buyer="buyer.id"></create-delivery>
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
  props: {
    buyer: Object
  },
  components: {
    'create-delivery': createDelivery,
    'delivery-list': deliveryList,
    'update-delivery': updateDelivery
  },
  computed: {
    ...mapGetters({
      loadingDeliveries: 'getDeliveriesFetchLoading',
      loadingDeliveriesText: 'getDeliveriesFetchLoadingText',
      loadingBuyer: 'getBuyerFetchLoading',
      loadingBuyerText: 'getBuyerFetchLoadingText',
      loadingRevenueMethodPut: 'getBuyerRevenueMethodPutLoading',
      loadingRevenueMethodPutText: 'getBuyerRevenueMethodPutLoadingText'
    }),
    loading () {
      if (this.loadingRevenueMethodPut) {
        return this.loadingRevenueMethodPut
      } else if (this.loadingDeliveries) {
        return this.loadingDeliveries
      }
      return this.loadingBuyer
    },
    loadingText () {
      if (this.loadingRevenueMethodPut) {
        return this.loadingRevenueMethodPutText
      } else if (this.loadingDeliveries) {
        return this.loadingDeliveriesText
      }
      return this.loadingBuyerText
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
  created () {
    this.fetchDeliveries()
  }
}
</script>
