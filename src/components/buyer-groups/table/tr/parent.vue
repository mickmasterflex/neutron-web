<template>
  <div>
    <ul class="tr flex flex-row">
      <li class="td border-l border-b border-gray-200 w-32">
        <span v-if="state.buyers.length" @click="toggleChildrenVisibilty()" class="p-1 mr-1 cursor-pointer">
          <font-awesome-icon v-if="!childrenVisibility" icon="caret-right" class="text-gray-500 hover:text-gray-700"></font-awesome-icon>
          <font-awesome-icon v-if="childrenVisibility" icon="caret-down" class="text-gray-800"></font-awesome-icon>
        </span>
        <slot name="checkbox">
          <checkbox-field :field_id="'buyer' + obj.id" @input="check()" :value="state.checked" :indeterminate="state.indeterminate"></checkbox-field>
        </slot>
        {{type}}
      </li>
      <li class="td border-b border-gray-200 w-64">{{obj.name}}</li>
      <li class="td border-r border-b border-gray-200 w-32">{{obj.status}}</li>
    </ul>
    <div v-if="childrenVisibility">
      <buyer-node v-for="buyer in state.buyers" :obj="buyer" :key="buyer.id" class="pl-3"></buyer-node>
    </div>
  </div>
</template>

<script>
import parent from '@/components/buyer-groups/table/tr/parent'
import { ref, reactive, computed } from '@vue/composition-api'

function buyerChildrenVisibility () {
  const childrenVisibility = ref(false)

  function toggleChildrenVisibilty () {
    childrenVisibility.value = !childrenVisibility.value
  }
  return {
    childrenVisibility,
    toggleChildrenVisibilty
  }
}

function client (root, client, currentBuyerGroup) {
  const state = reactive({
    buyers: computed(() => root.$store.getters.getParentlessBuyersByClient(client.id)),
    buyersInGroup: computed(() => state.buyers.filter(b => b.buyer_group === currentBuyerGroup.id)),
    buyersNotInGroup: computed(() => state.buyers.filter(b => b.buyer_group !== currentBuyerGroup.id)),
    checked: computed(() => state.buyers.length === state.buyersInGroup.length),
    indeterminate: computed(() => state.buyersInGroup.length > 0 && state.buyers.length !== state.buyersInGroup.length)
  })
  function check () {
    if (state.checked === true) {
      state.buyersInGroup.forEach(buyer => {
        const updatedBuyer = buyer
        updatedBuyer.buyer_group = null
        root.$store.dispatch('updateBuyer', updatedBuyer)
      })
    } else {
      state.buyersNotInGroup.forEach(buyer => {
        const updatedBuyer = buyer
        updatedBuyer.buyer_group = currentBuyerGroup.id
        root.$store.dispatch('updateBuyer', updatedBuyer)
      })
    }
  }
  return {
    state,
    check
  }
}

function buyer (root, buyer, currentBuyerGroup) {
  const state = reactive({
    buyers: computed(() => root.$store.getters.getBuyersByParent(buyer.id)),
    buyersInGroup: computed(() => state.buyers.filter(b => b.buyer_group === currentBuyerGroup.id)),
    checked: computed(() => buyer.buyer_group === currentBuyerGroup.id),
    indeterminate: computed(() => state.buyersInGroup.length > 0 && state.buyers !== state.buyersInGroup.length)
  })
  function check () {
    const updatedBuyer = buyer
    updatedBuyer.buyer_group = state.checked ? null : currentBuyerGroup.id
    root.$store.dispatch('updateBuyer', updatedBuyer)
  }
  return {
    state,
    check
  }
}

export default {
  name: 'buyer-node',
  props: {
    obj: Object,
    type: {
      type: String,
      default: 'buyer',
      validator: (value) => {
        return [
          'buyer',
          'client'
        ].includes(value)
      }
    }
  },
  setup (props, { root }) {
    const { childrenVisibility, toggleChildrenVisibilty } = buyerChildrenVisibility()

    const currentBuyerGroup = computed(() => root.$store.getters.getCurrentBuyerGroup)
    const { state, check } = props.type === 'client' ? client(root, props.obj, currentBuyerGroup.value) : buyer(root, props.obj, currentBuyerGroup.value)

    return {
      state,
      check,
      childrenVisibility,
      toggleChildrenVisibilty
    }
  },
  components: {
    'buyer-node': parent
  }
}
</script>
