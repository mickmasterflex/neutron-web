<template>
  <div>
    <ul class="tr flex flex-row">
      <li class="td border-l border-b border-gray-200 w-32">
        <span v-if="state.buyers.length" @click="toggleChildrenVisibilty()" class="p-1 mr-1 cursor-pointer">
          <font-awesome-icon v-if="!childrenVisibility" icon="caret-right" class="text-gray-500 hover:text-gray-700"></font-awesome-icon>
          <font-awesome-icon v-if="childrenVisibility" icon="caret-down" class="text-gray-800"></font-awesome-icon>
        </span>
        <slot name="checkbox">
          <checkbox-field
            :field_id="type + obj.id"
            @input="check()"
            :value="state.checked"
            :indeterminate="state.indeterminate"
            :disabled="state.disabled"
          ></checkbox-field>
        </slot>
        {{type}}
      </li>
      <li class="td border-b border-gray-200 w-64">{{obj.name}}</li>
      <li class="td border-r border-b border-gray-200 w-32">{{obj.buyer_group}}</li>
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

function client (root, clientId) {
  const state = reactive({
    buyers: computed(
      () => root.$store.getters.getParentlessBuyersByClient(clientId)
    ),
    buyersInGroup: computed(
      () => state.buyers.filter(b => b.buyer_group === state.currentBuyerGroup.id)
    ),
    buyersNotInGroup: computed(
      () => state.buyers.filter(b => b.buyer_group !== state.currentBuyerGroup.id)
    ),
    areAllBuyersInGroup: computed(
      () => state.buyers.length === state.buyersInGroup.length
    ),
    checked: computed(
      () => state.buyers.length > 0 && state.areAllBuyersInGroup
    ),
    currentBuyerGroup: computed(
      () => root.$store.getters.getCurrentBuyerGroup
    ),
    disabled: computed(
      () => state.buyers.length === 0
    ),
    indeterminate: computed(
      () => state.buyersInGroup.length > 0 && !state.areAllBuyersInGroup
    )
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
        updatedBuyer.buyer_group = state.currentBuyerGroup.id
        root.$store.dispatch('updateBuyer', updatedBuyer)
      })
    }
  }
  return {
    state,
    check
  }
}

function buyer (root, buyerId) {
  const state = reactive({
    buyer: computed(
      () => root.$store.getters.getBuyerById(buyerId)
    ),
    buyers: computed(
      () => root.$store.getters.getBuyersByParent(buyerId)
    ),
    isBuyerInGroup: computed(
      () => state.buyer.buyer_group === state.currentBuyerGroup.id
    ),
    buyersInGroup: computed(
      () => state.buyers.filter(b => b.buyer_group === state.currentBuyerGroup.id)
    ),
    areAllBuyersInGroup: computed(
      () => state.buyers.length === state.buyersInGroup.length
    ),
    checked: computed(() => {
      if (state.isBuyerInGroup) {
        return true
      } else return state.buyersInGroup.length > 0 && state.areAllBuyersInGroup
    }),
    currentBuyerGroup: computed(
      () => root.$store.getters.getCurrentBuyerGroup
    ),
    // disabled: computed(() => buyer.buyer_group.inherited),
    indeterminate: computed(
      () => state.buyersInGroup.length > 0 && !state.areAllBuyersInGroup
    )
  })
  function check () {
    const updatedBuyer = state.buyer
    updatedBuyer.buyer_group = state.isBuyerInGroup ? null : state.currentBuyerGroup.id
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
    const { state, check } = props.type === 'client' ? client(root, props.obj.id, currentBuyerGroup.value) : buyer(root, props.obj.id, currentBuyerGroup.value)

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
