<template>
  <div>
    <ul class="tr flex flex-row">
      <li class="td border-l border-b border-gray-200 w-32">
        <span v-if="state.children.length" @click="toggleChildrenVisible()" class="p-1 mr-1 cursor-pointer">
          <font-awesome-icon v-if="!childrenVisible" icon="caret-right" class="text-gray-500 hover:text-gray-700"></font-awesome-icon>
          <font-awesome-icon v-if="childrenVisible" icon="caret-down" class="text-gray-800"></font-awesome-icon>
        </span>
        <slot name="checkbox">
          <checkbox-field
            :field_id="type + obj.id"
            @input="check()"
            :value="checkboxState.checked"
            :indeterminate="checkboxState.indeterminate"
            :disabledVisually="checkboxState.disabled"
          ></checkbox-field>
        </slot>
        {{type}}
      </li>
      <li class="td border-b border-gray-200 w-16">{{obj.id}}</li>
      <li class="td border-b border-gray-200 w-64">{{obj.name}}</li>
      <li class="td border-b border-gray-200 w-32">{{obj.status ? obj.status : 'active'}}</li>
      <li class="td border-r border-b border-gray-200 w-24">{{state.children.length}}</li>
    </ul>
    <div v-show="childrenVisible">
      <!-- Vue3 Migration: Refactor and use function refs. https://v3.vuejs.org/guide/composition-api-template-refs.html#usage-inside-v-for -->
      <buyer-tree-node
        v-for="buyer in state.children"
        :ref="buyer.id"
        :obj="buyer"
        :key="buyer.id"
        class="pl-3"></buyer-tree-node>
    </div>
  </div>
</template>

<script>
import buyerTreeNode from '@/components/buyer-groups/buyer-tree/node'
import { computed, inject, ref, reactive } from '@vue/composition-api'
import { failedToast } from '@/mixins/toast-messages'

function useChildVisibility () {
  const childrenVisible = ref(false)

  function toggleChildrenVisible () {
    childrenVisible.value = !childrenVisible.value
  }
  return {
    childrenVisible,
    toggleChildrenVisible
  }
}

function useClient (clientId, currentBuyerGroupId, refs, store) {
  const checkboxState = reactive({
    checked: computed(() => {
      return checkboxState.checkedImplied
    }),
    checkedImplied: computed(
      () => state.children.length > 0 && computedState.areAllChildrenInGroup
    ),
    disabled: computed(
      () => state.children.length === 0
    ),
    indeterminate: computed(
      () => !checkboxState.checked && computedState.childrenInGroup.length > 0 && !computedState.areAllChildrenInGroup
    )
  })
  const computedState = reactive({
    childrenInGroup: computed(
      () => state.children.filter(b => b.buyer_group === currentBuyerGroupId.value)
    ),
    // buyersNotInGroup: computed(
    //   () => state.children.filter(b => b.buyer_group !== currentBuyerGroupId.value)
    // ),
    areAllChildrenInGroup: computed(
      () => state.children.length === computedState.childrenInGroup.length
    )
  })
  const state = reactive({
    children: computed(() => store.getters.getParentlessBuyersByClient(clientId))
  })
  function check () {
    Object.keys(refs).forEach(key => {
      const buyer = refs[key][0]
      if (computedState.areAllChildrenInGroup) {
        // Runs check() on all checked buyers if all are checked
        buyer.check()
      } else if (!buyer.checkboxState.checked) {
        // Runs check() only on unchecked buyers
        buyer.check()
      }
    })
  }
  return {
    check,
    checkboxState,
    state
  }
}

function useBuyer (buyerId, currentBuyerGroupId, refs, store) {
  const checkboxState = reactive({
    checked: computed(() => {
      if (computedState.isBuyerInGroup) {
        return true
      } else return checkboxState.checkedImplied
    }),
    checkedImplied: computed(
      () => (computedState.childrenInGroup.length > 0 && computedState.areAllChildrenInGroup) ||
                    computedState.buyerInheritsCurrentBuyerGroup
    ),
    disabled: computed(
      () => computedState.buyerInOtherGroup ||
                   state.buyer.inherited_buyer_group !== null
    ),
    indeterminate: computed(
      () => !checkboxState.checked &&
                   computedState.childrenInGroup.length > 0 &&
                   !computedState.areAllChildrenInGroup
    )
  })
  const computedState = reactive({
    isBuyerInGroup: computed(
      () => state.buyer.buyer_group === currentBuyerGroupId.value
    ),
    childrenInGroup: computed(
      () => state.children.filter(b => b.buyer_group === currentBuyerGroupId.value)
    ),
    areAllChildrenInGroup: computed(
      () => state.children.length === computedState.childrenInGroup.length
    ),
    buyerInOtherGroup: computed(
      () => state.buyer.buyer_group !== null &&
                   state.buyer.buyer_group !== currentBuyerGroupId.value
    ),
    buyerInheritsCurrentBuyerGroup: computed(
      () => {
        if (state.buyer.inherited_buyer_group) {
          return state.buyer.inherited_buyer_group.buyer_group === currentBuyerGroupId.value
        }
      }
    )
  })
  const state = reactive({
    buyer: computed(
      () => store.getters.getBuyerById(buyerId)
    ),
    children: computed(
      () => store.getters.getBuyersByParent(buyerId)
    )
  })
  function check () {
    if (checkboxState.checkedImplied && !computedState.isBuyerInGroup && !checkboxState.disabled) {
      Object.keys(refs).forEach(key => {
        const buyer = refs[key][0]
        buyer.check()
      })
    } else if (checkboxState.disabled) {
      handleToastErrorMessages()
    } else {
      const updatedBuyer = { ...state.buyer }
      updatedBuyer.buyer_group = computedState.isBuyerInGroup ? null : currentBuyerGroupId.value
      store.dispatch('updateBuyerGroupForBuyer', updatedBuyer).then(() => {
        store.commit('SET_CURRENT_INHERITED_BUYER_GROUP', null)
      })
    }
  }
  function handleToastErrorMessages () {
    if (computedState.buyerInOtherGroup) {
      const conflictingGroup = store.getters.getBuyerGroupById(state.buyer.buyer_group)[0]
      failedToast({
        heading: 'Conflicting Buyer Group',
        content: `Remove '${state.buyer.name}' from '${conflictingGroup.name}' in order to assign it to another group.`
      })
    } else if (state.buyer.inherited_buyer_group.contract) {
      const buyerParent = store.getters.getBuyerById(state.buyer.inherited_buyer_group.contract)
      failedToast({
        heading: 'Buyer Group Inheritance Error',
        content: `Remove the parent '${buyerParent.name}' from the buyer group '${state.buyer.inherited_buyer_group.name}' in order assign '${state.buyer.name}' to another buyer group.`
      })
    } else {
      failedToast({ heading: 'An Unknown Error Occurred' })
    }
  }
  return {
    check,
    checkboxState,
    state
  }
}

export default {
  name: 'buyer-tree-node',
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
  setup (props, setupContext) {
    const store = inject('vuex-store')
    // Vue3 Migration: setupContext.refs will not be available in vue3. Refactor and use function refs. https://v3.vuejs.org/guide/composition-api-template-refs.html#usage-inside-v-for
    const refs = setupContext.refs

    const { childrenVisible, toggleChildrenVisible } = useChildVisibility()

    const currentBuyerGroupId = computed(() => store.getters.getCurrentBuyerGroup.id)
    const { check, checkboxState, state } =
      props.type === 'client'
        ? useClient(props.obj.id, currentBuyerGroupId, refs, store)
        : useBuyer(props.obj.id, currentBuyerGroupId, refs, store)

    return {
      check,
      checkboxState,
      childrenVisible,
      state,
      toggleChildrenVisible
    }
  },
  components: {
    'buyer-tree-node': buyerTreeNode
  }
}
</script>
