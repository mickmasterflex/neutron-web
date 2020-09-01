<template>
  <div>
    <update-buyer-contract :buyer="buyer" ></update-buyer-contract>
    <panel-template title="Daily Lead Caps">
      <template v-slot:content>
        <day-caps v-if="buyer.caps" :caps="day_caps"></day-caps>
      </template>
    </panel-template>
    <panel-template title="Danger Zone">
      <template v-slot:content>
        <delete-buyer-contract :client="$route.params.client" :id="buyer.id"></delete-buyer-contract>
      </template>
    </panel-template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import deleteBuyer from '@/components/buyers/delete'
import updateBuyer from '@/components/buyers/update'
import dayCaps from '@/components/caps/day'

export default {
  computed: {
    ...mapGetters({
      buyer: 'getCurrentBuyer'
    }),
    day_caps () {
      if (this.buyer.caps) {
        return this.buyer.caps.day_caps
      } else {
        return []
      }
    }
  },
  components: {
    'delete-buyer-contract': deleteBuyer,
    'update-buyer-contract': updateBuyer,
    'day-caps': dayCaps
  // },
  // methods: {
  //   ...mapActions({
  //     fetchCaps: 'fetchCaps'
  //   })
  // },
  // watch: {
  //   buyer () {
  //     if (this.buyer.caps) {
  //       this.fetchCaps(this.buyer.cap)
  //     }
  //   }
  }
}
</script>
