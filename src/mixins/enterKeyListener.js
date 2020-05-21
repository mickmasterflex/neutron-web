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
      const error = new Error('Must override enterKeyAction method in component.')
      console.log(error)
    }
  }
}
