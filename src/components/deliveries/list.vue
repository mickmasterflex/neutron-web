<template>
  <transition-table-state>
    <table v-if="deliveries.length || ancestorDeliveries.length" class="table table-white">
      <thead>
        <tr>
          <th class="th">Type</th>
          <th class="th">Response Parser</th>
          <th class="th">Target</th>
          <th class="th w-40">Revenue Method</th>
          <th class="th"></th>
        </tr>
      </thead>
      <tbody class="tbody">
        <delivery-tr v-for="delivery in deliveries" :key="'delivery' + delivery.id" :delivery="delivery">
          <btn-group-right>
            <delete-delivery :id="delivery.id"></delete-delivery>
            <button class="btn btn-circle btn-hollow-blue" @click="showSetDelivery(delivery)"><font-awesome-icon icon="pencil-alt"></font-awesome-icon></button>
          </btn-group-right>
        </delivery-tr>
        <tr-th-section-heading :colspan="5" v-if="ancestorDeliveries.length">
          Inherited Deliveries
        </tr-th-section-heading>
        <delivery-tr
          v-for="(delivery, index) in ancestorDeliveries"
          :key="'delivery' + delivery.id"
          :delivery="delivery"
          :class="index === 0 ? 'first-child': ''"
        >
          <router-link :to="{ name: 'BuyerContract', params: { id: delivery.buyer_contract, client: clientSlug } }"
                       class="text-link text-right w-full text-right">
            {{ ancestors.filter(b => b.id === delivery.buyer_contract)[0].name }}
          </router-link>
        </delivery-tr>
      </tbody>
    </table>
    <table-empty-state v-else heading="No Deliveries Added" copy="Use the 'Create Delivery' button to add deliveries to this contract."></table-empty-state>
  </transition-table-state>
</template>

<script>
import deleteDelivery from './delete'
import deliveryTr from './tr'
import { mapMutations, mapGetters } from 'vuex'

export default {
  props: {
    buyerId: {
      type: Number
    },
    clientSlug: {
      type: String,
      required: true
    }
  },
  components: {
    'delete-delivery': deleteDelivery,
    'delivery-tr': deliveryTr
  },
  computed: {
    ...mapGetters({
      getDeliveriesByBuyer: 'getDeliveriesByBuyer',
      getDeliveriesByBuyers: 'getDeliveriesByBuyers',
      ancestors: 'getCurrentAncestors',
      ancestorsIds: 'getCurrentAncestorsIds'
    }),
    deliveries () {
      return this.getDeliveriesByBuyer(this.buyerId)
    },
    ancestorDeliveries () {
      if (this.ancestorsIds) {
        return this.getDeliveriesByBuyers(this.ancestorsIds)
      }
      return []
    }
  },
  methods: {
    ...mapMutations({
      setCurrentDelivery: 'SET_CURRENT_DELIVERY',
      showUpdateDeliveryModal: 'SHOW_UPDATE_DELIVERY_MODAL'
    }),
    showSetDelivery (delivery) {
      this.setCurrentDelivery(delivery)
      this.showUpdateDeliveryModal()
    }
  }
}
</script>
