<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Change Pricing Tier Group</template>
    <template v-slot:body>
      <validation-observer ref="form" class="form-horizontal">
        <form @submit.prevent="submitForm">
          <v-select-field v-model="pricing_tier_group"
                          :options="pricing_tier_groups"
                          field_label="Pricing Tier Group">
          </v-select-field>
          <list-tiers class="ml-label-width"
                      tableWidth="auto"
                      emptyTableClass="max-w-sm well"
                      v-if="currentGroup"
                      :pricingTiers='currentGroup.pricingtier_set'>
          </list-tiers>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm" class="btn btn-green btn-lg" v-show="unsavedChanges">Save Changes</button>
    </template>
  </modal-template>
</template>

<script>
import listTiers from '@/components/pricing-tiers/list'

import { mapActions, mapGetters, mapMutations } from 'vuex'
import { setResponseErrors } from '@/mixins/set-response-errors'
import { checkUnsavedChangesInModal } from '@/mixins/check-unsaved-changes-in-modal'

export default {
  data () {
    return {
      pricing_tier_group: ''
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowRelationPricingTierGroupModal',
      getPricingTierGroupById: 'getPricingTierGroupById',
      contractRelation: 'getCurrentContractRelation'
    }),
    currentGroup () {
      return this.getPricingTierGroupById(Number(this.pricing_tier_group))
    },
    unsavedChanges () {
      return this.pricing_tier_group !== this.contractRelation.pricing_tier_group
    }
  },
  updated () {
    if (this.contractRelation) {
      this.pricing_tier_group = this.contractRelation.pricing_tier_group
    }
  },
  watch: {
    unsavedChanges () {
      this.checkUnsavedChanges(this.showModal, this.unsavedChanges)
    }
  },
  props: {
    pricing_tier_groups: Array
  },
  components: {
    'list-tiers': listTiers
  },
  mixins: [setResponseErrors, checkUnsavedChangesInModal],
  methods: {
    ...mapActions({
      update: 'updateContractRelation'
    }),
    ...mapMutations({
      resetCurrentPricingTierGroup: 'RESET_CURRENT_PRICING_TIER_GROUP',
      closeModal: 'CLOSE_RELATION_PRICING_TIER_GROUP_MODAL'
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
            id: this.contractRelation.id,
            buyer_contract: this.contractRelation.buyer_contract,
            partner_contract: this.contractRelation.partner_contract,
            pricing_tier_group: this.pricing_tier_group
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
