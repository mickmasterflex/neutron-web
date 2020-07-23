/*
 This mixin requires that you override enterKeyAction method in component.
 ie:
 enterKeyAction () {
    if (this.showModal) {
      this.submitForm()
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
      throw (new Error('Must override enterKeyAction method in component.'))
    }
  }
}
