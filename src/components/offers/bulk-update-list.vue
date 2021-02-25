<template>
  <offers-list :offers="offers">
    <template v-slot:additional-th>
      <th class="th"></th>
    </template>
    <template v-slot:additional-td="slotProps">
      <td class="td">
      <bulk-update-checkbox :contract="slotProps.offer.id" :contracts="offers" :index="index"></bulk-update-checkbox>
    </td>
    </template>
  </offers-list>
</template>

<script>
import offersList from '@/components/offers/list'
import bulkUpdateCheckbox from '@/components/bulk-update/status/offer-checkbox'
import { mapMutations } from 'vuex'
export default {
  props: {
    offers: {
      type: [Object, Array],
      required: true
    }
  },
  ...mapMutations({
    resetShiftClickIndex: 'RESET_BULK_UPDATE_OFFERS_SHIFT_CLICK_INDEX'
  }),
  components: {
    'offers-list': offersList,
    'bulk-update-checkbox': bulkUpdateCheckbox
  },
  destroyed () {
    this.resetShiftClickIndex()
  }
}
</script>
