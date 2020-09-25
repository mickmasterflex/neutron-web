export const cardColor = {
  methods: {
    cardColor (lowerBound, upperBound) {
      if (lowerBound === upperBound) {
        return 'card-green'
      } else if (lowerBound > upperBound) {
        return 'card-yellow'
      } else if (lowerBound < upperBound) {
        return 'card-red'
      } else {
        return 'card-gray'
      }
    }
  }
}
