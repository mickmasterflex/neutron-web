<template>
  <div class="mb-1"
       :class="`${tdExpanded ? `rounded-lg border-2 border-${accentColor}-200 overflow-hidden` : ''}`">
    <ul @click="toggleTdExpanded(expandable)"
        class="flex flex-row transition-colors duration-200"
        :class="`${expandable ? 'cursor-pointer' : ''} ${tdExpanded ? `bg-${accentColor}-100` : `bg-white hover:bg-${checkboxState.disabled && !computedState.buyerInheritsCurrentBuyerGroup > 0 ? 'red' : 'blue'}-100 rounded-lg`}`">
      <node-td class="w-32 flex flex-row">
        <div class="w-5">
          <div v-if="state.children.length || checkboxState.disabled" @click="toggleTdExpanded()" class="mr-1 w-5 cursor-pointer text-gray-500 hover:text-gray-700">
            <font-awesome-icon v-if="!tdExpanded" icon="caret-right"></font-awesome-icon>
            <font-awesome-icon v-if="tdExpanded" icon="caret-down"></font-awesome-icon>
          </div>
        </div>
        <slot name="checkbox">
          <checkbox-field
            :field_id="type + obj.id"
            @input="check()"
            :value="checkboxState.checked"
            :indeterminate="checkboxState.indeterminate"
            :disabledVisually="checkboxState.disabled"
            :checkedColor="state.children.length > 0 && computedState.areAllChildrenInGroup && checkboxState.checkedImplied ? 'yellow' : 'blue'"
            :uncheckedColor="accentColor"
          >
          </checkbox-field>
        </slot>
        {{type}}
      </node-td>
      <node-td class="w-16">{{obj.id}}</node-td>
      <node-td class="w-64">{{obj.name}}</node-td>
      <node-td class="w-32">{{obj.status ? obj.status : 'n/a'}}</node-td>
      <node-td class="w-24">{{state.children.length}}</node-td>
    </ul>
    <div v-show="tdExpanded">
      <p v-if="checkboxState.disabled || checkboxState.checkedImplied" :class="`bg-${accentColor}-100 text-${accentColor}-800 w-full pl-8 pr-2 pb-2`">
        <span v-if="computedState.isBuyerInOtherGroup">
          Conflicting Buyer Group: Remove from <span class="font-bold">{{ assignedBuyerGroup[0].name }}</span> in order to modify
        </span>
        <span v-else-if="computedState.descendantsInAnotherGroupCount > 0">
          Conflicting Descendant Buyer Group. Unassign children to modify <span class="font-bold">{{ obj.name }}</span>.
        </span>
        <span v-else-if="state.buyer.inherited_buyer_group !== null">
          Inherits buyer group from a parent. Unassign parent to modify <span class="font-bold">{{ obj.name }}</span>.
        </span>
        <span v-else-if="checkboxState.checkedImplied">
          Buyer is not in <span class="font-bold">{{ currentBuyerGroup.name }}</span>, but all direct children are.
        </span>
      </p>
      <div class="p-2" v-if="state.children.length">
        <!-- Vue3 Migration: Refactor and use function refs. https://v3.vuejs.org/guide/composition-api-template-refs.html#usage-inside-v-for -->
        <buyer-tree-node
          v-for="buyer in state.children"
          :ref="buyer.id"
          :obj="buyer"
          :key="buyer.id"></buyer-tree-node>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import nodeTreeTd from '@/components/ui/tables/node-tree/td'
import buyerTreeNode from '@/components/buyer-groups/buyer-tree/node'
import { computed, inject, ref, reactive } from '@vue/composition-api'
import { failedToast } from '@/mixins/toast-messages'

function useExpandTd () {
  const tdExpanded = ref(false)

  function toggleTdExpanded (childrenExist) {
    if (childrenExist) {
      tdExpanded.value = !tdExpanded.value
    }
  }
  return {
    tdExpanded,
    toggleTdExpanded
  }
}

function useClient (clientId, currentBuyerGroupId, refs, store) {
  const checkboxState = reactive({
    checked: computed(() => {
      return state.children.length > 0 && computedState.areAllChildrenInGroup
    }),
    disabled: computed(
      () => state.children.length === 0
    ),
    indeterminate: computed(
      () => !checkboxState.checked &&
        computedState.childrenInGroup.length > 0
    )
  })
  const computedState = reactive({
    childrenInGroup: computed(
      () => state.children.filter(b => b.buyer_group === currentBuyerGroupId.value)
    ),
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
      } else if (!buyer.checkboxState.checked || buyer.checkboxState.checkedImplied) {
        // Runs check() only on unchecked buyers
        buyer.check()
      }
    })
  }
  return {
    check,
    checkboxState,
    computedState,
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
      () => computedState.buyerInheritsCurrentBuyerGroup ||
                   (state.children.length > 0 && computedState.areAllChildrenInGroup)
    ),
    disabled: computed(
      () => computedState.isBuyerInOtherGroup ||
                   computedState.descendantsInAnotherGroupCount > 0 ||
                   state.buyer.inherited_buyer_group !== null
    ),
    indeterminate: computed(
      () => !checkboxState.checked &&
                   (computedState.childrenInGroup.length > 0 ||
                     computedState.descendantsInCurrentGroup.length > 0)
    )
  })
  const computedState = reactive({
    isBuyerInGroup: computed(
      () => state.buyer.buyer_group === currentBuyerGroupId.value
    ),
    isBuyerInOtherGroup: computed(
      () => state.buyer.buyer_group !== null &&
        state.buyer.buyer_group !== currentBuyerGroupId.value
    ),
    childrenInGroup: computed(
      () => state.children.filter(b => b.buyer_group === currentBuyerGroupId.value)
    ),
    areAllChildrenInGroup: computed(
      () => state.children.length === computedState.childrenInGroup.length
    ),
    descendantsInCurrentGroup: computed(
      () => state.buyer.descendant_buyer_groups.filter(b => b.buyer_group === currentBuyerGroupId.value)
    ),
    descendantsInAnotherGroupCount: computed(
      () => state.buyer.descendant_buyer_groups.filter(b => b.buyer_group !== currentBuyerGroupId.value).length
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
  function saveBuyer () {
    const updatedBuyer = { ...state.buyer }
    updatedBuyer.buyer_group = computedState.isBuyerInGroup ? null : currentBuyerGroupId.value
    store.dispatch('updateBuyerGroupForBuyer', updatedBuyer).then(() => {
      store.commit('SET_CURRENT_BUYER_GROUP_ANCESTOR_DATA', null)
    })
  }
  function handleToastErrorMessages () {
    if (computedState.isBuyerInOtherGroup) {
      const conflictingGroup = store.getters.getBuyerGroupById(state.buyer.buyer_group)[0]
      failedToast({
        heading: 'Conflicting Buyer Group',
        content: `Remove '${state.buyer.name}' from '${conflictingGroup.name}' in order to assign it to another group.`
      })
    } else if (computedState.descendantsInAnotherGroupCount > 0) {
      failedToast({
        heading: 'Conflicting Descendant Buyer Group',
        content: `${computedState.descendantsInAnotherGroupCount} descendant${computedState.descendantsInAnotherGroupCount > 1 ? 's' : ''} belong${computedState.descendantsInAnotherGroupCount > 1 ? '' : 's'} to another group, unable to set parent to another group.`
      })
    } else if (state.buyer.inherited_buyer_group.contract) {
      const buyerParent = store.getters.getBuyerById(state.buyer.inherited_buyer_group.contract)
      failedToast({
        heading: 'Buyer Group Inheritance Error',
        content: `Remove the parent '${buyerParent.name}' from the buyer group '${state.buyer.inherited_buyer_group.buyer_group_name}' in order to modify '${state.buyer.name}'.`
      })
    } else {
      failedToast({ heading: 'An Unknown Error Occurred' })
    }
  }
  function check () {
    if (checkboxState.disabled) {
      handleToastErrorMessages()
    } else {
      saveBuyer()
    }
  }
  return {
    check,
    checkboxState,
    computedState,
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

    const { tdExpanded, toggleTdExpanded } = useExpandTd()

    const currentBuyerGroupId = computed(() => store.getters.getCurrentBuyerGroup.id)
    const { check, checkboxState, computedState, state } =
      props.type === 'client'
        ? useClient(props.obj.id, currentBuyerGroupId, refs, store)
        : useBuyer(props.obj.id, currentBuyerGroupId, refs, store)

    return {
      check,
      checkboxState,
      computedState,
      state,
      tdExpanded,
      toggleTdExpanded
    }
  },
  computed: {
    ...mapGetters({
      currentBuyerGroup: 'getCurrentBuyerGroup',
      getBuyerGroupById: 'getBuyerGroupById'
    }),
    assignedBuyerGroup () {
      return this.getBuyerGroupById(this.obj.buyer_group)
    },
    accentColor () {
      let color = 'gray'
      if (this.checkboxState.disabled && !this.computedState.buyerInheritsCurrentBuyerGroup) {
        color = 'red'
      }
      return color
    },
    expandable () {
      return this.state.children.length > 0 || this.checkboxState.disabled
    }
  },
  components: {
    'buyer-tree-node': buyerTreeNode,
    'node-td': nodeTreeTd
  }
}
</script>
