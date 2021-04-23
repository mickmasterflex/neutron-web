<template>
  <panel-template
    title="Contract Fields"
    :actionTransition="true"
    :showLoader="loading"
    :loadingText="loadingText">
    <template v-slot:action>
      <create-field></create-field>
    </template>
    <template v-slot:content>
      <list-fields :contractName="contractName"></list-fields>
      <update-field :field="currentField"/>
    </template>
  </panel-template>
</template>

<script>
import listFields from '@/components/forms/fields/list'
import createField from '@/components/forms/fields/create'
import updateField from '@/components/forms/fields/update'
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    loading: Boolean,
    loadingText: String,
    contractName: String
  },
  data () {
    return {
      updateComponent: null
    }
  },
  components: {
    updateField,
    'list-fields': listFields,
    'create-field': createField
  },
  computed: {
    ...mapGetters({
      currentField: 'getCurrentField'
    })
  },
  watch: {
    currentField () {
      if (this.currentField) {
        this.showUpdateFieldModal()
      }
    }
  },
  methods: {
    ...mapMutations({
      showUpdateFieldModal: 'SHOW_UPDATE_FIELD_MODAL',
      showUpdateOptionFieldModal: 'SHOW_UPDATE_OPTION_FIELD_MODAL'
    })
  }
}
</script>
