<template>
  <div>
    <h3 class="h3 mb-2">Update Partner Contract</h3>
    <update-partner-contract :partner="partner"></update-partner-contract>
    <h3 class="h3 mt-5 mb-2">Delete Partner Contract</h3>
    <delete-partner-contract :client="partner.client" :id="partner.id"></delete-partner-contract>
  </div>
</template>

<script>
import deletePartner from '@/components/partners/delete'
import updatePartner from '@/components/partners/update'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      partner: 'getCurrentPartner'
    })
  },
  components: {
    'delete-partner-contract': deletePartner,
    'update-partner-contract': updatePartner
  }
}
</script>
