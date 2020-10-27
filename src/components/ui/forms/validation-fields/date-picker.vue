<template>
  <validation-provider
    :rules="rules"
    :vid="$attrs.field_id"
    :name="$attrs.field_id"
    :mode="mode"
    v-slot="{ errors, classes }">
    <div class="field-group">
      <label class="field-label" v-if="$attrs.field_label" :for="$attrs.field_id">{{$attrs.field_label}}</label>
      <v-date-picker v-model="date" :popover="{ visibility: 'click' }">
        <template v-slot="{ inputEvents }">
          <div class="flex flex-row relative">
            <span :class="`w-8 absolute top-0 left-0 bottom-0 bg-${fieldColor}-500 text-white rounded-l flex flex-column items-center justify-center cursor-pointer`">
              <font-awesome-icon :icon="fieldIcon" class="pb-1 text-lg"></font-awesome-icon>
            </span>
            <input
              v-on="inputEvents"
              @input="handleInput($event.target.value)"
              class="base-field pl-10"
              :class="`${classes} text-${fieldColor}-600 border-${fieldColor}-500`"
              :type="$attrs.field_type ? $attrs.field_type : 'text'"
              :id="$attrs.field_id"
              :value="finalDate"
              disabled="disabled"
              ref="field">
          </div>
        </template>
      </v-date-picker>
    </div>
    <span class="field-error ml-label-width" v-show="errors.length">{{ errors[0] }}</span>
  </validation-provider>
</template>

<style scoped>
  .base-field { @apply cursor-pointer bg-white }
</style>

<script>
export default {
  data () {
    return {
      date: ''
    }
  },
  watch: {
    date: function () {
      this.date = this.formattedDate(new Date(this.date), 'mm-dd-yyyy')
      this.$emit('input', this.formattedDate(new Date(this.date), 'yyyy-mm-dd'))
    }
  },
  computed: {
    finalDate () {
      if (this.date) {
        return this.date
      }
      if (this.value) {
        // this has to have the 'T12:00:00Z' or our timezone will return the wrong day
        return this.formattedDate(new Date(this.value + 'T12:00:00Z'), 'mm-dd-yyyy')
      }
      return null
    }
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
    mode: {
      type: String,
      default: 'aggressive'
    },
    fieldColor: {
      type: String,
      default: 'blue'
    },
    fieldIcon: {
      type: String,
      default: 'calendar-alt'
    }
  },
  methods: {
    formattedDate (date, format) {
      let month = '' + (date.getMonth() + 1)
      let day = '' + date.getDate()
      const year = date.getFullYear()

      if (month.length < 2) {
        month = '0' + month
      }
      if (day.length < 2) {
        day = '0' + day
      }
      if (format === 'yyyy-mm-dd') {
        return [year, month, day].join('-')
      } else if (format === 'mm-dd-yyyy') {
        return [month, day, year].join('-')
      }
    },
    handleInput (value) {
      this.$emit('input', value)
    }
  },
  created () {
    if (this.value) {
      this.date = this.formattedDate(new Date(this.value + 'T12:00:00Z'), 'mm-dd-yyyy')
    }
  }
}
</script>
