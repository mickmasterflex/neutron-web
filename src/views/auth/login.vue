<template>
  <div>
    <login-form></login-form>
  </div>
</template>

<script>
import loginForm from '../../components/auth/Login'

export default {
  name: 'login',
  components: {
    loginForm
  }
}
</script>
