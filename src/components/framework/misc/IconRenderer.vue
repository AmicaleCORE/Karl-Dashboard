<template>
  <span class="icon" v-if="icon" v-html="icon"></span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { icons } from '@/assets/scripts/icons'

export default defineComponent({
  name: 'IconRenderer',
  data: () => ({
    icon: undefined
  }),
  props: {
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  },
  created () {
    if (!icons[this.category]) return
    this.icon = icons[this.category][this.name]
  }
})
</script>

<style lang="sass" scoped>
.icon
  height: 1em
  display: block
  width: fit-content
</style>
