<template>
  <checkbox-field
    @click="shiftClick($event, savedShiftClickIndex, shiftClickIndex, shiftClickList, setSavedShiftClickIndex, shiftClickFunction, defaultClickFunction)"
    :field_id="`bulkUpdate-${type}-${contract}`"
    :value="checked"
  ></checkbox-field>
</template>

<script>
import { shiftClick } from '@/mixins/shift-click'

export default {
  props: {
    contract: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true,
      validator (value) {
        return ['buyer', 'partner', 'offer'].includes(value)
      }
    },
    selectedContracts: {
      type: Array,
      required: true
    },
    addToSelected: {
      type: Function,
      required: true
    },
    removeFromSelected: {
      type: Function,
      required: true
    },
    shiftClickIndex: {
      type: Number,
      required: true
    },
    shiftClickList: {
      type: Array,
      required: true
    },
    savedShiftClickIndex: {
      required: true
    },
    setSavedShiftClickIndex: {
      type: Function,
      required: true
    }
  },
  computed: {
    checked () {
      return this.selectedContracts.includes(this.contract)
    }
  },
  mixins: [shiftClick],
  methods: {
    defaultClickFunction () {
      this.checked ? this.runRemoveFromSelected(this.contract) : this.runAddToSelected(this.contract)
    },
    shiftClickFunction (contract) {
      this.checked ? this.runRemoveFromSelected(contract.id) : this.runAddToSelected(contract.id)
    },
    runRemoveFromSelected (id) {
      this.removeFromSelected(id)
    },
    runAddToSelected (id) {
      this.addToSelected(id)
    }
  }
}
</script>
