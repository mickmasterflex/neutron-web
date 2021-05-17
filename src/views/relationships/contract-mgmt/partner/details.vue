<template>
  <base-panel-grid>
    <update-partner-contract :partner="partner" class="col-span-2 xl:col-span-1" :showLoader="loading" :loadingText="loadingText"></update-partner-contract>
    <financial-info :partner="partner" class="col-span-2 xl:col-span-1" :showLoader="loading" :loadingText="loadingText"/>
    <lead-caps :caps-parent-id="id" caps-parent-type="partners"/>
    <alternate-ids :partner="partner" class="col-span-2" :showLoader="loading" loadingText="Loading Partner and Alternate Ids"/>
    <panel-template title="Danger Zone" class="col-span-2" :showLoader="loading" :loadingText="loadingText">
      <template v-slot:content>
        <delete-partner-contract :client="$route.params.client" :id="partner.id" :parent="partner.parent"></delete-partner-contract>
      </template>
    </panel-template>
  </base-panel-grid>
</template>

<script>
import { mapGetters } from 'vuex'
import leadCaps from '@/components/caps/panel-template'
import deletePartner from '@/components/contracts/partners/delete'
import updatePartner from '@/components/contracts/partners/update'
import financialInfo from '@/components/contracts/partners/financial-update'
import altIds from '@/components/contracts/partners/alternate-ids/index'

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
    'alternate-ids': altIds,
    'delete-partner-contract': deletePartner,
    'financial-info': financialInfo,
    'update-partner-contract': updatePartner,
    'lead-caps': leadCaps
  }
}
</script>
