<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Update Pricing Tier Group</template>
    <template v-slot:body>
      <validation-observer ref="form" class="form-horizontal">
        <form @submit.prevent="submitForm">
          <v-text-field v-model="name" rules="required" field_id="name" field_label="Name"></v-text-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button class="btn btn-green btn-lg" @click="submitForm">Save All Changes</button>
    </template>
  </modal-template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { setResponseErrors } from '@/mixins/setResponseErrors'
import { enterKeyListener } from '@/mixins/enterKeyListener'
import { checkUnsavedChangesInModal } from '@/mixins/checkUnsavedChangesInModal'

export default {
  data () {
    return {
      name: ''
    }
  },
  props: {
    pricing_tier_groups: Object
  },
  updated () {
    if (this.pricingTierGroups) {
      this.name = this.pricingTierGroups.name
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowUpdatePricingTierGroupModal'
    }),
    unsavedChanges () {
      if (this.name) {
        return this.name !== this.pricingTierGroups.name
      } else {
        return false
      }
    }
  },
  watch: {
    unsavedChanges () {
      this.checkUnsavedChanges(this.showModal, this.unsavedChanges)
    }
  },
  mixins: [setResponseErrors, enterKeyListener, checkUnsavedChangesInModal],
  methods: {
    ...mapActions({
      updatePricingTierGroup: 'updatePricingTierGroup'
    }),
    ...mapMutations({
      resetCurrentPricingTierGroup: 'RESET_CURRENT_PRICING_TIER_GROUP',
      closeModal: 'CLOSE_UPDATE_PRICING_TIER_GROUP_MODAL'
    }),
    enterKeyAction () {
      if (this.showModal) {
        this.submitForm()
      }
    },
    close () {
      this.resetCurrentPricingTierGroup()
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
      this.toggleChangesInModalUnsaved(false)
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update({
            name: this.name
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
