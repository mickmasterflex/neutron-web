<template>
  <div>
    <action-heading>
      <template v-slot:heading>
        <h2 class="h3">Contract Fields</h2>
      </template>
      <template v-slot:right>
        <button class="btn btn-turquoise" @click="showCreateFieldModal(true)"><font-awesome-icon icon="plus"></font-awesome-icon> Add Field</button>
      </template>
    </action-heading>
    <create-field></create-field>
    <list-fields></list-fields>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import listFields from '@/components/forms/fields/list'
import createField from '@/components/forms/fields/create'

export default {
  props: {
    modalHeading: {
      type: String,
      default: 'Contract Offer Form Fields'
    }
  },
  components: {
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
