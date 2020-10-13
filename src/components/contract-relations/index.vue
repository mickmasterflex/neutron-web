<template>
  <panel-template title="Contract Relations">
    <template v-slot:action>
      <button>New Buyer Relation</button>
    </template>
    <template v-slot:content>
      <contract-relations-list :contractRelations="contract_relations" contractType="buyer"></contract-relations-list>
    </template>
  </panel-template>
</template>

<script>
import contractRelationsList from '@/components/contract-relations/list'

import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    'contract-relations-list': contractRelationsList
  },
  props: {
    buyer: {
      type: Number
    }
  },
  computed: {
    ...mapGetters({
      getContractRelationsByBuyer: 'getContractRelationsByBuyer'
    }),
    contract_relations: function () {
      return this.getContractRelationsByBuyer(this.buyer)
    }
  },
  methods: {
    ...mapActions({
      fetchContractRelations: 'fetchContractRelations'
    })
  },
  created () {
    this.fetchContractRelations()
  }
}
</script>
