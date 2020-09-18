<template>
  <div>
    <update-partner-contract :partner="partner"></update-partner-contract>
    <delete-partner-contract :client="$route.params.client" :id="partner.id" class="mt-4"></delete-partner-contract>
  </div>
</template>

<script>
import deletePartner from '@/components/partners/delete'
import updatePartner from '@/components/partners/update'
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      partner: 'getCurrentPartner'
    })
  },
  components: {
    'delete-partner-contract': deletePartner,
    'update-partner-contract': updatePartner
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
