<template>
  <validation-observer ref="form">
    <form @submit.prevent="submitRevenueMethodForm" class="flex flex-row items-end form-horizontal-slim mb-3">
      <select-field v-model="revenue_method" :options="deliveries" field_id="revenue_method" field_label="Revenue Method" field_class="field-tall"></select-field>
      <button @click.prevent="submitRevenueMethodForm" class="btn btn-green ml-3" v-show="unsavedChanges">Set Revenue Method</button>
    </form>
  </validation-observer>
</template>

<script>
import { setResponseErrors } from '@/mixins/set-response-errors'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      revenue_method: ''
    }
  },
  watch: {
    buyer: function () {
      this.revenue_method = this.buyer.revenue_method
    }
  },
  computed: {
    ...mapGetters({
      deliveriesByBuyer: 'getDeliveriesByBuyer',
      buyer: 'getCurrentBuyer'
    }),
    deliveries () {
      const renderedDeliveries = []
      this.buyerDeliveries.forEach(delivery => {
        const d = { name: delivery.type + delivery.target, id: delivery.id }
        renderedDeliveries.push(d)
      })
      return renderedDeliveries
    },
    buyerDeliveries () {
      return this.buyer.deliveries ? this.buyer.deliveries : []
    },
    unsavedChanges () {
      return this.revenue_method !== this.buyer.revenue_method
    }
  },
  mixins: [setResponseErrors],
  methods: {
    ...mapActions({
      updateBuyer: 'updateBuyer'
    }),
    submitRevenueMethodForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          const updatedBuyer = { ...this.buyer }
          updatedBuyer.revenue_method = this.revenue_method
          this.updateBuyer(updatedBuyer)
        }
      })
    }
  }
}
</script>
