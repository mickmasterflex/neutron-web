<template>
  <buyer-layout :id="id" contentTab="field-management">
    <template v-slot:content>
      <action-heading>
        <template v-slot:left>
          <h2 class="h3">Contract Fields</h2>
        </template>
        <template v-slot:right>
          <button class="btn btn-turquoise" @click="showCreateFieldModal(true)"><font-awesome-icon icon="plus"></font-awesome-icon> Add Field</button>
        </template>
      </action-heading>
      <create-field></create-field>
      <list-fields></list-fields>
    </template>
  </buyer-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import buyerLayout from '@/views/relationships/buyers/buyer/layout'
import listFields from '@/components/forms/fields/list'
import createField from '@/components/forms/fields/create'

export default {
  props: {
    id: {
      type: Number
    }
  },
  computed: {
    ...mapGetters({
      buyer: 'getCurrentBuyer'
    })
  },
  components: {
    'buyer-layout': buyerLayout,
    'list-fields': listFields,
    'create-field': createField
  },
  methods: {
    ...mapMutations({
      showCreateFieldModal: 'SHOW_CREATE_FIELD_MODAL'
    })
  }
}
</script>
