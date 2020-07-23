/*
 This mixin requires that you set 'form_ref' in the mounted lifecycle hook of the component.
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
        if (this.error.response.data.non_field_errors) {
          return (this.error.response.data.non_field_errors[0])
        }
      }
      return ''
    }
  },
  beforeUpdate () {
    if (this.form_ref === undefined) {
      const overrideError = new Error('You must set form_ref in the mounted lifecycle hook of the component. ie: mounted () { this.form_ref = this.$refs.form }')
      throw (overrideError)
    }
  }
}
