<template>
  <div>
    <login-form></login-form>
  </div>
</template>

<script>
import loginForm from '../../components/auth/login'

export default {
  name: 'login',
  components: {
    'login-form': loginForm
  }
}
</script>
