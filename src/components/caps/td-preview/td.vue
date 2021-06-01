<template>
  <td class="td">
    <div class="flex flex-row items-center justify-between card card-sm" style="max-width: 500px">
      <caps-count
        :caps="caps"
        class="flex-grow"
      />
      <caps-modal-trigger
        class="ml-3"
        :caps-parent-id="parentId"
        :caps-parent-type="parentType"
      />
    </div>
  </td>
</template>

<script>
import capsModalTrigger from '@/components/caps/modal/trigger'
import capsCount from '@/components/caps/td-preview/caps-list'

export default {
  props: {
    caps: {
      type: Object,
      required: true
    },
    parentId: {
      type: Number,
      required: true
    },
    parentType: {
      type: String,
      required: true,
      validator: (value) => {
        return ['buyers', 'partners', 'offer-contracts', 'relations'].includes(value)
      }
    }
  },
  components: {
    'caps-count': capsCount,
    'caps-modal-trigger': capsModalTrigger
  }
}
</script>
