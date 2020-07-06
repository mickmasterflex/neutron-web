<template>
  <partner-layout :id="id" contentTab="details">
    <template v-slot:content>
      <h3 class="h3 mb-2">Update Partner Contract</h3>
      <update-partner-contract :partner="partner"></update-partner-contract>
      <h3 class="h3 mt-5 mb-2">Delete Partner Contract</h3>
      <delete-partner-contract :client="partner.client" :id="id"></delete-partner-contract>
    </template>
  </partner-layout>
</template>

<script>
import partnerLayout from '@/views/relationships/partners/partner/layout'
import deletePartner from '@/components/partners/delete'
import updatePartner from '@/components/partners/update'
import { mapGetters } from 'vuex'

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      partner: 'getCurrentPartner'
    })
  },
  components: {
    'partner-layout': partnerLayout,
    'delete-partner-contract': deletePartner,
    'update-partner-contract': updatePartner
  }
}
</script>
