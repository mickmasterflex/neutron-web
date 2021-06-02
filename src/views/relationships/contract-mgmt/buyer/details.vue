<template>
  <base-panel-grid>
    <update-buyer-contract :buyer="buyer" class="col-span-2 xl:col-span-1" :showLoader="loading" :loadingText="loadingText"></update-buyer-contract>
    <recruitment-locations :geo="buyer.geo" contract-type="buyer" class="col-span-2 xl:col-span-1"></recruitment-locations>
    <delivery-index :buyer="buyer" class="col-span-2"></delivery-index>
    <lead-caps :caps-parent-id="id" caps-parent-type="buyers"/>
    <update-channels class="col-span-2" :buyer="buyer" ></update-channels>
    <panel-template title="Danger Zone" class="col-span-2" :showLoader="loading" :loadingText="loadingText">
      <template v-slot:content>
        <delete-buyer-contract :client="$route.params.client" :id="buyer.id" :parent="buyer.parent"></delete-buyer-contract>
      </template>
    </panel-template>
  </base-panel-grid>
</template>

<script>
import { mapGetters } from 'vuex'
import deleteBuyer from '@/components/contracts/buyers/delete'
import updateBuyer from '@/components/contracts/buyers/update'
import recruitmentLocations from '@/components/geos/index'
import deliveryIndex from '@/components/deliveries/index'
import leadCaps from '@/components/caps/panel-template'
import updateChannels from '@/components/contracts/buyers/update-channels'

export default {
  props: {
    id: Number
  },
  computed: {
    ...mapGetters({
      buyer: 'getCurrentBuyer',
      loading: 'getBuyerFetchLoading',
      loadingText: 'getBuyerFetchLoadingText'
    })
  },
  components: {
    'update-channels': updateChannels,
    'delete-buyer-contract': deleteBuyer,
    'delivery-index': deliveryIndex,
    'update-buyer-contract': updateBuyer,
    'recruitment-locations': recruitmentLocations,
    'lead-caps': leadCaps
  }
}
</script>
