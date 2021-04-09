<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Add Additional Content</template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal">
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-lg btn-green">Create Partner Contract</button>
    </template>
  </modal-template>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      showModal: 'getShowCreateAdditionalFormContentModal'
    })
  },
  methods: {
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_ADDITIONAL_FORM_CONTENT_MODAL'
    }),
    submitForm () {},
    close () {
      this.closeModal()
    }
  }
}
</script>
