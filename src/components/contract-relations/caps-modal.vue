<template>
  <parent-caps-modal :capParent="capParent" :capType="capType"></parent-caps-modal>
</template>

<script>
import parentModal from '@/components/caps/modal'

import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    'parent-caps-modal': parentModal
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
      updateContractRelation: 'UPDATE_CONTRACT_RELATION'
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
