<template>
  <div class="mb-1"
       :class="`${expandedState.expanded ? `rounded-lg border-2 border-${accentColor('gray')}-200 overflow-hidden` : ''}`">
    <ul @click="toggleTrExpanded()"
        class="flex flex-row transition-colors duration-200"
        :class="`${expandedState.expandable ? 'cursor-pointer' : ''}
                 ${expandedState.expanded ? `bg-${accentColor('gray')}-100` : `bg-white hover:bg-${accentColor('blue')}-100 rounded-lg`}`">
      <node-td class="w-32 flex flex-row capitalize">
        <div class="w-5">
          <div v-if="expandedState.expandable"
               class="mr-1 w-5 cursor-pointer text-gray-500 hover:text-gray-700">
            <font-awesome-icon v-if="!expandedState.expanded" icon="caret-right"></font-awesome-icon>
            <font-awesome-icon v-if="expandedState.expanded" icon="caret-down"></font-awesome-icon>
          </div>
        </div>
        <checkbox-field
          v-if="type === 'buyer'"
          :field_id="type + obj.id"
          @input="check()"
          :value="checkboxState.checked"
          :indeterminate="checkboxState.indeterminate"
          :disabledVisually="checkboxState.disabled"
          :checkedColor="state.children.length > 0 && computedState.areAllChildrenInGroup && checkboxState.checkedImplied ? 'yellow' : 'blue'"
          :uncheckedColor="accentColor('gray')"
        >
          <template v-if="computedState.isBuyerInOtherGroup" v-slot:checkbox>
            <font-awesome-icon icon="times-circle" class="text-red-500 hover:text-red-700 cursor-pointer"></font-awesome-icon>
          </template>
        </checkbox-field>
        <span class="text-gray-700">{{type}}</span>
      </node-td>
      <node-td class="w-10 text-gray-900">{{obj.id}}</node-td>
      <node-td class="w-64 text-gray-900 capitalize">{{obj.name}}</node-td>
      <node-td class="w-32">{{obj.status ? obj.status : 'n/a'}}</node-td>
      <node-td class="w-24 text-gray-900">{{state.children.length}}</node-td>
    </ul>
    <div v-show="expandedState.expanded">
      <p v-if="type === 'buyer' && (checkboxState.disabled || checkboxState.checkedImplied || computedState.isBuyerInOtherGroup)"
         :class="`bg-${accentColor('gray')}-100 text-${accentColor('gray')}-800 w-full pl-8 pr-2 pb-2`">
        <span v-if="computedState.isBuyerInOtherGroup">
          Conflicting Buyer Group: Click the x icon to unassign from <span class="font-bold capitalize">{{ assignedBuyerGroup[0].name }}</span>.
        </span>
        <span v-else-if="computedState.descendantsInAnotherGroupCount > 0">
          Conflicting Descendant Buyer Group: Unassign children to modify <span class="font-bold capitalize">{{ obj.name }}</span>.
        </span>
        <span v-else-if="state.buyer.inherited_buyer_group !== null">
          Inherits buyer group from the parent with id <span class="font-bold capitalize">{{ obj.inherited_buyer_group.contract }}</span>. Unassign parent to modify.
        </span>
        <span v-else-if="checkboxState.checkedImplied">
          Not assigned to a buyer group, but all direct children assigned to <span class="font-bold capitalize">{{ currentBuyerGroup.name }}</span>.
        </span>
      </p>
      <div class="p-2" v-if="state.children.length">
        <buyer-tree-node
          v-for="buyer in state.children"
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

function useExpandTr (children, computedState, checkboxState) {
  const expandedState = reactive({
    expanded: ref(false),
    expandable: computed(() => {
      return children.length > 0 ||
        computedState.isBuyerInOtherGroup ||
        checkboxState.disabled
    })
  })

  function toggleTrExpanded () {
    if (expandedState.expandable) {
      expandedState.expanded = !expandedState.expanded
    }
  }
  return {
    expandedState,
    toggleTrExpanded
  }
}

function useClient (clientId, store) {
  const state = reactive({
    children: computed(() => store.getters.getParentlessBuyersByClient(clientId))
  })
  return {
    state
  }
}

function useBuyer (buyerId, currentBuyerGroupId, store) {
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
      () => computedState.descendantsInAnotherGroupCount > 0 ||
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
    if (computedState.isBuyerInOtherGroup || computedState.isBuyerInGroup) {
      updatedBuyer.buyer_group = null
    } else {
      updatedBuyer.buyer_group = currentBuyerGroupId.value
    }
    store.dispatch('updateBuyerGroupForBuyer', updatedBuyer).then(() => {
      store.commit('SET_CURRENT_BUYER_GROUP_ANCESTOR_DATA', null)
    })
  }
  function check () {
    if (!checkboxState.disabled) {
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
  setup (props) {
    const store = inject('vuex-store')

    const currentBuyerGroupId = computed(() => store.getters.getCurrentBuyerGroup.id)
    const { check, checkboxState, computedState, state } =
      props.type === 'client'
        ? useClient(props.obj.id, store)
        : useBuyer(props.obj.id, currentBuyerGroupId, store)
    const { expandedState, toggleTrExpanded } = useExpandTr(state.children, computedState, checkboxState)

    return {
      check,
      checkboxState,
      computedState,
      expandedState,
      state,
      toggleTrExpanded
    }
  },
  computed: {
    ...mapGetters({
      currentBuyerGroup: 'getCurrentBuyerGroup',
      getBuyerGroupById: 'getBuyerGroupById'
    }),
    assignedBuyerGroup () {
      return this.getBuyerGroupById(this.obj.buyer_group)
    }
  },
  methods: {
    accentColor (defaultColor = 'gray') {
      if (this.type === 'buyer' && ((this.checkboxState.disabled && !this.computedState.buyerInheritsCurrentBuyerGroup) || this.computedState.isBuyerInOtherGroup)) {
        return 'red'
      } else {
        return defaultColor
      }
    }
  },
  components: {
    'buyer-tree-node': buyerTreeNode,
    'node-td': nodeTreeTd
  }
}
</script>
