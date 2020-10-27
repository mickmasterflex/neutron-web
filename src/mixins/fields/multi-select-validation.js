import validation from '@/mixins/fields/validation'

export default {
  mixins: [validation],
  props: {
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    mode: {
      type: String,
      default: 'aggressive'
    }
  }
}
