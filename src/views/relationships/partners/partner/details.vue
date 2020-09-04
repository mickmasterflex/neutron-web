<template>
  <div>
    <update-partner-contract :partner="partner"></update-partner-contract>
    <day-caps :parent="partner"></day-caps>
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
import dayCaps from '@/components/caps/day/'

export default {
  computed: {
    ...mapGetters({
      partner: 'getCurrentPartner'
    })
  },
  components: {
    'delete-partner-contract': deletePartner,
    'update-partner-contract': updatePartner,
    'day-caps': dayCaps
  }
}
</script>
