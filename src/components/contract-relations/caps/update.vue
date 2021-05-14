<template>
  <span class="flex flex-row justify-start">
    <button class="btn btn-circle btn-hollow-blue mr-1" @click="showModalSetCurrent(contractRelation)">
      <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
    </button>
    <span v-if="contractRelation.caps.month_caps.length || contractRelation.caps.day_caps.length">
      {{ contractRelation.caps.month_caps.length }} {{ plural('Month Cap', contractRelation.caps.month_caps.length) }},
      {{ contractRelation.caps.day_caps.length }} {{ plural('Day Cap', contractRelation.caps.day_caps.length) }}
    </span>
    <span v-else class="italic text-gray-500">No Caps Set</span>
  </span>
</template>

<script>
import { plural } from '@/mixins/plural'
import { mapMutations, mapActions } from 'vuex'

export default {
  methods: {
    ...mapMutations({
      setCurrentContractRelation: 'SET_CURRENT_CONTRACT_RELATION',
      setCurrentCapParentObject: 'SET_CURRENT_CAPS_PARENT_OBJECT',
      setCurrentCapParentType: 'SET_CURRENT_CAPS_PARENT_TYPE',
      showCapsModal: 'SHOW_CAPS_MODAL'
    }),
    ...mapActions({
      setCapsCalendarEndpoint: 'setCapsCalendarEndpoint'
    }),
    showModalSetCurrent (relation) {
      this.setCurrentContractRelation(relation)
      this.setCapsCalendarEndpoint({
        id: relation.id,
        type: 'relations'
      })
      this.$nextTick(() => {
        this.showCapsModal()
      })
    }
  },
  mixins: [plural],
  props: {
    contractRelation: {
      type: Object,
      required: true
    }
  }
}
</script>
