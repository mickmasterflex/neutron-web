<template>
  <div class="col-auto items-center border-l border-gray-800 pl-4">
    <transition-group enter-active-class="animate__animated animate__fadeIn"
                      leave-active-class="animate__animated animate__fadeOut animate__faster">
      <slot></slot>
    </transition-group>
  </div>
</template>
