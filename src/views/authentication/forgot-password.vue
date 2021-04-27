<template>
  <div>
    <forgot-password-form></forgot-password-form>
  </div>
</template>

<script>
import forgotPasswordForm from '@/components/authentication/forgot-password.vue'

export default {
  name: 'forgot-password',
  components: {
    'forgot-password-form': forgotPasswordForm
  }
}
</script>
