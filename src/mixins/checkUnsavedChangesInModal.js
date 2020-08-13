import { mapMutations } from 'vuex'

export const checkUnsavedChangesInModal = {
  methods: {
    ...mapMutations({
      toggleChangesInModalUnsaved: 'TOGGLE_CHANGES_IN_MODAL_UNSAVED'
    }),
    checkUnsavedChanges (showModal, boolean) {
      if (showModal === true) {
        this.toggleChangesInModalUnsaved(boolean)
      }
    }
  }
}
