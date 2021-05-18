<template>
  <base-panel-grid>
   <panel-template
     title="Fields"
     content-background-color="white"
     :show-loader="loading"
     :loading-text="loadingText"
     class="col-span-2"
   >
     <template slot="content">
       <fields-table :fields="fields"/>
     </template>
   </panel-template>
   <panel-template
     title="Offers"
     content-background-color="white"
     :show-loader="loading"
     :loading-text="loadingText"
     class="col-span-2"
   >
     <template slot="content">
       <offers-table :offers="fpi ? fpi.offer_contracts : []"/>
     </template>
   </panel-template>
    <panel-template
      title="Locations"
      content-background-color="white"
      :show-loader="loading"
      :loading-text="loadingText"
      class="col-span-2"
    >
      <template slot="content">
        <locations-table :locations="fpi ? fpi.buyer_contract_locations : []"/>
      </template>
    </panel-template>
  </base-panel-grid>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import fieldsTable from '@/components/forms/fpi/fields-list'
import offersTable from '@/components/forms/fpi/offer-contracts-list'
import locationsTable from '@/components/forms/fpi/locations-list'

export default {
  props: {
    id: Number
  },
  methods: {
    ...mapActions({
      fetchFpi: 'fetchCurrentFpi'
    })
  },
  computed: {
    ...mapGetters({
      loading: 'getFetchFpiLoading',
      loadingText: 'getFetchFpiLoadingText',
      fpi: 'getCurrentFpi'
    }),
    fields () {
      return this.fpi ? this.fpi.buyer_contract_fields.concat(this.fpi.offer_contract_fields) : []
    }
  },
  created () {
    this.fetchFpi(this.id)
  },
  components: {
    'fields-table': fieldsTable,
    'offers-table': offersTable,
    'locations-table': locationsTable
  }
}
</script>
