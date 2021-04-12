<template>
  <div>
    <reset-password-form></reset-password-form>
  </div>
</template>

<script>
import resetPasswordForm from '@/components/authentication/reset-password'

export default {
  name: 'reset-password',
  components: {
    'reset-password-form': resetPasswordForm
  }
}
</script>
