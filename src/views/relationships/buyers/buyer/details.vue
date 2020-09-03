<template>
  <div>
    <update-buyer-contract :buyer="buyer" ></update-buyer-contract>
    <panel-template title="Daily Lead Caps" contentClass="relative">
      <template v-slot:content>
        <day-cap-create></day-cap-create>
        <day-cap-update></day-cap-update>
        <day-caps></day-caps>
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
import { mapGetters, mapMutations } from 'vuex'
import deleteBuyer from '@/components/buyers/delete'
import updateBuyer from '@/components/buyers/update'
import dayCaps from '@/components/caps/day'
import dayCapCreate from '@/components/caps/day/create'
import dayCapUpdate from '@/components/caps/day/update'

export default {
  computed: {
    ...mapGetters({
      buyer: 'getCurrentBuyer'
    })
  },
  components: {
    'delete-buyer-contract': deleteBuyer,
    'update-buyer-contract': updateBuyer,
    'day-caps': dayCaps,
    'day-cap-create': dayCapCreate,
    'day-cap-update': dayCapUpdate
  },
  methods: {
    ...mapMutations({
      setCurrentDayCaps: 'SET_CURRENT_DAY_CAPS',
      setCurrentCaps: 'SET_CURRENT_CAPS'
    })
  },
  watch: {
    buyer () {
      if (this.buyer.caps) {
        // Potentially only setCurrentCaps?
        this.setCurrentCaps(this.buyer.caps)
        this.setCurrentDayCaps(this.buyer.caps.day_caps)
      }
    }
  }
}
</script>
