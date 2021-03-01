<template>
  <content-layout>
    <template v-slot:hud>
      <h1 class="h1 text-white">Fields</h1>
      <div class="hud--stat-cards">
        <stat-card :data="baseFieldCount" :title="`Fields`" :color="`teal`"></stat-card>
      </div>
    </template>
    <template v-slot:content>
      <panel-template title="Base Fields" :showLoader="loading" :loadingText="loadingText" contentBackgroundColor="white">
        <template slot="action">
          <button class="btn btn-turquoise" @click="openCreateBaseField()"><font-awesome-icon icon="plus"></font-awesome-icon> New Field</button>
        </template>
        <template slot="content">
          <list-base-fields></list-base-fields>
        </template>
      </panel-template>
      <component :is="current_base_field_modal" :field="currentBaseField"></component>
    </template>
  </content-layout>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import createBaseField from '@/components/forms/base-fields/create'
import listBaseFields from '@/components/forms/base-fields/list'
import updateBaseTextField from '@/components/forms/base-fields/text-fields/update'
import updateBaseOptionField from '@/components/forms/base-fields/option-fields/update'

export default {
  data () {
    return {
      current_base_field_modal: null
    }
  },
  methods: {
    ...mapMutations({
      showCreateBaseFieldModal: 'SHOW_CREATE_BASE_FIELD_MODAL',
      showUpdateBaseOptionFieldModal: 'SHOW_UPDATE_BASE_OPTION_FIELD_MODAL',
      showUpdateBaseTextFieldModal: 'SHOW_UPDATE_BASE_TEXT_FIELD_MODAL',
      resetBreadCrumbs: 'RESET_CURRENT_BREADCRUMBS'
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
      loading: 'getBaseFieldsFetchLoading',
      loadingText: 'getBaseFieldsFetchLoadingText'
    })
  },
  watch: {
    currentBaseField () {
      if (this.currentBaseField) {
        if (this.currentBaseField.type === 'select' || this.currentBaseField.type === 'radio') {
          this.setModalComponent(updateBaseOptionField).then(() => {
            this.showUpdateBaseOptionFieldModal()
          })
        } else if (this.currentBaseField.type === 'text' || this.currentBaseField.type === 'textarea') {
          this.setModalComponent(updateBaseTextField).then(() => {
            this.showUpdateBaseTextFieldModal()
          })
        }
      }
    }
  },
  components: {
    createBaseField,
    updateBaseTextField,
    updateBaseOptionField,
    'list-base-fields': listBaseFields
  },
  created () {
    this.resetBreadCrumbs()
    this.fetchBaseFields()
  }
}
</script>
