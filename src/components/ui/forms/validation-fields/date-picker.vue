<template>
  <validation-provider
    :rules="rules"
    :vid="$attrs.field_id"
    :name="$attrs.field_id"
    v-slot="{ errors, classes }">
    <div class="field-group">
      <label class="field-label" v-if="$attrs.field_label" :for="$attrs.field_id">{{$attrs.field_label}}</label>
      <div class="flex flex-row">
        <v-date-picker v-model="date" :minDate="new Date()" :mode="mode" @input="$emit('input', formatDate(date))">
          <template v-slot="{ inputValue, inputEvents, togglePopover }">
            <div class="flex flex-row relative" @click="togglePopover({ placement: 'bottom-start' })">
              <span :class="`w-8 absolute top-0 left-0 bottom-0 bg-${fieldColor}-500 text-white rounded-l flex flex-column items-center justify-center cursor-pointer`">
                <font-awesome-icon :icon="fieldIcon" class="pb-1 text-lg"></font-awesome-icon>
              </span>
              <input
                v-on="inputEvents"
                class="base-field pl-10"
                :class="`${classes} text-${fieldColor}-600 border-${fieldColor}-500 ${date ? ' w-56' : 'w-64'}`"
                :type="$attrs.field_type ? $attrs.field_type : 'text'"
                :id="$attrs.field_id"
                :value="inputValue"
                disabled="disabled"
                ref="field">
            </div>
          </template>
        </v-date-picker>
        <span v-if="date" @click="$emit('input', null)" class="w-8 flex flex-row items-center justify-center h-base-field">
          <icon-button color="red" icon="trash-alt"></icon-button>
        </span>
      </div>
    </div>
    <span class="field-error ml-label-width" v-show="errors.length">{{ errors[0] }}</span>
  </validation-provider>
</template>

<style scoped>
  .base-field { @apply cursor-pointer bg-white }
</style>

<script>
import iconButton from '@/components/ui/buttons/icon-button-subtle'
import dayjs from 'dayjs'

export default {
  data () {
    return {
      date: null
    }
  },
  watch: {
    value () {
      this.setDateFromValue()
    }
  },
  created () {
    this.setDateFromValue()
  },
  props: {
    value: {
      type: null,
      default: ''
    },
    rules: {
      type: [Object, String],
      default: ''
    },
    fieldColor: {
      type: String,
      default: 'blue'
    },
    fieldIcon: {
      type: String,
      default: 'calendar-alt'
    },
    mode: {
      type: String,
      default: 'date',
      validator: (value) => {
        return ['dateTime', 'date'].includes(value)
      }
    }
  },
  methods: {
    formatDate (date) {
      if (this.mode === 'dateTime') {
        return dayjs(date).format('YYYY-MM-DDTHH:mm:ss[Z]')
      } else if (this.mode === 'date') {
        return dayjs(date).format('YYYY-MM-DD')
      }
    },
    setDateFromValue () {
      if (this.value) {
        this.date = this.formatDate(this.value)
      } else {
        this.date = null
      }
    }
  },
  components: {
    'icon-button': iconButton
  }
}
</script>
