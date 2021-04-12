<template>
  <panel-template title="Additional Content" :showLoader="loading" :loadingText="loadingText">
    <template v-slot:action>
      <button class="btn btn-turquoise" @click="showModal('add')"><font-awesome-icon icon="plus"></font-awesome-icon> Add Content</button>
    </template>
    <template v-slot:content>
      <list-content :client-slug="clientSlug"/>
      <create-update-modal/>
    </template>
  </panel-template>
</template>

<script>
import { mapActions } from 'vuex'
import createUpdateModal from './create-update/index'
import listContent from './list'

export default {
  props: {
    loading: Boolean,
    loadingText: String,
    clientSlug: String
  },
  methods: {
    ...mapActions({
      showModal: 'showAdditionalFormContentModal'
    })
  },
  components: {
    'create-update-modal': createUpdateModal,
    'list-content': listContent
  }
}
</script>
