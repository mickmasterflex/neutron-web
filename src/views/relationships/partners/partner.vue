<template>
  <div v-if="partner">
    <div class="bg-gray-900 rounded-lg w-full p-8 grid grid-cols-1 lg:grid-cols-2 items-center">
      <h1 class="h1 text-white">{{partner.name}}</h1>
      <div>
        <stat-card v-if="partner.parent" :data="partner.parent" :title="`Parent`" :color="`teal`"></stat-card>
        <stat-card :data="partner.client" :title="`Client`" :color="`teal`"></stat-card>
      </div>
    </div>
    <h3 class="h3 mt-5 mb-2">Delete Partner Contract</h3>
    <delete-partner-contract :client="client" :id="id"></delete-partner-contract>

    <h3 class="h3 mt-5 mb-2">Update Partner Contract</h3>
    <update-partner-contract :client="client" :id="id"></update-partner-contract>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import deletePartnerContract from '@/components/contracts/partners/delete'
import updatePartnerContract from '@/components/contracts/partners/update'

export default {
  props: {
    id: {
      type: Number,
      default: null
    },
    client: {
      type: Number,
      default: null
    }
  },
  components: {
    'delete-partner-contract': deletePartnerContract,
    'update-partner-contract': updatePartnerContract
  },
  computed: {
    ...mapGetters({
      getPartner: 'getPartnerById'
    }),
    partner: function () {
      return this.getPartner(this.id)
    }
  },
  methods: {
    ...mapActions({
      getPartners: 'getPartners'
    })
  },
  created () {
    this.getPartners()
  }
}
</script>
