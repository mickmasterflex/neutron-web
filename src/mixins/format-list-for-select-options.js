export default {
  methods: {
    formatListForSelectOptions: (list) => {
      return list.reduce((obj, i) => ({ ...obj, [i]: { name: i, id: i } }), {})
    }
  }
}
