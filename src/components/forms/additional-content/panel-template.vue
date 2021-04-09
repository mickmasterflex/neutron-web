<template>
  <panel-template title="Additional Content" :showLoader="loading" :loadingText="loadingText">
    <template v-slot:action>
      <button class="btn btn-turquoise" @click="showCreateAdditionalFormContentModal()"><font-awesome-icon icon="plus"></font-awesome-icon> Add Content</button>
    </template>
    <template v-slot:content>
      <create-content></create-content>
    </template>
  </panel-template>
</template>

<script>
import { mapMutations } from 'vuex'
import createContentModal from '@/components/forms/additional-content/create'

export default {
  props: {
    loading: Boolean,
    loadingText: String
  },
  methods: {
    ...mapMutations({
      showCreateAdditionalFormContentModal: 'SHOW_CREATE_ADDITIONAL_FORM_CONTENT_MODAL'
    })
  },
  components: {
    'create-content': createContentModal
  }
}
</script>
