<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create Partner Contract</template>
    <template v-slot:body>
  <validation-observer ref="form">
    <form @submit.prevent="submitForm" class="form-horizontal">
      <v-text-field v-model="name" rules="required" field_id="name" field_label="Name"></v-text-field>
      <v-select-field v-model="pricing_tier_group" :options="pricingTierGroups" field_label="Pricing Tier Group"></v-select-field>
      <list-tiers class="ml-label-width" tableWidth="auto" emptyTableClass="max-w-sm well" v-if="currentGroup" :pricingTiers='currentGroup.pricingtier_set'></list-tiers>
    </form>
  </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-lg btn-green">Create Partner Contract</button>
    </template>
  </modal-template>
</template>

<script>
import listTiers from '@/components/pricing-tiers/list'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { setResponseErrors } from '@/mixins/set-response-errors'

export default {
  data () {
    return {
      name: '',
      pricing_tier_group: ''
    }
  },
  components: {
    'list-tiers': listTiers
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowCreatePartnerModal',
      pricingTierGroups: 'getPricingTierGroups',
      getPricingTierGroupById: 'getPricingTierGroupById'
    }),
    currentGroup () {
      return this.getPricingTierGroupById(Number(this.pricing_tier_group))
    }
  },
  props: {
    client: {
      type: Number
    },
    parent: {
      type: Number
    }
  },
  mixins: [enterKeyListener, setResponseErrors],
  methods: {
    ...mapActions({
      create: 'createPartner',
      fetchPricingTierGroupsGroups: 'fetchPricingTierGroups'
    }),
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_PARTNER_MODAL'
    }),
    close () {
      this.name = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.create({
            name: this.name,
            parent: this.parent,
            client: this.$props.client,
            pricing_tier_group: this.pricing_tier_group
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
