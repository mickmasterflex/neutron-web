<template>
  <div>
    <reset-password-form></reset-password-form>
  </div>
</template>

<script>
import resetPasswordForm from '@/components/authentication/set-password'

export default {
  name: 'set-password',
  components: {
    'reset-password-form': resetPasswordForm
  }
}
</script>
