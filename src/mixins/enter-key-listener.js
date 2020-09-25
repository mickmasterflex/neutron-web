/*
 Override enterKeyAction method in component to change the default behaviour.
 ie:
 enterKeyAction () {
    if (this.showModal && this.isReady) {
      this.fireTheNuclearWeapons()
    }
  },
*/

export const enterKeyListener = {
  created () {
    const submitHandler = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        this.enterKeyAction()
      }
    }
    document.addEventListener('keydown', submitHandler)
    this.$once('hook:destroyed', () => {
      document.removeEventListener('keydown', submitHandler)
    })
  },
  methods: {
    enterKeyAction () {
      if (this.showModal) {
        this.submitForm()
      }
    }
  }
}
