<template>
  <div>
    <update-partner-contract :partner="partner"></update-partner-contract>
    <panel-template title="Lead Caps" contentClass="relative">
      <template v-slot:content>
        <lead-caps :parent="id" type="partners"></lead-caps>
      </template>
    </panel-template>
    <panel-template title="Danger Zone">
      <template v-slot:content>
        <delete-partner-contract :client="$route.params.client" :id="partner.id"></delete-partner-contract>
      </template>
    </panel-template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import deletePartner from '@/components/partners/delete'
import updatePartner from '@/components/partners/update'
import leadCaps from '@/components/caps/'

export default {
  props: {
    id: Number
  },
  computed: {
    ...mapGetters({
      partner: 'getCurrentPartner'
    })
  },
  components: {
    'delete-partner-contract': deletePartner,
    'update-partner-contract': updatePartner,
    'lead-caps': leadCaps
  },
  methods: {
    ...mapActions({
      fetchPartners: 'fetchPartners'
    })
  },
  created () {
    this.fetchPartners()
  }
}
</script>
