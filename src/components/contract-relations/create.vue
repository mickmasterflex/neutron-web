<template>
  <tooltip-dialog-template button-color="turquoise" :show="formVisible" @close="closeForm" @open="showForm">
    <template v-slot:button-text>
      <font-awesome-icon icon="plus"></font-awesome-icon>
      New {{ relationType() }} Relation
    </template>
    <template v-slot:header>
      {{ relationType() }} Contract Selection
    </template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm">
          <v-select-field :options="newRelationContracts()"
                          v-model="selectedContract"
                          rules="required"
                          field_class="field-tall"
                          field_label="Contract"
                          field_id="contractNewRelation">
          </v-select-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-green ml-2">
        Create {{ relationType() }} Relation
      </button>
    </template>
  </tooltip-dialog-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      selectedContract: '',
      formVisible: false
    }
  },
  methods: {
    showForm () {
      this.formVisible = true
    },
    closeForm () {
      this.formVisible = false
    },
    resetForm () {
      this.selectedContract = ''
      this.closeForm()
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          let relationData
          if (this.buyerContract()) {
            relationData = {
              buyer_contract: this.currentContract,
              partner_contract: this.selectedContract
            }
          } else {
            relationData = {
              buyer_contract: this.selectedContract,
              partner_contract: this.currentContract
            }
          }
          this.createContractRelation(relationData).then(() => {
            this.resetForm()
          })
        }
      })
    },
    relationType () {
      return this.contractType === 'buyer' ? 'Partner' : 'Buyer'
    },
    buyerContract () {
      return this.contractType === 'buyer'
    },
    newRelationContracts () {
      // removes existing relationships from create options
      const buyerRelationContracts = []
      const partnerRelationContracts = []
      this.contractRelations.forEach(relation => {
        buyerRelationContracts.push(relation.buyer_contract)
        partnerRelationContracts.push(relation.partner_contract)
      })
      if (this.buyerContract()) {
        return this.partners.filter(partner => !partnerRelationContracts.includes(partner.id))
      }
      return this.buyers.filter(buyer => !buyerRelationContracts.includes(buyer.id))
    },
    ...mapActions({
      fetchBuyers: 'fetchBuyers',
      fetchPartners: 'fetchPartners',
      createContractRelation: 'createContractRelation'
    })
  },
  created () {
    if (this.buyerContract()) {
      if (!this.partners.length) {
        this.fetchPartners()
      }
    } else {
      if (!this.buyers.length) {
        this.fetchBuyers()
      }
    }
  },
  computed: {
    ...mapGetters({
      buyers: 'getAllBuyers',
      partners: 'getAllPartners',
      currentRelation: 'getCurrentContractRelation'
    })
  },
  props: {
    contractType: {
      type: String,
      required: true,
      validator: function (value) {
        return ['buyer', 'partner'].includes(value)
      }
    },
    currentContract: {
      type: Number,
      required: true
    },
    contractRelations: {
      type: Array,
      required: true
    }
  }
}
</script>
