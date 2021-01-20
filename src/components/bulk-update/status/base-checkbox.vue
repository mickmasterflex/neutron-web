<template>
  <checkbox-field
    @click="handleInput($event)"
    :field_id="`bulkUpdate-${type}-${contract}`"
    :value="checked"
  ></checkbox-field>
</template>

<script>
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
  methods: {
    handleInput (event) {
      // Prevent Highlighting Text
      document.getSelection().removeAllRanges()

      const savedShiftClickIndex = this.savedShiftClickIndex
      this.setSavedShiftClickIndex(this.shiftClickIndex)

      const toggleFunction = this.checked ? this.removeFromSelected : this.addToSelected

      if (savedShiftClickIndex === null || this.shiftClickIndex === savedShiftClickIndex || !event.shiftKey) {
        toggleFunction(this.contract)
        return
      }

      const subset = this.shiftClickList.slice(
        Math.min(this.shiftClickIndex, savedShiftClickIndex),
        Math.max(this.shiftClickIndex, savedShiftClickIndex) + 1
      )

      subset.forEach(c => {
        toggleFunction(c.id)
      })
    }
  }
}
</script>
