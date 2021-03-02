<template>
  <text-field-suffixed
    :field_disabled="true"
    :value="buyerGroup"
    field_id="buyer_group"
    field_label="Buyer Group"
    field_class="text-gray-600">
    <router-link :to="{name: 'BuyerGroups'}" class="text-link">
      <font-awesome-icon icon="external-link-alt"></font-awesome-icon>
    </router-link>
  </text-field-suffixed>
</template>

<script>
import textFieldSuffixed from '@/components/ui/forms/base-fields/text-field-suffixed'
export default {
  props: {
    buyer: {
      type: Object,
      required: true
    }
  },
  computed: {
    buyerGroup () {
      if (this.buyer.buyer_group) {
        return this.buyer.buyer_group
      } else if (this.buyer.ancestor_buyer_groups) {
        return this.buyer.ancestor_buyer_groups.buyer_group_name + ' (inherited)'
      }
      return 'None Assigned'
    }
  },
  components: {
    'text-field-suffixed': textFieldSuffixed
  }
}
</script>
