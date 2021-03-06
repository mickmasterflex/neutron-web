<template>
  <modal-template :show="showForm" @close="close">
    <template v-slot:header>Update Channel</template>
    <template v-slot:body>
      <div class="form-horizontal">
        <validation-observer ref="form">
          <form @submit.prevent="submitForm">
            <v-text-field v-model="name" rules="required" field_id="name" field_label="Name"></v-text-field>
          </form>
        </validation-observer>
      </div>
    </template>
    <template v-slot:footer-additional>
      <button v-show="unsavedChanges" class="btn btn-green btn-lg" @click="submitForm">Save Changes</button>
    </template>
  </modal-template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { setResponseErrors } from '@/mixins/set-response-errors'
import { checkUnsavedChangesInModal } from '@/mixins/check-unsaved-changes-in-modal'

export default {
  data () {
    return {
      name: ''
    }
  },
  updated () {
    if (this.channel) {
      this.name = this.channel.name
    }
  },
  computed: {
    ...mapGetters({
      showForm: 'getShowUpdateChannelForm',
      channel: 'getCurrentChannel'
    }),
    unsavedChanges () {
      if (this.name) {
        return this.name !== this.channel.name
      } else {
        return false
      }
    }
  },
  watch: {
    showForm () {
      if (this.showForm) {
        this.closeCreateForm()
      }
    },
    unsavedChanges () {
      this.checkUnsavedChanges(this.showForm, this.unsavedChanges)
    }
  },
  mixins: [setResponseErrors, checkUnsavedChangesInModal],
  methods: {
    ...mapActions({
      updateChannel: 'updateChannel'
    }),
    ...mapMutations({
      closeForm: 'CLOSE_UPDATE_CHANNEL_FORM',
      closeCreateForm: 'CLOSE_CREATE_CHANNEL_FORM'
    }),
    close () {
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeCreateForm()
      this.closeForm()
      this.toggleChangesInModalUnsaved(false)
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.updateChannel({
            name: this.name,
            id: this.channel.id
          }).then(() => { this.close() })
            .catch(error => {
              this.error = error
            })
        }
      })
    }
  }
}
</script>
