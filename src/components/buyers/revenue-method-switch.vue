<template>
  <check-switch
    class="w-full"
    :field_id="'delivery' + deliveryId"
    :value="buyer.revenue_method === deliveryId"
    off_color="gray"
    @input="submitRevenueMethodForm">
    <template #switch-on>
      <font-awesome-icon icon="dollar-sign"></font-awesome-icon>
    </template>
  </check-switch>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    deliveryId: Number
  },
  computed: {
    ...mapGetters({
      buyer: 'getCurrentBuyer'
    })
  },
  methods: {
    ...mapActions({
      updateBuyer: 'updateBuyer'
    }),
    ...mapMutations({
      setLoading: 'SET_BUYER_REVENUE_METHOD_PUT_LOADING',
      resetLoading: 'RESET_BUYER_REVENUE_METHOD_PUT_LOADING'
    }),
    submitRevenueMethodForm () {
      this.setLoading()
      const updatedBuyer = { ...this.buyer }
      if (updatedBuyer.revenue_method === this.deliveryId) {
        updatedBuyer.revenue_method = null
      } else {
        updatedBuyer.revenue_method = this.deliveryId
      }
      this.updateBuyer(updatedBuyer).finally(() => {
        this.resetLoading()
      })
    }
  }
}
</script>
