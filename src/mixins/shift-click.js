/*
  event: Must be the click $event
  savedIndex: The index of the previous click
  shiftClickIndex: The index of the current click
  shiftClickList: The full list you've iterated through, this method will slice a subset of this list
  setSavedShiftClickIndex: Saves the current click
  shiftClickFunction: Whatever you want to run for each item in the subset
  defaultClickFunction: Whatever you want to run if shiftClick condition isn't met
*/

export const shiftClick = {
  methods: {
    shiftClick (event, savedIndex, shiftClickIndex, shiftClickList, setSavedShiftClickIndex, shiftClickFunction, defaultClickFunction) {
      document.getSelection().removeAllRanges() // Prevents highlighting text for shift click functionality

      const savedShiftClickIndex = savedIndex
      setSavedShiftClickIndex(shiftClickIndex)

      if (savedShiftClickIndex === null || shiftClickIndex === savedShiftClickIndex || !event.shiftKey) {
        defaultClickFunction()
        return
      }

      const subset = shiftClickList.slice(
        Math.min(shiftClickIndex, savedShiftClickIndex),
        Math.max(shiftClickIndex, savedShiftClickIndex) + 1
      )

      subset.forEach(i => {
        shiftClickFunction(i)
      })
      this.afterShiftClick()
    },
    afterShiftClick () {}
  }
}
