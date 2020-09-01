<template>
  <div>
    <update-buyer-contract :buyer="buyer" ></update-buyer-contract>
    <panel-template title="Danger Zone">
      <template v-slot:content>
        <delete-buyer-contract :client="$route.params.client" :id="buyer.id"></delete-buyer-contract>
      </template>
    </panel-template>
  </div>
</template>

<script>
import deleteBuyer from '@/components/buyers/delete'
import updateBuyer from '@/components/buyers/update'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      buyer: 'getCurrentBuyer'
    })
  },
  components: {
    'delete-buyer-contract': deleteBuyer,
    'update-buyer-contract': updateBuyer
  }
}
</script>
