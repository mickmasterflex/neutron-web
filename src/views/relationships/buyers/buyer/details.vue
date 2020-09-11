<template>
  <div>
    <update-buyer-contract :buyer="buyer" ></update-buyer-contract>
    <panel-template title="Lead Caps" contentClass="relative">
      <template v-slot:content>
        <lead-caps v-if="buyer.id" :parent="{ type: 'buyers', id: buyer.id }"></lead-caps>
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
import { mapGetters, mapActions } from 'vuex'
import deleteBuyer from '@/components/buyers/delete'
import updateBuyer from '@/components/buyers/update'
import leadCaps from '@/components/caps/'

export default {
  computed: {
    ...mapGetters({
      buyer: 'getCurrentBuyer'
    })
  },
  methods: {
    ...mapActions({
      fetchCurrentCaps: 'fetchCurrentCaps'
    }),
    fetchCaps () {
      if (this.buyer.id) {
        this.fetchCurrentCaps({ type: 'buyers', id: this.buyer.id })
      }
    }
  },
  watch: {
    buyer () {
      this.fetchCaps()
    }
  },
  mounted () {
    this.fetchCaps()
  },
  components: {
    'delete-buyer-contract': deleteBuyer,
    'update-buyer-contract': updateBuyer,
    'lead-caps': leadCaps
  }
}
</script>
