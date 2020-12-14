<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Update Buyer Group</template>
    <template v-slot:body>
      <div class="form-horizontal">
        <validation-observer ref="form">
          <form @submit.prevent="submitForm">
            <v-text-field v-model="name" rules="required" field_id="name" field_label="Name"></v-text-field>
          </form>
        </validation-observer>
        <div class="field-group">
          <label class="field-label field-label-top">Buyers</label>
          <buyer-tree></buyer-tree>
        </div>
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
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { checkUnsavedChangesInModal } from '@/mixins/check-unsaved-changes-in-modal'
import buyerTree from '@/components/buyer-groups/buyer-tree'

export default {
  data () {
    return {
      name: ''
    }
  },
  updated () {
    if (this.buyerGroup) {
      this.name = this.buyerGroup.name
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowUpdateBuyerGroupModal',
      buyerGroup: 'getCurrentBuyerGroup'
    }),
    unsavedChanges () {
      if (this.name) {
        return this.name !== this.buyerGroup.name
      } else {
        return false
      }
    }
  },
  watch: {
    showModal () {
      if (this.showModal) {
        this.closeCreateForm()
      }
    },
    unsavedChanges () {
      this.checkUnsavedChanges(this.showModal, this.unsavedChanges)
    }
  },
  mixins: [setResponseErrors, checkUnsavedChangesInModal, enterKeyListener],
  methods: {
    ...mapActions({
      updateBuyerGroup: 'updateBuyerGroup'
    }),
    ...mapMutations({
      closeCreateForm: 'CLOSE_CREATE_BUYER_GROUP_FORM',
      resetCurrentBuyerGroup: 'RESET_CURRENT_BUYER_GROUP',
      closeModal: 'CLOSE_UPDATE_BUYER_GROUP_MODAL'
    }),
    close () {
      this.resetCurrentBuyerGroup()
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
      this.toggleChangesInModalUnsaved(false)
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.updateBuyerGroup({
            name: this.name,
            id: this.buyerGroup.id
          }).then(() => { this.close() })
            .catch(error => {
              this.error = error
            })
        }
      })
    }
  },
  components: {
    'buyer-tree': buyerTree
  }
}
</script>
