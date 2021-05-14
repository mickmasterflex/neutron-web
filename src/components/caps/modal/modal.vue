<template>
  <modal-template :show="showModal" @close="close" modalClass="modal-lg">
    <template v-slot:header>{{ capParent ? capParent.name : '' }} Caps</template>
    <template v-slot:body>
      <lead-caps class="relative"/>
    </template>
  </modal-template>
</template>

<script>
import leadCaps from '@/components/caps/index'

import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      showModal: 'getShowCapsModal',
      buyerById: 'getBuyerById',
      partnerById: 'getPartnerById',
      buyerByCapParentId: 'getBuyerByCapParentId',
      partnerByCapParentId: 'getPartnerByCapParentId',
      offerByCapParentId: 'getOfferByCapParentId',
      capsParentId: 'getCurrentCapsParentId',
      capsParentType: 'getCurrentCapsParentType'
    }),
    capParent () {
      const updatedParentOptions = {
        buyers: this.buyerByCapParentId(this.capsParentId),
        partners: this.partnerByCapParentId(this.capsParentId),
        'offer-contracts': this.offerByCapParentId(this.capsParentId),
        relations: { name: 'Relation' }
      }
      return updatedParentOptions[this.capsParentType]
    }
  },
  methods: {
    ...mapMutations({
      closeModal: 'CLOSE_CAPS_MODAL'
    }),
    ...mapActions({
      capStateReset: 'capStateReset'
    }),
    close () {
      this.$emit('close')
      this.closeModal()
      this.capStateReset()
    }
  },
  components: {
    'lead-caps': leadCaps
  }
}
</script>
