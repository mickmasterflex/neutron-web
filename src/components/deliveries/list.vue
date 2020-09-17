<template>
    <panel-template title="Deliveries">
      <template v-slot:action>
        <button class="btn btn-turquoise" @click="showCreateDeliveryModal()">Add Delivery</button>
      </template>
      <template v-slot:content>
        <table v-if="deliveries" class="table">
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
            <td class="td"><delete-delivery :id="delivery.id"></delete-delivery></td>
          </tr>
          </tbody>
        </table>
        <div v-else>
          <p>No Deliveries Found :(</p>
        </div>
        <create-delivery :buyer="buyer.id"></create-delivery>
      </template>
    </panel-template>
</template>

<script>
import createDelivery from '@/components/deliveries/create'
import deleteDelivery from '@/components/deliveries/delete'

import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    'create-delivery': createDelivery,
    'delete-delivery': deleteDelivery
  },
  computed: {
    ...mapGetters({
      buyer: 'getCurrentBuyer'
    })
  },
  methods: {
    ...mapMutations({
      showCreateDeliveryModal: 'SHOW_CREATE_DELIVERY_MODAL'
    })
  },
  props: {
    deliveries: Array
  }
}
</script>
