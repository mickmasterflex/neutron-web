/*
 You can override 'form_ref' in the mounted lifecycle hook of the component.
 ie:
 mounted () {
   this.form_ref = this.$refs.form
 }
*/

export const setResponseErrors = {
  data () {
    return {
      error: {
        response: {
          data: null
        }
      },
      form_ref: undefined
    }
  },
  watch: {
    error () {
      if (this.error.response.data && this.form_ref) {
        this.form_ref.setErrors(this.error.response.data)
      }
    }
  },
  computed: {
    formError () {
      if (this.error.response.data) {
        const nonFieldErrors = this.error.response.data.non_field_errors
        if (nonFieldErrors) {
          return (nonFieldErrors[0])
        }
      }
      return ''
    }
  },
  mounted () {
    if (!this.$refs.form) {
      const overrideError = new Error('The validation-observer component requires the ref property. If you have defined ref as something other than "form" you will need to override the form_ref data property in the mounted lifecycle of your component. ie: mounted () { this.form_ref = this.$refs.someForm }')
      throw (overrideError)
    }
    this.form_ref = this.$refs.form
  }
}
