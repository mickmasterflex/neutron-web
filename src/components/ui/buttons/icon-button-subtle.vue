<template functional>
  <font-awesome-icon
    class="text-gray-500 transition-colors duration-200 cursor-pointer"
    :class="`hover:text-${props.color ? props.color : 'blue'}-500`"
    :icon="props.icon ? props.icon : 'trash-alt'"></font-awesome-icon>
</template>
