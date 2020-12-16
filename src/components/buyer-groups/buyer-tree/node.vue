<template>
  <div class="mb-1"
       :class="`${expandedState.expanded ? `rounded-lg border-2 border-${accentColor('gray')}-200 overflow-hidden` : ''}`">
    <ul @click="toggleTrExpanded()"
        class="flex flex-row transition-colors duration-200"
        :class="`${expandedState.expandable ? 'cursor-pointer' : ''}
                 ${expandedState.expanded ? `bg-${accentColor('gray')}-100 hover:bg-${accentColor('gray')}-200` : `bg-white hover:bg-${accentColor('blue')}-100 rounded-lg`}`">
      <node-td class="w-64 flex flex-row capitalize">
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
        {{obj.name}}
        <span class="text-gray-500 ml-3 font-light" v-if="this.type === 'client'">Client</span>
      </node-td>
      <node-td class="w-10">{{obj.id}}</node-td>
      <node-td class="w-24">{{obj.status ? obj.status : 'n/a'}}</node-td>
      <node-td class="w-20">{{state.children.length}}</node-td>
    </ul>
    <div v-show="expandedState.expanded">
      <p v-if="userFeedbackState.hasUserFeedback"
         class="w-full pl-8 pr-2 pb-2 pt-2 border-t"
         :class="`bg-${accentColor('gray')}-100 border-${accentColor('gray')}-200 text-${accentColor('gray')}-800`">
        <span v-if="userFeedbackState.clientHasNoChildren">
          No buyers have been created for this client, add buyers <router-link :to="{name: 'ClientContracts', params: {slug:obj.slug}}" class="text-link">here</router-link>
        </span>
        <span v-if="userFeedbackState.conflictingBuyerGroup">
          Conflicting Buyer Group: Click the x icon to unassign from
          <span v-if="state.assignedBuyerGroup" class="font-bold capitalize">{{ state.assignedBuyerGroup.name }}</span>
          <span v-else>other group</span>.
        </span>
        <span v-else-if="userFeedbackState.descendantsInAnotherGroup">
          Conflicting Descendant Buyer Group: Unassign children to modify <span class="font-bold capitalize">{{ obj.name }}</span>.
        </span>
        <span v-else-if="userFeedbackState.inheritsBuyerGroup">
          Inherits buyer group from the parent<span v-if=" obj.inherited_buyer_group"> with id <span class="font-bold capitalize">{{ obj.inherited_buyer_group.contract }}</span></span>. Unassign parent to modify.
        </span>
        <span v-else-if="userFeedbackState.descendantsAssignedSelfUnassigned">
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
import { computed, inject, watch } from '@vue/composition-api'
import nodeTreeTd from '@/components/buyer-groups/buyer-tree/td'
import buyerTreeNode from '@/components/buyer-groups/buyer-tree/node'
import useBuyer from '@/use/buyer-groups/buyer'
import useBuyerFeedback from '@/use/buyer-groups/buyer-feedback'
import useClient from '@/use/buyer-groups/client'
import useClientFeedback from '@/use/buyer-groups/client-feedback'
import useExpandTr from '@/use/buyer-groups/expand-tr'

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

    const currentBuyerGroup = computed(() => store.getters.getCurrentBuyerGroup)
    const currentBuyerGroupId = computed(() => store.getters.getCurrentBuyerGroup.id)
    const { check, checkboxState, computedState, state } =
      props.type === 'client'
        ? useClient(props.obj.id, store)
        : useBuyer(props.obj.id, currentBuyerGroupId, store)
    const { userFeedbackState } =
      props.type === 'client'
        ? useClientFeedback(state)
        : useBuyerFeedback(props.obj, computedState, checkboxState, store)
    const { expandedState, toggleTrExpanded } = useExpandTr(state.children.length > 0, userFeedbackState)

    const showUpdateModal = computed(() => store.getters.getShowUpdateBuyerGroupModal)
    watch(showUpdateModal, () => {
      if (!showUpdateModal.value && expandedState.expanded) {
        toggleTrExpanded()
      }
    })

    return {
      check,
      checkboxState,
      computedState,
      currentBuyerGroup,
      expandedState,
      state,
      toggleTrExpanded,
      userFeedbackState
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
