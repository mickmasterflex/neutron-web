<template>
  <div v-if="buyer">
    <div class="bg-gray-900 rounded-lg w-full p-8 grid grid-cols-1 lg:grid-cols-2 items-center">
      <h1 class="h1 text-white">{{buyer.name}}</h1>
      <div>
        <stat-card v-if="buyer.parent" :data="buyer.parent" :title="`Parent`" :color="`teal`"></stat-card>
        <stat-card :data="buyer.client" :title="`Client`" :color="`teal`"></stat-card>
      </div>
    </div>
    <list-form v-if="buyer.form" :form="buyer.form"></list-form>

    <h3 class="h3 mt-5 mb-2">Delete Buyer Contract</h3>
    <delete-buyer-contract :client="client" :id="id"></delete-buyer-contract>

    <h3 class="h3 mt-5 mb-2">Update Buyer Contract</h3>
    <update-buyer-contract :client="client" :id="id"></update-buyer-contract>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import deleteBuyer from '@/components/buyers/delete'
import updateBuyer from '@/components/buyers/update'
import listForm from '@/components/fields/list'

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
    'delete-buyer-contract': deleteBuyer,
    'update-buyer-contract': updateBuyer,
    'list-form': listForm
  },
  computed: {
    ...mapGetters({ buyer: 'getCurrentBuyer' })
  },
  methods: {
    ...mapActions({ fetchCurrentBuyer: 'fetchCurrentBuyer' })
  },
  created () {
    this.fetchCurrentBuyer(this.id)
  }
}
</script>
