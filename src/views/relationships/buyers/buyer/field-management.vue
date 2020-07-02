<template>
  <buyer-layout :id="id" contentTab="field-management">
    <template v-slot:content>
      <button class="btn btn-blue" @click="showFieldManagementModal">
        <font-awesome-icon icon="wrench"></font-awesome-icon> Modify Contract Offer Form Template
      </button>
      <field-management :modal-heading="`${buyer.name}`"></field-management>
    </template>
  </buyer-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import buyerLayout from '@/views/relationships/buyers/buyer/layout'
import fieldManagement from '@/components/forms/fields/field-management'

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
  methods: {
    ...mapMutations({
      showFieldManagementModal: 'SHOW_FIELD_MANAGEMENT_MODAL'
    })
  },
  components: {
    'buyer-layout': buyerLayout,
    'field-management': fieldManagement
  }
}
</script>
