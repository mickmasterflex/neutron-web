<template>
  <p class="w-full pl-8 pr-2 pb-2 pt-2 border-t"
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
          Inherits buyer group from the parent<span v-if=" obj.ancestor_buyer_group"> with id <span class="font-bold capitalize">{{ obj.ancestor_buyer_group.contract }}</span></span>. Unassign parent to modify.
        </span>
    <span v-else-if="userFeedbackState.childrenAssignedSelfUnassigned">
          Not assigned to a buyer group, but all direct children assigned to <span class="font-bold capitalize">{{ currentBuyerGroup.name }}</span>.
        </span>
  </p>
</template>

<script>
export default {
  props: {
    accentColor: {
      type: Function,
      required: true
    },
    currentBuyerGroup: {
      type: Object,
      required: true
    },
    obj: {
      type: Object,
      required: true
    },
    state: {
      type: Object,
      required: true
    },
    userFeedbackState: {
      type: Object,
      required: true
    }
  }
}
</script>
