<template>
  <base-panel-grid>
    <update-partner-contract :partner="partner" class="col-span-2 xl:col-span-1"></update-partner-contract>
    <panel-template title="Lead Caps" contentClass="relative" class="col-span-2">
      <template v-slot:content>
        <lead-caps :parent="id" type="partners"></lead-caps>
      </template>
    </panel-template>
    <panel-template title="Danger Zone" class="col-span-2">
      <template v-slot:content>
        <delete-partner-contract :client="$route.params.client" :id="partner.id" :parent="partner.parent"></delete-partner-contract>
      </template>
    </panel-template>
  </base-panel-grid>
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
