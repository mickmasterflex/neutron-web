<template>
  <caps-modal @close="resetCurrentContractRelation" :capParent="capParent" :capType="capType"></caps-modal>
</template>

<script>
import capsModal from '@/components/caps/modal'

import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    'caps-modal': capsModal
  },
  computed: {
    ...mapGetters({
      dayCaps: 'getCurrentDayCaps',
      monthCaps: 'getCurrentMonthCaps',
      currentRelation: 'getCurrentContractRelation'
    })
  },
  methods: {
    ...mapMutations({
      updateContractRelation: 'UPDATE_CONTRACT_RELATION',
      resetCurrentContractRelation: 'RESET_CURRENT_RELATION'
    })
  },
  watch: {
    dayCaps () {
      const relation = this.currentRelation
      relation.caps.day_caps = this.dayCaps.filter(cap => cap.id !== null)
      this.updateContractRelation(relation)
    },
    monthCaps () {
      const relation = this.currentRelation
      relation.caps.month_caps = this.monthCaps.filter(cap => cap.id !== null)
      this.updateContractRelation(relation)
    }
  },
  props: {
    capParent: Number,
    capType: {
      type: String,
      validator: function (value) {
        return ['buyers', 'partners', 'relations'].includes(value)
      }
    }
  }
}
</script>
