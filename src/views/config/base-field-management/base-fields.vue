<template>
  <div>
    <panel-template title="Base Fields" :showLoader="loading" :loadingText="loadingText" contentBackgroundColor="white">
      <template slot="action">
        <button class="btn btn-turquoise" @click="openCreateBaseField()"><font-awesome-icon icon="plus"></font-awesome-icon> New Field</button>
      </template>
      <template slot="content">
        <list-base-fields></list-base-fields>
      </template>
    </panel-template>
    <component :is="current_base_field_modal" :field="currentBaseField"></component>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import createBaseField from '@/components/forms/base-fields/create'
import listBaseFields from '@/components/forms/base-fields/list'
import updateBaseField from '@/components/forms/base-fields/update'
import updateBaseOptions from '@/components/forms/base-fields/options/modal'

export default {
  data () {
    return {
      current_base_field_modal: null
    }
  },
  methods: {
    ...mapMutations({
      showCreateBaseFieldModal: 'SHOW_CREATE_BASE_FIELD_MODAL',
      showUpdateBaseFieldModal: 'SHOW_UPDATE_BASE_FIELD_MODAL',
      showUpdateBaseOptionsModal: 'SHOW_UPDATE_BASE_OPTIONS_MODAL'
    }),
    ...mapActions({
      fetchBaseFields: 'fetchBaseFields'
    }),
    async setModalComponent (component) {
      this.current_base_field_modal = component
    },
    openCreateBaseField () {
      this.setModalComponent(createBaseField).then(() => {
        this.showCreateBaseFieldModal()
      })
    }
  },
  computed: {
    ...mapGetters({
      baseFieldCount: 'getBaseFieldCount',
      currentBaseField: 'getCurrentBaseField',
      currentBaseOptionsField: 'getCurrentBaseOptionsField',
      loading: 'getBaseFieldsFetchLoading',
      loadingText: 'getBaseFieldsFetchLoadingText'
    })
  },
  watch: {
    currentBaseField () {
      if (this.currentBaseField) {
        this.setModalComponent(updateBaseField).then(() => {
          this.showUpdateBaseFieldModal()
        })
      }
    },
    currentBaseOptionsField () {
      if (this.currentBaseOptionsField) {
        this.setModalComponent(updateBaseOptions).then(() => {
          this.showUpdateBaseOptionsModal()
        })
      }
    }
  },
  components: {
    createBaseField,
    updateBaseField,
    updateBaseOptions,
    listBaseFields
  }
}
</script>
