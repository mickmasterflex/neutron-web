<template>
  <v-tree-select
    :options="tree"
    v-model="inner_value"
    v-bind="$attrs"
    :show-count="true"
    :loading="loading"
    noChildrenText="No Contracts"
    field_id="parent"
    field_label="Parent"/>
</template>

<script>
import vTreeSelect from '@/components/ui/forms/validation-fields/select-tree-field'
import { mapGetters, mapActions } from 'vuex'
import validation from '@/mixins/fields/validation'

export default {
  props: {
    contractType: {
      type: String,
      required: true,
      validator: (value) => {
        return ['buyer', 'partner'].includes(value)
      }
    }
  },
  mixins: [validation],
  data () {
    return {
      tree: []
    }
  },
  computed: {
    ...mapGetters({
      loadingBuyers: 'getBuyersFetchLoading',
      loadingPartners: 'getPartnersFetchLoading',
      buyers: 'getAllBuyers',
      partners: 'getAllPartners',
      buyersByParent: 'getBuyersByParent',
      partnersByParent: 'getPartnersByParent',
      currentBuyer: 'getCurrentBuyer',
      currentPartner: 'getCurrentPartner',
      parentlessBuyersByClient: 'getParentlessBuyersByClient',
      parentlessPartnersByClient: 'getParentlessPartnersByClient'
    }),
    loading () {
      switch (this.contractType) {
        case 'buyer':
          return this.loadingBuyers
        case 'partner':
          return this.loadingPartners
        default:
          return false
      }
    },
    contracts () {
      switch (this.contractType) {
        case 'buyer':
          return this.buyers
        case 'partner':
          return this.partners
        default:
          return []
      }
    },
    currentContract () {
      switch (this.contractType) {
        case 'buyer':
          return this.currentBuyer
        case 'partner':
          return this.currentPartner
        default:
          return {}
      }
    }
  },
  methods: {
    ...mapActions({
      fetchBuyers: 'fetchBuyers',
      fetchPartners: 'fetchPartners'
    }),
    fetchContracts () {
      switch (this.contractType) {
        case 'buyer':
          return this.fetchBuyers()
        case 'partner':
          return this.fetchPartners()
      }
    },
    parentlessContractsByClient (client) {
      switch (this.contractType) {
        case 'buyer':
          return this.parentlessBuyersByClient(client)
        case 'partner':
          return this.parentlessPartnersByClient(client)
      }
    },
    contractsByParent (parent) {
      switch (this.contractType) {
        case 'buyer':
          return this.buyersByParent(parent)
        case 'partner':
          return this.partnersByParent(parent)
      }
    },
    generateTree () {
      this.tree = this.setParentlessContracts()
    },
    isCurrentContract (id) {
      return id === this.currentContract.id
    },
    setParentlessContracts () {
      let parentless = this.parentlessContractsByClient(this.currentContract.client)
      parentless = parentless.map(contract => {
        return {
          id: contract.id,
          label: contract.name,
          children: this.setContractsByParent(contract.id, this.isCurrentContract(contract.id)),
          isDisabled: this.isCurrentContract(contract.id)
        }
      })
      return parentless
    },
    setContractsByParent (parent, disabled) {
      return this.contractsByParent(parent).map(contract => {
        return {
          id: contract.id,
          label: contract.name,
          children: this.setContractsByParent(contract.id, disabled || this.isCurrentContract(contract.id)),
          isDisabled: disabled || this.isCurrentContract(contract.id)
        }
      })
    }
  },
  created () {
    if (!this.contracts.length) {
      this.fetchContracts().then(() => {
        this.generateTree()
      })
    } else {
      this.parentSelect()
    }
  },
  components: {
    'v-tree-select': vTreeSelect
  }
}
</script>
