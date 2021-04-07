<template>
  <modal-template :show="modalVisible" @close="close">
    <template v-slot:header>Create Reason</template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal">
          <v-text-field
            v-model="name"
            rules="required|standard_chars"
            field_id="name"
            field_label="Name"
            :field_disabled="loading"></v-text-field>
          <v-textarea-field
            v-model="description"
            rules="required|standard_chars"
            field_id="description"
            field_label="Description"
            :field_disabled="loading"></v-textarea-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-lg btn-green" :disabled="loading">
        <font-awesome-icon v-if="loading" icon="spinner" pulse></font-awesome-icon> Create Reason
      </button>
    </template>
  </modal-template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { setResponseErrors } from '@/mixins/set-response-errors'

export default {
  data () {
    return {
      name: '',
      description: ''
    }
  },
  computed: {
    ...mapGetters({
      modalVisible: 'getShowCreateReasonModal',
      loading: 'getReasonsPostLoading'
    })
  },
  mixins: [enterKeyListener, setResponseErrors],
  methods: {
    ...mapActions({
      createReason: 'createReason'
    }),
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_REASON_MODAL'
    }),
    close () {
      this.name = ''
      this.description = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.createReason({
            name: this.name,
            description: this.description
          }).then(() => {
            this.close()
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  }
}
</script>
