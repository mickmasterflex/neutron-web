<template>
  <div>
    <ul class="tr flex flex-row">
      <li class="td w-32">
        <span v-if="!childrenVisible" @click="toggleChildren(true)" class="p-1 mr-1 cursor-pointer">
          <font-awesome-icon icon="caret-right" class="text-gray-500 hover:text-gray-700"></font-awesome-icon>
        </span>
        <span v-if="childrenVisible" @click="toggleChildren(false)" class="p-1 mr-1 cursor-pointer">
          <font-awesome-icon icon="caret-down" class="text-gray-800"></font-awesome-icon>
        </span>
        <checkbox-field :field_id="obj.id" @input="check()" v-model="checked"></checkbox-field> {{obj.type}}
      </li>
      <li class="td w-64">{{obj.name}}</li>
      <li class="td w-32">{{obj.status}}</li>
    </ul>
    <div v-if="childrenVisible">
      <div v-for="buyer in buyers" :key="buyer.id" class="px-6">
        <parent-node :buyer="buyer" v-if="buyerHasChildren(buyer.id)"></parent-node>
        <buyer-child :buyer="buyer" v-else></buyer-child>
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
      checked: false
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
    }
  },
  computed: {
    ...mapGetters({
      getBuyersByParent: 'getBuyersByParent',
      getParentlessBuyersByClient: 'getParentlessBuyersByClient'
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
  components: {
    'buyer-child': BuyerChild,
    'parent-node': ParentNode
  }
}
</script>
