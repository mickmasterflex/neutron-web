<template>
  <base-panel-grid>
    <update-partner-contract :partner="partner" class="col-span-2 xl:col-span-1" :showLoader="loading" :loadingText="loadingText"></update-partner-contract>
    <lead-caps :caps-parent-id="id" caps-parent-type="partners"/>
    <panel-template title="Danger Zone" class="col-span-2" :showLoader="loading" :loadingText="loadingText">
      <template v-slot:content>
        <delete-partner-contract :client="$route.params.client" :id="partner.id" :parent="partner.parent"></delete-partner-contract>
      </template>
    </panel-template>
  </base-panel-grid>
</template>

<script>
import { mapGetters } from 'vuex'
import deletePartner from '@/components/partners/delete'
import updatePartner from '@/components/partners/update'
import leadCaps from '@/components/caps/panel-template'

export default {
  props: {
    id: Number
  },
  computed: {
    ...mapGetters({
      partner: 'getCurrentPartner',
      loading: 'getPartnerFetchLoading',
      loadingText: 'getPartnerFetchLoadingText',
      loadingCaps: 'getCapsFetchLoading',
      loadingCapsText: 'getCapsFetchLoadingText'
    })
  },
  components: {
    'delete-partner-contract': deletePartner,
    'update-partner-contract': updatePartner,
    'lead-caps': leadCaps
  }
}
</script>
