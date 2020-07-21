const setResponseErrors = (error, form) => {
  if (error.response.data) {
    form.setErrors(error.response.data)
  }
}

export default setResponseErrors
