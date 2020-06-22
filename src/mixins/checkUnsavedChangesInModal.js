import { mapMutations } from 'vuex'

export const checkUnsavedChangesInModal = {
  methods: {
    ...mapMutations({
      toggleChangesInModalUnsaved: 'TOGGLE_CHANGES_IN_MODAL_UNSAVED'
    }),
    checkUnsavedChanges () {
      if (this.showModal === true) {
        this.toggleChangesInModalUnsaved(true)
      }
    }
  }
}
