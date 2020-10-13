<template>
  <panel-template title="Contract Relations">
    <template v-slot:action>
      <create-contract-relation :currentContract="contract" :contractType="contractType" :contractRelations="contract_relations"></create-contract-relation>
    </template>
    <template v-slot:content>
      <contract-relations-list :contractRelations="contract_relations" :contractType="contractType"></contract-relations-list>
    </template>
  </panel-template>
</template>

<script>
import contractRelationsList from '@/components/contract-relations/list'
import createContractRelation from '@/components/contract-relations/create'

import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    'contract-relations-list': contractRelationsList,
    'create-contract-relation': createContractRelation
  },
  props: {
    contract: {
      type: Number,
      required: true
    },
    contractType: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getContractRelationsByBuyer: 'getContractRelationsByBuyer',
      getContractRelationsByPartner: 'getContractRelationsByPartner'
    }),
    contract_relations: function () {
      if (this.buyerContract() && this.contract) {
        return this.getContractRelationsByBuyer(this.contract)
      } else {
        return this.getContractRelationsByPartner(this.contract)
      }
    }
  },
  methods: {
    ...mapActions({
      fetchContractRelations: 'fetchContractRelations'
    }),
    buyerContract () {
      return this.contractType === 'buyer'
    }
  },
  created () {
    this.fetchContractRelations()
  }
}
</script>
