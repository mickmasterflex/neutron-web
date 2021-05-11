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
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    buyer: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      buyerGroupById: 'getBuyerGroupById',
      buyerGroups: 'getBuyerGroups'
    }),
    buyerGroupName () {
      return this.buyerGroups ? this.buyerGroupById(this.buyer.buyer_group).name : null
    },
    buyerGroup () {
      if (this.buyer.buyer_group) {
        return this.buyerGroupName ? this.buyerGroupName : this.buyer.buyer_group
      } else if (this.buyer.ancestor_buyer_group) {
        return this.buyer.ancestor_buyer_group.buyer_group_name + ' (inherited)'
      }
      return 'None Assigned'
    }
  },
  methods: {
    ...mapActions({
      fetchBuyerGroups: 'fetchBuyerGroups'
    })
  },
  created () {
    this.fetchBuyerGroups()
  },
  components: {
    'text-field-suffixed': textFieldSuffixed
  }
}
</script>
