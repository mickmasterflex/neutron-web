<template>
  <div>
    <ul class="tr flex flex-row">
      <li class="td border-l border-b border-gray-200 w-32">
        <span @click="toggleChildren(!childrenVisible)" class="p-1 mr-1 cursor-pointer">
          <font-awesome-icon v-if="!childrenVisible" icon="caret-right" class="text-gray-500 hover:text-gray-700"></font-awesome-icon>
          <font-awesome-icon v-if="childrenVisible" icon="caret-down" class="text-gray-800"></font-awesome-icon>
        </span>
        <checkbox-field :field_id="obj.id" @input="check()" v-model="checked"></checkbox-field> {{obj.type}}
      </li>
      <li class="td border-b border-gray-200 w-64">{{obj.name}}</li>
      <li class="td border-r border-b border-gray-200 w-32">{{obj.status}}</li>
    </ul>
    <div v-if="childrenVisible">
      <div v-for="buyer in buyers" :key="buyer.id" class="px-3">
          <parent-node :buyer="buyer" v-if="buyerHasChildren(buyer.id)" :key="buyer.id"></parent-node>
          <buyer-child :buyer="buyer" @buyerSaved="setCheck()" :key="buyer.id" v-else></buyer-child>
      </div>
    </div>
  </div>
</template>

<script>
import BuyerChild from '@/components/buyer-groups/table/tr/buyer'
import ParentNode from '@/components/buyer-groups/table/tr/parent'
import { mapGetters } from 'vuex'

export default {
  name: 'parent-node',
  props: {
    client: {
      type: Object
    },
    buyer: {
      type: Object
    }
  },
  data () {
    return {
      childrenVisible: false,
      checked: false,
      indeterminate: false
    }
  },
  methods: {
    check () {
      window.console.log('hi')
    },
    toggleChildren (boolean) {
      this.childrenVisible = boolean
    },
    buyerHasChildren (id) {
      return !!this.getBuyersByParent(id).length
    },
    setCheck () {
      let count = this.buyers.length
      let checkedChildren = 0
      this.buyers.forEach(buyer => {
        if (this.buyerHasChildren(buyer.id)) {
          count--
        } else if (buyer.buyer_group === this.currentBuyerGroup.id) {
          checkedChildren++
        }
      })
      if (count > 0 && checkedChildren === count) {
        this.checked = true
        this.indeterminate = false
      } else {
        this.checked = false
        this.indeterminate = true
      }
    }
  },
  computed: {
    ...mapGetters({
      getBuyersByParent: 'getBuyersByParent',
      getParentlessBuyersByClient: 'getParentlessBuyersByClient',
      // getBuyersByClient: 'getBuyersByClient'
      currentBuyerGroup: 'getCurrentBuyerGroup'
    }),
    buyers () {
      if (this.client) {
        return this.getParentlessBuyersByClient(this.client.id)
      } else if (this.buyer) {
        return this.getBuyersByParent(this.buyer.id)
      } else {
        return null
      }
    },
    obj () {
      if (this.client) {
        const client = this.client
        client.type = 'Client'
        return client
      } else if (this.buyer) {
        const buyer = this.buyer
        buyer.type = 'Buyer'
        return buyer
      } else {
        return null
      }
    }
  },
  watch: {
    currentBuyerGroup () {
      // if (this.client) {
      this.setCheck()
      // }
    }
  },
  created () {
    // if (this.client) {
    this.setCheck()
    // }
  },
  components: {
    'buyer-child': BuyerChild,
    'parent-node': ParentNode
  }
}
</script>
