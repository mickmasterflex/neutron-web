<template>
  <div v-if="partner">
    <div class="hud">
      <h1 class="h1 text-white">{{partner.name}}</h1>
      <div>
        <stat-card v-if="partner.parent" :data="partner.parent" :title="`Parent`" :color="`teal`"></stat-card>
        <stat-card :data="partner.client" :title="`Client`" :color="`teal`"></stat-card>
      </div>
    </div>
    <h3 class="h3 mt-5 mb-2">Delete Partner Contract</h3>
    <delete-partner-contract :client="partner.client" :id="id"></delete-partner-contract>

    <h3 class="h3 mt-5 mb-2">Update Partner Contract</h3>
    <update-partner-contract :client="partner.client" :id="id"></update-partner-contract>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import deletePartner from '@/components/partners/delete'
import updatePartner from '@/components/partners/update'

export default {
  props: {
    id: {
      type: Number
    }
  },
  components: {
    'delete-partner-contract': deletePartner,
    'update-partner-contract': updatePartner
  },
  computed: {
    ...mapGetters({ partner: 'getCurrentPartner' })
  },
  methods: {
    ...mapActions({ fetchCurrentPartner: 'fetchCurrentPartner' })
  },
  created () {
    this.fetchCurrentPartner(this.id)
  }
}
</script>
