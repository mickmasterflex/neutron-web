<template>
  <div>
    <update-partner-contract :partner="partner"></update-partner-contract>
    <panel-template title="Lead Caps" contentClass="relative">
      <template v-slot:content>
        <lead-caps :parent="$route.params.id" type="partners"></lead-caps>
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
import { mapGetters } from 'vuex'
import deletePartner from '@/components/partners/delete'
import updatePartner from '@/components/partners/update'
import leadCaps from '@/components/caps/'

export default {
  computed: {
    ...mapGetters({
      partner: 'getCurrentPartner'
    })
  },
  components: {
    'delete-partner-contract': deletePartner,
    'update-partner-contract': updatePartner,
    'lead-caps': leadCaps
  }
}
</script>
