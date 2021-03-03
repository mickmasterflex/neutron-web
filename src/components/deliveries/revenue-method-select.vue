<template>
  <validation-observer ref="form">
    <form @submit.prevent="submitForm">
      <v-select-field v-model="revenue_method" rules="required" :options="deliveries" field_id="revenue_method" field_label="Revenue Method"></v-select-field>
      <template>
        <button @click="submitForm" class="btn btn-green" v-show="unsavedChanges">Set Revenue Method</button>
      </template>
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
  updated () {
    if (this.buyer.revenue_method) {
      this.revenue_method = this.buyer.revenue_method
    }
  },
  // props: {
  //   buyer: {
  //     type: Number
  //   }
  // },
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
      if (this.revenue_method) {
        return this.revenue_method !== this.buyer.revenue_method
      } else {
        return false
      }
    }
  },
  mixins: [setResponseErrors],
  methods: {
    ...mapActions({
      updateBuyer: 'updateBuyer'
    }),
    submitForm () {
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
