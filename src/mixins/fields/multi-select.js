export default {
  props: {
    disabledOption: {
      type: String,
      default: 'Select something'
    },
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selected: this.value
    }
  },
  methods: {
    updateValue () {
      this.$emit('input', this.selected)
    },
    selectedOption (id) {
      return !!this.value.includes(id)
    }
  }
}
