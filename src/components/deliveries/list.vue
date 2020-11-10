<template>
  <div>
    <table v-if="deliveries.length" class="table table-white">
      <thead>
        <tr>
          <th class="th">Type</th>
          <th class="th">Response Parser</th>
          <th class="th">Target</th>
          <th class="th"></th>
        </tr>
      </thead>
      <tbody class="tbody">
      <tr class="tr" v-for="delivery in deliveries" :key="delivery.id">
        <td class="td">{{ delivery.type }}</td>
        <td class="td">{{ delivery.response_parser }}</td>
        <td class="td">{{ delivery.target }}</td>
        <td class="td">
          <span class="flex flex-row justify-end">
            <delete-delivery :id="delivery.id"></delete-delivery>
            <button class="btn btn-circle btn-hollow-blue" @click="showSetDelivery(delivery)"><font-awesome-icon icon="pencil-alt"></font-awesome-icon></button>
          </span>
        </td>
      </tr>
      </tbody>
    </table>
    <table-empty-state v-else heading="No Deliveries Added" copy="Use the 'Create Delivery' button to add deliveries to this contract."></table-empty-state>
  </div>
</template>

<script>
import deleteDelivery from '@/components/deliveries/delete'

import { mapMutations } from 'vuex'

export default {
  components: {
    'delete-delivery': deleteDelivery
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
  },
  props: {
    deliveries: Array
  }
}
</script>
