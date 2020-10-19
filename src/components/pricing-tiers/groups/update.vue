<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Update Pricing Tier Group</template>
    <template v-slot:body>
      <div class="form-horizontal">
        <validation-observer ref="form">
          <form @submit.prevent="submitForm">
            <v-text-field v-model="name" rules="required" field_id="name" field_label="Name"></v-text-field>
          </form>
         <div class="field-group" v-if="pricingTiers.length">
           <label class="field-label">Tiers</label>
           <list-tiers></list-tiers>
         </div>
        </validation-observer>
        <div class="field-group">
          <label class="field-label">Create Tier</label>
          <create-pricing-tier></create-pricing-tier>
        </div>
      </div>
    </template>
    <template v-slot:footer-additional>
      <button class="btn btn-green btn-lg" @click="submitForm">Save All Changes</button>
    </template>
  </modal-template>
</template>

<script>
import listTiers from '@/components/pricing-tiers/tiers/update-list'
import createPricingTier from '@/components/pricing-tiers/tiers/create'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { setResponseErrors } from '@/mixins/set-response-errors'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { checkUnsavedChangesInModal } from '@/mixins/check-unsaved-changes-in-modal'

export default {
  data () {
    return {
      name: ''
    }
  },
  props: {
    pricingTier: Object
  },
  components: {
    'list-tiers': listTiers,
    'create-pricing-tier': createPricingTier
  },
  updated () {
    if (this.pricingTierGroup) {
      this.name = this.pricingTierGroup.name
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowUpdatePricingTierGroupModal',
      pricingTierGroup: 'getCurrentPricingTierGroup',
      pricingTiers: 'getCurrentPricingTiers'
    }),
    unsavedChanges () {
      if (this.name) {
        return this.name !== this.pricingTierGroup.name
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
      update: 'updatePricingTierGroup'
    }),
    ...mapMutations({
      resetCurrentPricingTierGroup: 'RESET_CURRENT_PRICING_TIER_GROUP',
      closeModal: 'CLOSE_UPDATE_PRICING_TIER_GROUP_MODAL'
    }),
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
            name: this.name,
            id: this.pricingTierGroup.id
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