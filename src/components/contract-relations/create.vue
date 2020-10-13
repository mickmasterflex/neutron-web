<template>
  <div>
    <button class="btn btn-turquoise" @click="showForm()" v-show="!formVisible">
      <font-awesome-icon icon="plus"></font-awesome-icon>
      New {{ capitalized(contractType) }} Relation
    </button>
    <transition enter-active-class="animate__animated animate__slideInRight animate__fast">
      <div class="flex flex-row items-start" v-show="formVisible">
        <validation-observer ref="form">
          <form @submit.prevent="submitForm" class="form-horizontal form-horizontal-slim">
            <v-select-field :options="newRelationContracts()" v-model="selectedContract" rules="required" field_class="field-tall" field_label="Select Contract" field_id="contractNewRelation"></v-select-field>
          </form>
        </validation-observer>
        <button @click="submitForm()" class="btn btn-green ml-2">
           Create {{ capitalized(contractType) }} Relation
        </button>
      </div>
    </transition>
  </div>
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
    resetForm () {
      this.selectedContract = ''
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
    capitalized (value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    buyerContract () {
      return this.contractType === 'buyer'
    },
    newRelationContracts () {
      // TODO this can probably be optimized - only allows contracts that can be created to be shown
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
      this.fetchPartners()
    } else {
      this.fetchBuyers()
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
