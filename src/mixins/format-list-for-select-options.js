export default {
  methods: {
    formatListForSelectOptions: (list) => {
      return list.reduce((obj, i) => {
        return ({ [i]: { name: i, id: i } })
      }, {})
    }
  }
}
