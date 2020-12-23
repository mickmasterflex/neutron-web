<template>
  <base-panel-grid>
    <update-buyer-contract :buyer="buyer" class="col-span-2 xl:col-span-1"></update-buyer-contract>
    <recruitment-locations :geo="buyer.geo" class="col-span-2 xl:col-span-1"></recruitment-locations>
    <panel-template title="Lead Caps" contentClass="relative" class="col-span-2">
      <template v-slot:content>
        <lead-caps :parent="id" type="buyers"></lead-caps>
      </template>
    </panel-template>
    <update-channels class="col-span-2" :buyer="buyer"></update-channels>
    <delivery-index :buyer="buyer.id" class="col-span-2"></delivery-index>
    <panel-template title="Danger Zone" class="col-span-2">
      <template v-slot:content>
        <delete-buyer-contract :client="$route.params.client" :id="buyer.id" :parent="buyer.parent"></delete-buyer-contract>
      </template>
    </panel-template>
  </base-panel-grid>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import deleteBuyer from '@/components/buyers/delete'
import updateBuyer from '@/components/buyers/update'
import recruitmentLocations from '@/components/geos/index'
import deliveryIndex from '@/components/deliveries/index'
import leadCaps from '@/components/caps/'
import updateChannels from '@/components/buyers/update-channels'

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
    'update-channels': updateChannels,
    'delete-buyer-contract': deleteBuyer,
    'delivery-index': deliveryIndex,
    'update-buyer-contract': updateBuyer,
    'recruitment-locations': recruitmentLocations,
    'lead-caps': leadCaps
  },
  methods: {
    ...mapActions({
      fetchBuyers: 'fetchBuyers'
    })
  }
}
</script>
