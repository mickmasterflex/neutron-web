<template>
  <checkbox-field
    @input="handleInput"
    :field_id="`bulkUpdateBuyers-${contract}`"
    :value="checked"
  ></checkbox-field>
</template>

<script>
export default {
  props: {
    contract: Number,
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
    }
  },
  computed: {
    checked () {
      return this.selectedContracts.includes(this.contract)
    }
  },
  methods: {
    handleInput () {
      if (this.checked) {
        this.removeFromSelected(this.contract)
      } else {
        this.addToSelected(this.contract)
      }
    }
  }
}
</script>
